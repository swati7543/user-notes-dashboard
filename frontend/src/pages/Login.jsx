import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validation from "../validations/loginSchema";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const response = await login(values.email, values.password);
      if (response.ok) {
        toast.success("Login Successfully");
        formik.resetForm();
        navigate("/dashboard");
      } else {
        const message = await response.text();
        toast.error(message);
      }
    },
  });

  return (
    <>
    <Box
      sx={{
        width: {
          xs: "90%",
          sm: "70%",
          md: "450px",
        },
        mx: "auto",

        mt: {
          xs: 4,
          sm: 6,
          md: 8,
        },

        p: {
          xs: 2.5,
          sm: 3,
          md: 4,
        },

        borderRadius: 3,
        boxShadow: 3,
        boxSizing: "border-box",
      }}
    >
      {/* Back button */}
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

      {/* Heading */}
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
        Login
      </Typography>

      {/* Login Form */}
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Email */}
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

        {/* Password */}
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

        {/* Login button */}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            mt: 1,
            py: 1.2,
          }}
        >
          Login
        </Button>
      </Box>

      {/* Signup section */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
          },
          alignItems: {
            xs: "center",
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
          Don't have an account?
        </Typography>

        <Button
          variant="outlined"
          onClick={() => navigate("/signup")}
        >
          SignUp
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default Login;
