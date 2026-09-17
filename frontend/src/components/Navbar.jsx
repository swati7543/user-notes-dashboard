import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { toast } from "react-toastify";
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "darkblue",
        mb: 5,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          py: {
            xs: 1,
            sm: 1.5,
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: {
              xs: "1.1rem",
              sm: "1.4rem",
              md: "1.5rem",
            },
          }}
        >
          User Notes Dashboard
        </Typography>

        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
            },
            px: {
              xs: 1.5,
              sm: 2,
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
