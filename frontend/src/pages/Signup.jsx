import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validation from "../validations/signupSchema";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const response = await signup(values.name, values.email, values.password);
      if (response.ok) {
        toast.success("Signup successful");
        formik.resetForm();
        navigate("/login");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    },
  });

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: 450,
          mx: "auto",
          mt: {
            xs: 3,
            sm: 6,
            md: 8,
          },
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          py: {
            xs: 3,
            sm: 4,
          },
          borderRadius: {
            xs: 2,
            sm: 3,
          },
          boxShadow: 3,
          boxSizing: "border-box",
        }}
      >
        <Button
          onClick={() => navigate("/")}
          sx={{
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
            },
          }}
        >
          Back to home page
        </Button>

        <Typography
          variant="h4"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: {
              xs: "1.8rem",
              sm: "2.125rem",
            },
          }}
        >
          Signup
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
            label="Name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name ? formik.errors.name : ""}
            fullWidth
          />

          <TextField
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email ? formik.errors.email : ""}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password ? formik.errors.password : ""}
            fullWidth
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 1,
              py: 1.2,
            }}
          >
            Submit
          </Button>
        </Box>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "column",
            },
            alignItems: {
              xs: "stretch",
              sm: "center",
            },
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
              },
            }}
          >
            Already have an account?
          </Typography>

          <Button
            variant="outlined"
            onClick={() => navigate("/login")}
            sx={{
              alignSelf: {
                xs: "center",
                sm: "auto",
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
