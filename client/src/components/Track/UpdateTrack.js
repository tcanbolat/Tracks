import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import Error from "../Shared/Error";
import { Typography } from "@material-ui/core";

const UpdateTrack = ({ classes, track }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(track.title);
  const [description, setDescription] = useState(track.description);
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

  const handleSubmit = async (e, updateTrack) => {
    e.preventDefault();
    setSubmitting(true);
    const uploadedUrl = await handleAudioUpload();
    updateTrack({
      variables: { trackId: track.id, title, description, url: uploadedUrl },
    });
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon /> edit
      </IconButton>
      <Mutation
        mutation={UPDATE_TRACK_MUTATION}
        onCompleted={(data) => {
          console.log(data);
          setSubmitting(false);
          setOpen(false);
          setTitle("");
          setDescription("");
          setFile("");
        }}
      >
        {(updateTrack, { loading, error }) => {
          if (error) return <Error error={error} />;
          return (
            <Dialog open={open} className={classes.dialog}>
              <form onSubmit={(e) => handleSubmit(e, updateTrack)}>
                <DialogTitle>Update Track</DialogTitle>
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
                      "Update Track"
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

const UPDATE_TRACK_MUTATION = gql`
  mutation($trackId: Int!, $title: String, $description: String, $url: String) {
    updateTrack(
      trackId: $trackId
      title: $title
      description: $description
      url: $url
    ) {
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
});

export default withStyles(styles)(UpdateTrack);
