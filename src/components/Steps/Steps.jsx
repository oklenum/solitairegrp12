import React, { useState} from 'react'
import ReactiveButton from 'reactive-button'
import { TextField, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Button, Box } from '@mui/material';

   


const Steps = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const dialogOpenHandler = () => {
        setDialogOpen(true);
    };

    const dialogCloseHandler = () => {
        setDialogOpen(false);
    }


  return (
    <div className='steps'>
        <ReactiveButton
            onClick={dialogOpenHandler}
            color={'blue'}
            rounded={true}
            size={'large'}
            idleText={'Adjust Card'}
        />

        <Dialog open={dialogOpen} onClose={dialogCloseHandler}>
            <DialogTitle>Adjust Last Scanned Card</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    If the last scanned card was incorrect, adjust the value here before proceeding.
                    You will receive a 1 minute time penalty.
                </DialogContentText>
                <TextField
                autoFocus
                margin='dense'
                id='adjust-card'
                label="Correct Card"
                type='text'
                fullWidth
                variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={dialogCloseHandler}>Cancel</Button>
                <Button onClick={dialogCloseHandler}>Proceed</Button>
            </DialogActions>
        </Dialog>

    </div>
  )
}

export default Steps