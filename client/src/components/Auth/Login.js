import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Lock from "@material-ui/icons/Lock";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Error from "../Shared/Error";

const Login = ({ classes, setNewUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e, tokenAuth, client) => {
    e.preventDefault();
    const res = await tokenAuth();
    localStorage.setItem("authToken", res.data.tokenAuth.token);
    client.writeData({ data: { isLoggedIn: true } });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Lock />
        </Avatar>
        <Typography variant="h5">Welcome back!</Typography>
        <Typography variant="h6">Please login</Typography>

        <Mutation mutation={LOGIN_MUTATION} variables={{ username, password }}>
          {(tokenAuth, { loading, error, called, client }) => {
            return (
              <form
                onSubmit={(e) => handleSubmit(e, tokenAuth, client)}
                className={classes.form}
              >
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">username</InputLabel>
                  <Input
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">password</InputLabel>
                  <Input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button
                  className={classes.submit}
                  disabled={loading || !username.trim() || !password.trim()}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {loading ? (
                    <div>&#8226; &#8226; &#8226; &#8226;</div>
                  ) : (
                    "Login"
                  )}
                </Button>
                <Button
                  onClick={() => setNewUser(true)}
                  color="secondary"
                  variant="outlined"
                  fullWidth
                >
                  New user? Register here...
                </Button>
                {/* {Error Handling} */}
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </Paper>
    </div>
  );
};

const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const styles = (theme) => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

export default withStyles(styles)(Login);
