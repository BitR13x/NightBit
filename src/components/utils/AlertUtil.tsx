import { Container, Alert } from "@mui/material";
import "./AlertUtil.css";

const AlertUtil = ({ msg }) => (
  <Container>
    <div className="alertContainer">
        <Alert sx={{ maxWidth: 600, width: "100%" }} severity="error">{msg}</Alert>
    </div>
  </Container>
);


export default AlertUtil;
