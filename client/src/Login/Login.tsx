import React, { useState } from 'react';
import { TextField, Button, makeStyles, Typography } from '@material-ui/core';

import { loginRequest } from '../API';
import { history } from '../App';
import useStore from '../store';

const Login: React.FC = () => {
  const styles = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const setUser = useStore((state) => state.setUser);

  const login = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const response = await loginRequest(username, password);

    // If there are any errors with form fields
    if (Array.isArray(response.error)) {
      const newErrors: Record<string, string> = {};
      response.error.map((error: any) => (newErrors[error.param] = error.msg));
      setErrors(newErrors);
    }
    // TODO handle failed login, server error
    else if (response.status !== 200) {
      // Reset errors
      setErrors({});
    }
    // User has been logged in
    else {
      setUser(response.data);
      history.push('/latest');
    }
  };

  return (
    <form className={styles.form} onSubmit={login}>
      <Typography variant="h5">Login</Typography>
      <TextField
        className={styles.extraMargin}
        id="username"
        label="username"
        required
        value={username}
        autoFocus
        error={!!errors.username}
        helperText={errors.username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        className={styles.extraMargin}
        id="password"
        type="password"
        required
        label="password"
        value={password}
        error={!!errors.password}
        helperText={errors.password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button className={styles.extraMargin} type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  );
};

export default Login;

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  extraMargin: {
    marginTop: '10px',
  },
}));
