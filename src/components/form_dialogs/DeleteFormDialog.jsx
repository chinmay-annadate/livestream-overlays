import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteFormDialog({ del }) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndDelete = () => {
    setOpen(false);
    del(text);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete overlay
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete overlay</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter text
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Text"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseAndDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
