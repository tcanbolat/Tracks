import React from 'react';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";
import { GET_TRACKS_QUERY } from "../../pages/App";

const DeleteTrack = ({ track }) => {

  const handleUpdateCache = (cache, { data: { deleteTrack } }) => {
    const data = cache.readQuery({ query: GET_TRACKS_QUERY });
    const index = data.tracks.findIndex(
      (track) => Number(track.id) === deleteTrack.trackId
    );
    const tracks = [
      ...data.tracks.slice(0, index),
      ...data.tracks.slice(index + 1),
    ];
    cache.writeQuery({ query: GET_TRACKS_QUERY, data: { tracks } });
  };

  return (
      <Mutation
        mutation={DELETE_TRACK_MUTATION}
        variables={{ trackId: track.id }}
        onCompleted={(data) => {
          console.log({ data });
        }}
        update={handleUpdateCache}
      >
        {(deleteTrack) => (
          <IconButton onClick={deleteTrack}>
            <TrashIcon />
            delete{" "}
          </IconButton>
        )}
      </Mutation>
  );
};

const DELETE_TRACK_MUTATION = gql`
  mutation($trackId: Int!) {
    deleteTrack(trackId: $trackId) {
      trackId
    }
  }
`;

export default DeleteTrack;
