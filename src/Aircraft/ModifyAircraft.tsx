import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../AuthContext";
import { Dialog } from "@mui/material";

export interface ModifyAircraftProps {
    open: boolean;
    onClose: () => void;
  }

function ModifyAircraft(props: ModifyAircraftProps) {
    const context = useContext(AuthorizationContext);
    const navigate = useNavigate();

    const {open, onClose } = props;

    const handleClose = () => {
        onClose();
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    interface UserCredentials { 
        UserNameOrEmail: string, 
        password: string 
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={open}>
                
            </Dialog>
        </div>
    );
}

export default ModifyAircraft;