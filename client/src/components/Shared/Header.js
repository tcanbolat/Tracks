import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import RadioIcon from "@material-ui/icons/RadioTwoTone";
import FaceIcon from "@material-ui/icons/FaceTwoTone";
import Typography from "@material-ui/core/Typography";
import Signout from "../Auth/Signout";


const Header = ({ classes, currentUser }) => {
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Link className={classes.grow} to="/">
          <RadioIcon className={classes.logo} color="secondary" />
          <Typography variant="h4" color="secondary" noWrap>
            ReactTracks
          </Typography>
        </Link>
        {currentUser && (
          <Link className={classes.grow} to={`/profile/${currentUser.id}`}>
            <FaceIcon className={classes.FaceIcon} />
            <Typography className={classes.username} variant="h3" noWrap>
              {currentUser.username}
            </Typography>
          </Link>
        )}
        <Signout />
      </Toolbar>
    </AppBar>
  );
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0,
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  logo: {
    marginRight: theme.spacing(1),
    fontSize: 45,
  },
  faceIcon: {
    marginRight: theme.spacing(),
    fontSize: 30,
    color: "white",
  },
  username: {
    color: "white",
    fontSize: 30,
  },
});

export default withStyles(styles)(Header);
