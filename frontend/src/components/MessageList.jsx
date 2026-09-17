import { useState } from "react";
import { deleteMessageById, updateMessageById } from "../services/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
const MessageList = ({ messages, setMessages }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const handleDelete = async (id) => {
    const response = await deleteMessageById(id);
    if (response.ok) {
      toast.success("Message deleted successfully");
      setMessages(messages.filter((mess) => mess.id !== id));
    } else {
      const mess = await response.text();
      toast.error(mess);
    }
  };

  const handleUpdate = async (editingId, editText) => {
    const response = await updateMessageById(editingId, editText);
    if (response.ok) {
      toast.success("message updated sucessfully");
      setMessages(
        messages.map((mess) => {
          if (mess.id === editingId) {
            return {
              ...mess,
              message: editText,
            };
          }

          return mess;
        }),
      );

      setEditingId(null);
      setEditText("");
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ mt: 3, borderRadius: 2, boxShadow: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>
                <strong>ID</strong>
              </TableCell> */}
              <TableCell>
                <strong>Message / Task</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {messages.map((mess) =>
              editingId === mess.id ? (
                <TableRow key={mess.id}>
                  {/* <TableCell>{mess.id}</TableCell> */}
                  <TableCell>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setEditingId(null);
                          setEditText("");
                        }}
                      >
                        Cancel
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => handleUpdate(editingId, editText)}
                      >
                        Update
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={mess.id} hover>
                  {/* <TableCell>{mess.id}</TableCell> */}

                  <TableCell>{mess.message}</TableCell>

                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(mess.id)}
                      >
                        Delete
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => {
                          setEditingId(mess.id);
                          setEditText(mess.message);
                        }}
                      >
                        Edit
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MessageList;
