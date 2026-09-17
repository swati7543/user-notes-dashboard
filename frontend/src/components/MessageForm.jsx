import * as Yup from "yup";
import { createMessage } from "../services/api";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
const MessageForm = ({ onMessageAdded, onCancel }) => {
  // validation
  const validation = Yup.object({
    message: Yup.string().required("Message is required"),
  });

  // form
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const response = await createMessage(values.message);

      if (response.ok) {
        const newMessage = await response.json();
        toast.success("Message added successfully");
        formik.resetForm();
        onMessageAdded(newMessage);
      } else {
        const mess = await response.text();
        toast.error(mess);
      }
    },
  });

  return (
    <>
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 3,
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>

          Add New Task
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="Task / Message"
            multiline
            rows={4}
            name="message"
            id="message"
            placeholder="Write your task or message..."
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message ? formik.errors.message : ""}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1.5,
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>

            <Button variant="contained" type="submit">
              Add Message
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MessageForm;
