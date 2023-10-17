import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../AuthContext";
import { Dialog, TextField } from "@mui/material";
import PrimaryButton from "../Buttons/PrimaryButton";

export interface ModifyAircraftProps {
    open: boolean;
    onClose: () => void;
    planeId: string;
}

interface Changes {
    planeId: string;
    nickname: string;   
}

function ModifyAircraft(props: ModifyAircraftProps) {

    const context = useContext(AuthorizationContext);
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    interface UserCredentials { 
        UserNameOrEmail: string, 
        password: string 
    };

    const handleConfirm = async () => {
        const userCredentials: UserCredentials = { UserNameOrEmail: email, password: password };
        const changes: Changes = { planeId: props.planeId, nickname: nickname };
        await fetch('http://localhost:5201/api/plane/update', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changes), 
        })
        .then(response => response.json())
        .then(data => {
            console.log(changes.planeId)
        })
        .catch(error => {
            console.error(error);
            alert('You are not allowed to modify airplane nicknames');
        });
    }

    const [nickname, setNickname] = useState('');
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    }

    const navigate = useNavigate();

    const {open, onClose } = props;

    const handleClose = () => {
        onClose();
    };

    interface UserCredentials { 
        UserNameOrEmail: string, 
        password: string 
    };

    return (
        <div className="modify-aircraft-popup">
            <Dialog onClose={handleClose} open={open} sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "50em",
                    height: "100%",
                    maxHeight: "40em",
                    padding: "2em"
                  },
                },
              }}>
                <div className="modify-aircraft-popup-content">
                    <h1>Set a Nickname</h1>
                    <form>
                        <TextField id="nickname" label="Nickname" type="name" value={nickname} onChange={handleNicknameChange} />
                    </form>
                    <PrimaryButton text="Confirm Changes" onClick={handleConfirm}/>
                </div>
            </Dialog>
        </div>
    );
}

export default ModifyAircraft;