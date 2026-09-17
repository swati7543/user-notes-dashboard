const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./authMiddleware");
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend");
});
app.get("/about", (req, res) => {
  res.send("Hello from about page");
});

//signup route
app.post("/signup", (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error occurred while hashing password:", err);
      res.status(500).send("Error occurred while signing up");
      return;
    }
    console.log(hash);

    const query =
      "INSERT INTO user_tbl (name, email, password) VALUES (?, ?, ?)";
    connection.query(query, [name, email, hash], (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Email already registered" });
        } else {
          console.error("Error occurred while inserting user data:", err);
          res.status(500).send("Error occurred while signing up");
        }
      }
      console.log("User registered successfully");
      res.status(201).send("User registered successfully");
    });
  });
  // res.send("Signup data received")
});

//login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const query = "SELECT * FROM user_tbl WHERE email=?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error occurred while fetching user data:", err);
      res.status(500).send("Error occurred while logging in");
      return;
    }
    if (results.length === 0) {
      res.status(401).send("Invalid email or password");
      return;
    }
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) {
        console.error("Error occurred while comparing passwords:", err);
        res.status(500).send("Error occurred while logging in");
        return;
      }
      if (isMatch) {
        const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({ message: "Login successful", token: token });
      } else {
        res.status(401).send("Invalid email or password");
      }
    });
  });
});

//test
app.get("/protected", authMiddleware, (req, res) => {
  res
    .status(200)
    .json({ message: "Access granted to protected route", user: req.user });
});

//message route
app.post("/messages", authMiddleware, (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;
  const query = "INSERT INTO message_tbl (user_id, message) VALUES (?, ?)";
  connection.query(query, [userId, message], (err, results) => {
    if (err) {
      console.error("Error occurred while inserting message:", err);
      res.status(500).send("Error occurred while saving message");
      return;
    } else {
      console.log("Message saved successfully");
      res.status(201).json({
        id: results.insertId,
        user_id: userId,
        message: message,
      });

      // console.log("Message saved successfully");
      // res.status(201).send("Message saved successfully");
    }
  });
});

//get messages route
app.get("/messages", authMiddleware, (req, res) => {
  const userId = req.user.id;
  console.log("Logged in user ID:", userId);

  const query = "SELECT * FROM message_tbl WHERE user_id=?";
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error occurred while fetching messages:", err);
      res.status(500).send("Error occurred while fetching messages");
      return;
    }
    res.status(200).json({ messages: results });
  });
});

//update message route
app.put("/messages/:id", authMiddleware, (req, res) => {
  const messageId = req.params.id;
  const userId = req.user.id;
  const { message } = req.body;
  const query = "UPDATE message_tbl SET message=? WHERE id=? AND user_id=?";
  connection.query(query, [message, messageId, userId], (err, results) => {
    if (err) {
      console.error("Error occurred while updating message:", err);
      res.status(500).send("Error occurred while updating message");
      return;
    }
    if (results.affectedRows === 0) {
      res
        .status(404)
        .send("Message not found or you are not authorized to update it");
      return;
    }
    res.status(200).send("Message updated successfully");
  });
});

//delete message route
app.delete("/messages/:id", authMiddleware, (req, res) => {
  const messageId = req.params.id;
  const userId = req.user.id;
  const query = "DELETE FROM message_tbl WHERE id=? AND user_id=?";
  connection.query(query, [messageId, userId], (err, results) => {
    if (err) {
      console.error("Error occurred while deleting message:", err);
      res.status(500).send("Error occurred while deleting message");
      return;
    }
    if (results.affectedRows === 0) {
      res
        .status(404)
        .send("Message not found or you are not authorized to delete it");
      return;
    }
    res.status(200).send("Message deleted successfully");
  });
});

app.listen(8000, () => {
  //server started
  console.log("server is running on port 8000");
});
