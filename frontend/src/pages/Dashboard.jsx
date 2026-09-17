import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";
import { useEffect, useState } from "react";
import { getMessages } from "../services/api";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const handleMessageAdded = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  //get messages
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessages();
      const data = await response.json();
      setMessages(data.messages);
    };

    fetchMessages();
  }, []);

  return (
    <>
    <Navbar />

      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          boxSizing: "border-box",
        }}
      >
        {/* Add Task Button / Form */}
        <Box sx={{ mb: 4 }}>
          {!showForm && (
            <Button
              variant="contained"
              onClick={() => setShowForm(true)}
            >
              Add Message / Task
            </Button>
          )}

          {showForm && (
            <MessageForm
              onMessageAdded={handleMessageAdded}
              onCancel={handleCancel}
            />
          )}
        </Box>

        {/* Messages Section */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: {
                xs: "1.3rem",
                sm: "1.5rem",
              },
            }}
          >
            Messages
          </Typography>

          <MessageList
            messages={messages}
            setMessages={setMessages}
          />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
