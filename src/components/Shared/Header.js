import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { SearchBarContext } from "../../context/searchBar-context";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PlayCircleFilled from "@material-ui/icons/PlayCircleFilled";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import Typography from "@material-ui/core/Typography";
import Signout from "../Auth/Signout";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger ? "#424242" : "transparent",
      transition: trigger ? "0.3s" : "0.5s",
      boxShadow: "none",
    },
  });
}

function Header({ props, classes, currentUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const toggle = useContext(SearchBarContext).toggleSearchBar;
  let location = useLocation();
  console.log(location.pathname);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {currentUser && (
        <Link className={classes.userProfile} to={`/profile/${currentUser.id}`}>
          <MenuItem onClick={handleMenuClose}>
            <Button>
              <Typography>Profile</Typography>
              <AccountCircleTwoToneIcon className={classes.faceIcon} />
            </Button>
          </MenuItem>
        </Link>
      )}
      <MenuItem onClick={handleMenuClose}>
        <Signout />
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    />
  );

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className={classes.root}>
          <Toolbar>
            <Link className={classes.grow} to="/">
              <PlayCircleFilled className={classes.logo} />
              <Typography variant="h6" noWrap>
                Tracks
              </Typography>
            </Link>
            {location.pathname === "/" ? (
              <div className={classes.search}>
                <Button className={classes.searchButton} onClick={toggle}>
                  <SearchIcon className={classes.searchIcon} />
                  Search
                </Button>
              </div>
            ) : null}
            {/* DESKTOP_MENU */}
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircleTwoToneIcon className={classes.faceIcon} />
                <Typography>{currentUser.username}</Typography>
              </IconButton>
            </div>
            {/* MOBILE_MENU */}
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {renderMobileMenu}
      {renderMenu}
      <Toolbar />
    </React.Fragment>
  );
}

const styles = (theme) => ({
  root: {
    color: "primary",
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  logo: {
    marginRight: theme.spacing(1),
    fontSize: 30,
    color: "red",
  },
  faceIcon: {
    marginRight: theme.spacing(),
    marginLeft: theme.spacing(),
    fontSize: 30,
    color: "white",
  },
  username: {
    color: "white",
    fontSize: 30,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  userProfile: {
    textDecoration: "none",
  },
  searchIcon: {
    marginRight: theme.spacing(1),
  },
  search: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  searchButton: {
    paddingLeft: theme.spacing(30),
    paddingRight: theme.spacing(30),
  },
});

export default withStyles(styles)(Header);
