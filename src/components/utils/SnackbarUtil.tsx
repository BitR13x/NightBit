import { Container, Alert, Snackbar } from "@mui/material";
import "./Message.css";

const SnackbarUtil = ({ msg }) => {
/*     const handleCloseSnacBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') return;
      setSnackBarStatus({open: false, message: "", severity: false});
    }; */
    return (
      <Container>
        <Snackbar open={true} autoHideDuration={4000}>
            <Alert sx={{ maxWidth: 600, width: "100%" }} severity="error">{msg}</Alert>
        </Snackbar>
      </Container>
    );
}

export default SnackbarUtil;
