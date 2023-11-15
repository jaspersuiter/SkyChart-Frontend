import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import SecondaryButton from "../../Utils/Buttons/SecondaryButton";
import PrimaryButton from "../../Utils/Buttons/PrimaryButton";
import { useState } from "react";
interface User {
  id: number;
  lastName: string;
  firstName: string;
  phoneNum: string;
  email: string;
  accountType: string;
  username: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  preferredInstructor: string;
  preferredPlane: string;
}

interface EditUserDialogProps {
  user: User;
  openEditUserDialog: boolean;
  setOpenEditUserDialog: React.Dispatch<React.SetStateAction<boolean>>;
  airplaneModels: string[];
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  user,
  openEditUserDialog,
  setOpenEditUserDialog,
  airplaneModels,
}) => {
  const [doUpdateUserType, setDoUpdateUserType] = useState(false);

  const [approvedModel, setApprovedModel] = useState<string[]>([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChangeSelector = (
    event: SelectChangeEvent<typeof approvedModel>
  ) => {
    const {
      target: { value },
    } = event;
    setApprovedModel(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleEditUserDialogClose = (confirmed: boolean) => {
    if (confirmed === true) {
      updateUser(doUpdateUserType);
    }
    setOpenEditUserDialog(false);
    setDoUpdateUserType(false);
  };

  const updateUser = (doUpdateUserType: boolean) => {
    if (doUpdateUserType) {
      fetch(
        `http://localhost:5201/api/user/update-account-type?userId=${user.id}`,
        { credentials: "include", method: "PUT" }
      );
    }
  };

  return (
    <div className="edit-user-dialog">
      <Dialog
        open={openEditUserDialog}
        onClose={handleEditUserDialogClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              maxWidth: "65em",
              height: "40em",
              maxHeight: "90vh",
              padding: "2em",
            },
          },
        }}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          <b>{`Edit ${user.firstName || ""} ${user.lastName || ""}`}</b>
        </DialogTitle>

        <DialogContent className="edit-user-content">
          <div className="info-section">
            <p className="p">
              Username: <b>{user.username}</b>
            </p>
            <p className="p">
              Email: <b>{user.email}</b>
            </p>
            <p className="p">
              Phone Number: <b>{user.phoneNum}</b>
            </p>
            <p className="p">
              Address: <b>{user.address}</b>
            </p>
            <p className="p">
              Emergency Contact Name: <b>{user.emergencyContactName}</b>
            </p>
            <p className="p">
              Emergency Contact Phone Number:{" "}
              <b>{user.emergencyContactPhone}</b>
            </p>
            {user.preferredInstructor ? (
              <p className="p">
                Preferred Instructor: <b>{user.preferredInstructor}</b>
              </p>
            ) : null}
            {user.preferredPlane ? (
              <p className="p">
                Preferred Plane: <b>{user.preferredPlane}</b>
              </p>
            ) : null}
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="plane-model-label">
                Approved Plane Models
              </InputLabel>
              <Select
                labelId="plane-model-label"
                id="plane-model-checkbox"
                multiple
                fullWidth
                value={approvedModel}
                onChange={handleChangeSelector}
                input={<OutlinedInput label="Approved Plane Models" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {airplaneModels.map((model) => (
                  <MenuItem key={model} value={model}>
                    <Checkbox checked={approvedModel.indexOf(model) > -1} />
                    <ListItemText primary={model} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {user.accountType === "pilot" ? (
            doUpdateUserType ? (
              <SecondaryButton
                text="Revert user to a Pilot?"
                onClick={() => setDoUpdateUserType(false)}
              />
            ) : (
              <PrimaryButton
                text="Make user an Instructor?"
                onClick={() => setDoUpdateUserType(true)}
              />
            )
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEditUserDialogClose(true)}>
            Confirm
          </Button>
          <Button onClick={() => handleEditUserDialogClose(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditUserDialog;
