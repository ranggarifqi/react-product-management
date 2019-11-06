import React, { useState, useRef } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import api from "../config/api";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  circularProgress: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(3, 0, 2)
  }
}));

const RenderButton = ({ submitLoading }) => {
  const classes = useStyles();

  if (submitLoading) {
    return (
      <div className={classes.circularProgress}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      Sign In
    </Button>
  );
};

export default function LoginScreen() {
  const classes = useStyles();
  const formRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const onSubmit = async e => {
    e.preventDefault();
    const payload = {
      email,
      password
    };
    try {
      setSubmitLoading(true);
      const { data } = await api.post("/users/login", payload);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Product Management Tools
        </Typography>
        <ValidatorForm
          ref={formRef}
          className={classes.form}
          onSubmit={onSubmit}
          onError={errors => console.log(errors)}
        >
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onChangeEmail}
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangePassword}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <RenderButton submitLoading={submitLoading} />
        </ValidatorForm>
      </div>
    </Container>
  );
}
