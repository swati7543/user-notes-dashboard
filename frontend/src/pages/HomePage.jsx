import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      {/* Heading Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 700,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: {
              xs: "2rem",
              sm: "2.8rem",
              md: "3.5rem",
            },
            fontWeight: "bold",
            mb: 2,
          }}
        >
          User Notes Dashboard
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            fontSize: {
              xs: "1rem",
              sm: "1.2rem",
            },
          }}
        >
          Manage your notes easily
        </Typography>
      </Box>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          mt: 4,
          width: {
            xs: "80%",
            sm: "auto",
          },
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{
            px: 4,
            py: 1.2,
          }}
        >
          Login
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/signup")}
          sx={{
            px: 4,
            py: 1.2,
          }}
        >
          SignUp
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;