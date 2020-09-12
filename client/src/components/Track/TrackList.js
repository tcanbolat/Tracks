import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AudioPlayer from "../Shared/AudioPlayer";
import LikeTrack from "./LikeTrack";
import DeleteTrack from "./DeleteTrack";
import UpdateTrack from "./UpdateTrack";

const TrackList = ({ classes, tracks }) => (
  <List>
    {tracks.map((track) => (
      <Accordion key={track.id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <ListItem className={classes.root}>
            <LikeTrack trackId={track.id} likeCount={track.likes.length} />
            <ListItemText
              primaryTypographyProps={{
                variant: "subtitle1",
                color: "primary",
              }}
              primary={track.title}
              secondary={
                <Link
                  className={classes.link}
                  to={`/profile/${track.postedBy.id}`}
                >
                  {track.postedBy.username}
                </Link>
              }
            />
            <AudioPlayer url={track.url} />
          </ListItem>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Typography variant="body1">{track.description}</Typography>
        </AccordionDetails>
        <AccordionActions>
          <UpdateTrack track={track} />
          <DeleteTrack track={track} />
        </AccordionActions>
      </Accordion>
    ))}
  </List>
);

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  details: {
    alignItems: "center",
  },
  link: {
    color: "#424242",
    textDecoration: "none",
    "&:hover": {
      color: "black",
    },
  },
};

export default withStyles(styles)(TrackList);
