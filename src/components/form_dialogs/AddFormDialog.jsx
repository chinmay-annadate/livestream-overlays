import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddFormDialog({ add }) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("");
  const [top, setTop] = useState("");
  const [left, setLeft] = useState("");
  const [size, setSize] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndAdd = () => {
    setOpen(false);
    add(text, top, left, size);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add overlay
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add overlay</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter text, top and left distances
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
          <TextField
            margin="dense"
            id="name"
            label="Top"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setTop(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Left"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setLeft(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Size"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setSize(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseAndAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
