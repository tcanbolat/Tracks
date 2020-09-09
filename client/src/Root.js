import React from "react";
import withRoot from "./withRoot";
import { Query } from "react-apollo";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { gql } from "apollo-boost";

import App from "./pages/App";
import Profile from "./pages/Profile";
import Header from "./components/Shared/Header";

const Root = () => (
  <Query query={ME_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error</div>;

      return (
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/profile/:id" component={Profile} />
          </Switch>
        </BrowserRouter>
      );
    }}
  </Query>
);

const ME_QUERY = gql`
  {
    me {
      id
      username
      email
    }
  }
`;

// const GET_TRACKS_QUERY = gql`
//   {
//     tracks {
//       id
//       title
//       description
//       url
//     }
//   }
// `;

export default withRoot(Root);
