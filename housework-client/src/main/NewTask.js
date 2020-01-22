import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { setNewVisibility } from '../store/tasks/actions';
import socket from '../socket/Socket';

const NewTask = (props) => {
  const { tasks, setNewVisibility } = props;
  const [open, setOpen] = useState(tasks.newVisible);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setOpen(tasks.newVisible);
  }, [tasks.newVisible]);

  const handleClose = () => {
    setNewVisibility(false);
  };

  const handleAddTask = () => {
    socket.task.requestAddTask(title, description);
    setTitle('');
    setDescription('');
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Dodaj nowe zadanie</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => { setTitle(e.target.value); }}
            autoFocus
            margin='dense'
            id='title'
            label='Tytuł'
            type='text'
            fullWidth
            required
            value={title}
          />
          <TextField
            onChange={(e) => { setDescription(e.target.value); }}
            margin='dense'
            id='description'
            label='Opis'
            type='text'
            fullWidth
            value={description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Wróć
          </Button>
          <Button onClick={handleAddTask} color='primary'>
            Potwierdź
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStoreStateToProps = ({ tasks }) => {
  return {
    tasks
  };
};

export default connect(
  mapStoreStateToProps,
  { setNewVisibility }
)(NewTask);
