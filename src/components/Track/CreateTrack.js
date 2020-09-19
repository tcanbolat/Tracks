import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { Fab } from "@material-ui/core";
import Error from "../Shared/Error";
import { GET_TRACKS_QUERY } from "../../pages/App";

const CreateTrack = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fileError, setFileError] = useState();

  const handleAudioChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileSizeLimit = 10000000; //10mb
    if (selectedFile && selectedFile.size > fileSizeLimit) {
      setFileError(`${selectedFile.name}: File size is too large`);
    } else {
      setFile(selectedFile);
      setFileError("");
    }
  };

  const handleAudioUpload = async () => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("resource_type", "raw");
      data.append("upload_preset", "tracks-app");
      data.append("cloud_name", "atc-cloudinary");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/atc-cloudinary/raw/upload",
        data
      );
      return res.data.url;
    } catch (err) {
      console.err("Error uploading file", err);
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e, createTrack) => {
    e.preventDefault();
    setSubmitting(true);
    const uploadedUrl = await handleAudioUpload();
    createTrack({ variables: { title, description, url: uploadedUrl } });
  };

  const handleUpdateCache = (cache, { data: { createTrack } }) => {
    const data = cache.readQuery({ query: GET_TRACKS_QUERY });
    const tracks = data.tracks.concat(createTrack.track);
    cache.writeQuery({ query: GET_TRACKS_QUERY, data: { tracks } });
  };

  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        className={classes.fab}
        color="secondary"
        variant="round"
      >
        {open ? <ClearIcon /> : <AddIcon />}
      </Fab>
      <Mutation
        mutation={CREATE_TRACK_MUTATION}
        onCompleted={(data) => {
          console.log(data);
          setSubmitting(false);
          setOpen(false);
          setTitle("");
          setDescription("");
          setFile("");
        }}
        update={handleUpdateCache}
      >
        {(createTrack, { loading, error }) => {
          if (error) return <Error error={error} />;
          return (
            <Dialog open={open} className={classes.dialog}>
              <form onSubmit={(e) => handleSubmit(e, createTrack)}>
                <DialogTitle>Create Track</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Add a title, Description & audio file (under 10mb)
                  </DialogContentText>
                  <FormControl fullWidth>
                    <TextField
                      className={classes.textField}
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      label="Title"
                      placeholder="Add title"
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      className={classes.textField}
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      multiline
                      rows="3"
                      label="Description"
                      placeholder="Add description"
                    />
                  </FormControl>
                  <FormControl error={Boolean(fileError)}>
                    <input
                      className={classes.input}
                      onChange={handleAudioChange}
                      id="audio"
                      required
                      type="file"
                      accept="audio/*"
                    />
                    <label htmlFor="audio">
                      <Button
                        className={classes.button}
                        variant="outlined"
                        color={file ? "secondary" : "inherit"}
                        component="span"
                      >
                        Audio File
                        <LibraryMusicIcon className={classes.icon} />
                      </Button>
                      {file && file.name}
                      <FormHelperText>{fileError}</FormHelperText>
                    </label>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button
                    disable={submitting}
                    onClick={() => setOpen(false)}
                    className={classes.cancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={classes.save}
                    type="submit"
                    disabled={
                      submitting ||
                      !title.trim() ||
                      !description.trim() ||
                      !file
                    }
                  >
                    {submitting ? (
                      <CircularProgress className={classes.save} size={24} />
                    ) : (
                      "Add Track"
                    )}
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          );
        }}
      </Mutation>
    </>
  );
};

const CREATE_TRACK_MUTATION = gql`
  mutation($title: String!, $description: String!, $url: String!) {
    createTrack(title: $title, description: $description, url: $url) {
      track {
        id
        title
        description
        url
        likes {
          id
        }
        postedBy {
          id
          username
        }
      }
    }
  }
`;

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  dialog: {
    margin: "0 auto",
    maxWidth: 550,
  },
  textField: {
    margin: theme.spacing(),
  },
  cancel: {
    color: "red",
  },
  save: {
    color: "green",
  },
  button: {
    margin: theme.spacing(2),
  },
  icon: {
    marginLeft: theme.spacing(),
  },
  input: {
    display: "none",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: "200",
  },
});

export default withStyles(styles)(CreateTrack);
