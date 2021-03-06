import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { login } from '../store/user/actions';
import CssBaseline from '@material-ui/core/CssBaseline';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding: 25px;
`;

const Login = (props) => {
  const { login, token, loginError } = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const tryToLogin = () => {
    // login('bebok1', '123456');
    login(userName, password);
  };

  useEffect(() => {
    token != null ? console.log('logged') : console.log('unlogged');
  }, [token]);

  const displayError = () => {
    return (loginError !== null);
  };

  const linkStyles = {
    position: 'absolute',
    top: '10px',
    right: '12px',
    color: '#1b00ffde'
  };

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: '100vh' }}
    >
      <CssBaseline />
      <Wrapper style={{ position: 'relative' }}>
        <h1 style={{ margin: '0px' }}>Logowanie</h1>
        <TextField error={displayError()} onChange={(e) => { setUserName(e.target.value); }} label='Nazwa' />
        <TextField error={displayError()} onChange={(e) => { setPassword(e.target.value); }} label='Hasło' type='password' />
        <Button onClick={tryToLogin} style={{ marginTop: '10px' }} variant='contained' color='primary'>Wyślij</Button>
        <Link style={linkStyles} href='/register' color='textPrimary'>Rejestracja</Link>
      </Wrapper>
    </Grid>
  );
};

const mapStoreStateToProps = ({ user }) => {
  return {
    ...user
  };
};

export default connect(
  mapStoreStateToProps,
  { login }
)(Login);
