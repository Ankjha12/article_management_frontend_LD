import React from "react";

import {
  AppBar,
  Typography,
  Toolbar,
  Button,
} from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'

import useStyles from "./Style";

const Navbar = () => {
  const classes: any = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = React.useState(
    localStorage.getItem("token")
  );

  console.log("Profile from the localStorage====>>>>", user);

  //Setting the value of user to the login member when the page loads
  React.useEffect(() => {
    const token = user;

    //jwt authentication will go here
    if (token) {
      const decodedToken: any =  jwtDecode(token);

      if (decodedToken * 1000 < new Date().getTime()) {
        logout();
      } 
    }

    setUser(localStorage.getItem("token"));
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography
            // component={Link}
            // to="/"
            className={classes.heading}
            variant="h1"
            align="center"
          >
            Article Management
          </Typography>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            {/* <Avatar
              className={classes.purple}
              alt={user?.result?.name}
              src={user?.result?.imageUrl}
            >
              {user?.result?.name.charAt(0)}
            </Avatar>
            <Typography
              style={{ color: "purple" }}
              className={classes.userName}
              variant="h6"
            >
              {user?.result?.name}
              {console.log("UserName ===>>>>", user?.result?.name)}
            </Typography> */}
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
