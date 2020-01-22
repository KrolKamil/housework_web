import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { setEditVisibility } from '../store/tasks/actions';
import socket from '../socket/Socket';
// import { getTaskToEditFromStore } from '../utils/utils';

const EditTask = (props) => {
  const { tasks, setEditVisibility } = props;
  const [open, setOpen] = useState(tasks.editVisible);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setOpen(tasks.editVisible);
  }, [tasks.editVisible]);

  useEffect(() => {
    if (tasks.toEdit !== null) {
      setTitle(tasks.toEdit.title);
      setDescription(tasks.toEdit.description);
    }
  }, [tasks.toEdit]);

  const handleClose = () => {
    setEditVisibility(false);
  };

  const handleEditTask = () => {
    const taskToEdit = {
      id: tasks.toEdit.id,
      title: title,
      description: description
    };
    socket.task.requestEditTask(taskToEdit);
    setTitle('');
    setDescription('');
    handleClose();
  };

  const elementDisabled = () => {
    if (tasks.toEdit !== null) {
      if ((tasks.toEdit.owned) || (tasks.toEdit.position === 'TODO')) {
        return false;
      }
    }
    return true;
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edytuj zadanie</DialogTitle>
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
            disabled={elementDisabled()}
            multiline
          />
          <TextField
            onChange={(e) => { setDescription(e.target.value); }}
            margin='dense'
            id='description'
            label='Opis'
            type='text'
            fullWidth
            value={description}
            disabled={elementDisabled()}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Wróć
          </Button>
          <Button disabled={elementDisabled()} onClick={handleEditTask} color='primary'>
            Zapisz
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
  { setEditVisibility }
)(EditTask);
