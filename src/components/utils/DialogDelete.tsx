import {
    Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, Button
} from "@mui/material";

const DialogDelete = ({ open, handleClose, handleDelete }) => {
    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <div style={{ backgroundColor: "#131515" }}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Are you sure?
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default DialogDelete;