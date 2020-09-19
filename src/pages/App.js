import React, { useState, useContext } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { SearchBarContext } from "../context/searchBar-context";
import withStyles from "@material-ui/core/styles/withStyles";
import SearchTracks from "../components/Track/SearchTracks";
import TrackList from "../components/Track/TrackList";
import CreateTrack from "../components/Track/CreateTrack";
import Loading from "../components/Shared/Loading";
import Error from "../components/Shared/Error";


const App = ({ classes }) => {
  const [searchResults, setSearchResults] = useState([]);
  const tvalue = useContext(SearchBarContext).searchToggle;
  return (
    <div className={classes.container}>
      {tvalue ? <SearchTracks setSearchResults={setSearchResults} /> : null}
      <CreateTrack />
      <Query query={GET_TRACKS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <Error error={error} />;
          const tracks = searchResults.length > 0 ? searchResults : data.tracks;
          return <TrackList tracks={tracks} />;
        }}
      </Query>
    </div>
  );
};

export const GET_TRACKS_QUERY = gql`
  {
    tracks { 
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
  container: {
    maxWidth: 1400,
    marginTop: "75px",
  },
});

export default withStyles(styles)(App);
