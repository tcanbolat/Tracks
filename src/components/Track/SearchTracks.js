import React, { useState, useRef, useContext } from "react";
import { ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";
import { SearchBarContext } from "../../context/searchBar-context";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const SearchTracks = ({ classes, setSearchResults }) => {
  const [search, setSearch] = useState("");
  const inputEl = useRef();

const toggle = useContext(SearchBarContext).toggleSearchBar;

  const clearSearchInput = () => {
    toggle()
    setSearchResults([]);
    setSearch("");
    inputEl.current.focus();
  };

  const handleSubmit = async (e, client) => {
    e.preventDefault();
    const res = await client.query({
      query: SEARCH_TRACKS_QUERY,
      variables: { search },
    });
    setSearchResults(res.data.tracks);
  };
  return (
    <ApolloConsumer>
      {(client) => (
        <form className={classes.form} onSubmit={(e) => handleSubmit(e, client)}>
          <Paper className={classes.root} elevation={1}>
            <IconButton onClick={clearSearchInput}>
              <ClearIcon />
            </IconButton>
            <TextField
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              inputRef={inputEl}
              fullWidth
              placeholder="Search all tracks"
            />
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>
      )}
    </ApolloConsumer>
  );
};

const SEARCH_TRACKS_QUERY = gql`
  query($search: String) {
    tracks(search: $search) {
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
`;

const styles = (theme) => ({
  root: {
    position: "fixed",
    margin: theme.spacing(1),
    display: "flex",
    top: "0",
    zIndex: "1200",
    width: "65%"
  },
  form: {
    display: "flex",
    justifyContent: "center",
  }
});

export default withStyles(styles)(SearchTracks);
