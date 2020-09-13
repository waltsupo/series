import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";

import { loginRequest } from "../API";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const login = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    // Reset errors
    setErrors({});

    const response = await loginRequest(username, password);

    if (response.error) {
      const errors: any = {};
      response.error.map((error: any) => (errors[error.param] = error.msg));
      setErrors(errors);
    } else {
      // Success
    }
  };

  return (
    <LoginForm onSubmit={login}>
      <Title>Login</Title>
      <TextField
        id="username"
        label="username"
        required
        value={username}
        autoFocus
        error={!!errors["username"]}
        helperText={errors["username"]}
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        id="password"
        type="password"
        required
        label="password"
        value={password}
        error={!!errors["password"]}
        helperText={errors["password"]}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </LoginForm>
  );
};

export default Login;

const LoginForm = styled.form`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  div,
  button {
    margin-top: 10px;
  }
`;

const Title = styled.div`
  font-size: 24px;
`;
