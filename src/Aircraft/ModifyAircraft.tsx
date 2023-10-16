import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../AuthContext";
import { Dialog, TextField } from "@mui/material";

export interface ModifyAircraftProps {
    open: boolean;
    onClose: () => void;
}

function ModifyAircraft(props: ModifyAircraftProps) {

    const [nickname, setNickname] = useState('');
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    }

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
        <div className="modify-aircraft-popup">
            <Dialog onClose={handleClose} open={open}>
                <div className="modify-aircraft-popup-content">
                    <h1>Set a Nickname</h1>
                    <form>
                        <TextField id="nickname" label="Nickname" type="name" value={nickname} onChange={handleNicknameChange} />
                    </form>
                </div>
            </Dialog>
        </div>
    );
}

export default ModifyAircraft;