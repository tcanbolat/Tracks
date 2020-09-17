import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

import { useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { white } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AudioTrackIcon from "../../assets/svg/audioTrack.svg";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AudioPlayer from "../Shared/AudioPlayer";
import LikeTrack from "./LikeTrack";
import DeleteTrack from "./DeleteTrack";
import UpdateTrack from "./UpdateTrack";
import { UserContext } from "../../Root";
import { Divider } from "@material-ui/core";

const TrackList = ({ classes, tracks }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const currentUser = useContext(UserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  console.log(tracks);
  return (
    <Grid justify="center" container>
      {tracks.map((track) => (
        <>
          <Card className={classes.root} key={track.id}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  <Link
                  className={classes.link}
                  to={`/profile/${track.postedBy.id}`}
                  color="white"
                >
                  {track.postedBy.username[0]}
                </Link>
                </Avatar>
              }
              action={
                currentUser.id === track.postedBy.id && (
                  <IconButton
                    onClick={handleClick}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                  >
                    <MoreVertIcon />
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>
                        <DeleteTrack track={track} />
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <UpdateTrack track={track} />
                      </MenuItem>
                    </Menu>
                  </IconButton>
                )
              }
              title={track.title}
              subheader={
                <Link
                  className={classes.link}
                  to={`/profile/${track.postedBy.id}`}
                >
                  {track.postedBy.username}
                </Link>
              }
            />
            <Divider variant="middle" />
            <div className={classes.player}>
              <AudioPlayer url={track.url} />
            </div>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {track.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <LikeTrack trackId={track.id} likeCount={track.likes.length} />
            </CardActions>
          </Card>
        </>
      ))}
    </Grid>
  );
};

const styles = (theme) => ({
  root: {
    minWidth: 345,
    margin: theme.spacing(5),
  },
  media: {
    height: "auto",
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: "#fff",
  },
  link: {
    color: "red",
    textDecoration: "none",
    "&:hover": {
      color: "grey",
    },
  },
});

export default withStyles(styles)(TrackList);
