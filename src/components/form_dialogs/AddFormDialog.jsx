import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ToggleButton from "@mui/material/ToggleButton";

export default function AddFormDialog({ add }) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("");
  const [top, setTop] = useState("");
  const [left, setLeft] = useState("");
  const [size, setSize] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndAdd = () => {
    setOpen(false);
    add(text, top, left, size, image, imageUrl);
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
            Enter text, top and left distances and size
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
          <ToggleButton
            value="check"
            selected={image}
            onChange={() => {
              setImage(!image);
            }}
          >
            Image
          </ToggleButton>
          {image ? (
            <TextField
              margin="dense"
              id="name"
              label="Image url"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseAndAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
