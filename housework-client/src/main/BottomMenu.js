import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { setNewVisibility } from '../store/tasks/actions';
import { logout } from '../store/user/actions';
import socket from '../socket/Socket';

const Container = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BottomMenu = (props) => {
  const { setNewVisibility, logout } = props;

  const logoutAction = () => {
    socket.stop();
    logout();
  };

  return (
    <Container>
      <Button style={{ flex: '1', backgroundColor: 'rgb(37, 44, 67)' }} onClick={() => { logoutAction(); }} variant='contained' color='primary'>Wyloguj</Button>
      <Button style={{ flex: '1', backgroundColor: 'rgb(24, 60, 175)' }} onClick={() => { setNewVisibility(true); }} variant='contained' color='primary'>Dodaj Zadanie</Button>
    </Container>
  );
};

const mapStoreStateToProps = ({ user }) => {
  return {
    ...user
  };
};

export default connect(
  mapStoreStateToProps,
  { setNewVisibility,
    logout }
)(BottomMenu);
