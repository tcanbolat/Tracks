import React, { useState } from "react";
import withRoot from "./withRoot";
import { Query } from "react-apollo";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { gql } from "apollo-boost";

import App from "./pages/App";
import Profile from "./pages/Profile";
import Header from "./components/Shared/Header";
import Loading from "./components/Shared/Loading";
import Error from "./components/Shared/Error";
import SearchBarProvider from "./context/searchBar-context";

export const UserContext = React.createContext();

const Root = (props) => {
  const [searchToggle, setSearchToggle] = useState(false);

  return (
    <Query query={ME_QUERY} fetchPolicy="cache-and-network">
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error} />;
        const currentUser = data.me;

        return (
          <BrowserRouter>
              <UserContext.Provider value={currentUser}>
                <SearchBarProvider>
                  <Header
                    searchToggle={setSearchToggle}
                    currentUser={currentUser}
                  />
                  <Switch>
                    <Route
                      exact
                      path="/"
                      component={(props) => (
                        <App searchToggle={setSearchToggle} props={props} />
                      )}
                    />
                  <Route path="/profile/:id" component={Profile} />
                </Switch>
                </SearchBarProvider>
              </UserContext.Provider>
          </BrowserRouter>
        );
      }}
    </Query>
  );
};

export const ME_QUERY = gql`
  {
    me {
      id
      username
      email
      likeSet {
        track {
          id
        }
      }
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
