import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../../AuthContext";
import { Dialog, TextField } from "@mui/material";
import PrimaryButton from "../../Utils/Buttons/PrimaryButton";
import { makeApiCall } from "../../APICall";
import { Plane } from "../../../api-typescript/Plane";

export interface ModifyAircraftProps {
    open: boolean;
    onClose: () => void;
    planeId: string;
    updateScreen: () => void;
    setCurrentPlane: (plane: any) => void;
}

interface Changes {
    planeId: string;
    nickname: string;   
}

async function getPlane(planeid: string): Promise<
  Array<Plane>
> {

  const params = {
    planeid: planeid
    
}

  try {
    const responseData2 = await makeApiCall("/api/plane/get", {}, "get", params);
    return responseData2;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function ModifyAircraft(props: ModifyAircraftProps) {
    const [nickname, setNickname] = useState('');
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    }
    const {open, onClose } = props;

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = async () => {
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
        .catch(error => {
            console.error(error);
            alert('You are not allowed to modify airplane nicknames');
        });
        props.updateScreen();
        props.setCurrentPlane(await getPlane(props.planeId));
        handleClose();
    }
    

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
                    <h1>Admin - Modify Aircraft</h1>
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