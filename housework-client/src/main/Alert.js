import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { socketConnectionStates } from '../store/socket/actions';

const Alert = (props) => {
  const [open, setOpen] = useState(false);
  const { socket, user } = props;

  useEffect(() => {
    if ((socket.connectionState === socketConnectionStates.CLOSED) && (user.token !== null)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  });

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div>
      <Dialog
        open={open}
      >
        <DialogTitle id='alert-dialog-title'>{'Czyżbyś stracił połączenie z internetem ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Do poprawnego działania aplikacji wymagane jest stałe łącze internetowe.
            Każde przerwanie połaczenia wymaga odświeżenia strony.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color='primary' autoFocus>
            RESTART
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStoreStateToProps = ({ user, socket }) => {
  return {
    user,
    socket
  };
};

export default connect(
  mapStoreStateToProps,
  null
)(Alert);
