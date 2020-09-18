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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AudioPlayer from "../Shared/AudioPlayer";
import LikeTrack from "./LikeTrack";
import DeleteTrack from "./DeleteTrack";
import UpdateTrack from "./UpdateTrack";
import { UserContext } from "../../Root";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";

const TrackList = ({ classes, tracks }) => {
  const [open, setOpen] = useState(false);
  const currentUser = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
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
                    onClick={handleClickOpen}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                  >
                    <MoreVertIcon />
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
            {currentUser.id === track.postedBy.id && (
              <Dialog
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={open}
              >
                <DialogTitle id="simple-dialog-title">options</DialogTitle>
                <List>
                  <ListItem autoFocus button>
                    <DeleteTrack track={track} />
                  </ListItem>
                  <ListItem autoFocus button>
                    <UpdateTrack track={track} />
                  </ListItem>
                </List>
              </Dialog>
            )}
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
    maxWidth: 345,
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
