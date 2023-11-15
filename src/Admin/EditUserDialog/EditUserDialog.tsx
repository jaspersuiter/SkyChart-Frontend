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
  MenuProps,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import SecondaryButton from "../../Utils/Buttons/SecondaryButton";
import PrimaryButton from "../../Utils/Buttons/PrimaryButton";
import { ReactNode, useEffect, useState } from "react";
interface User {
  id: number;
  lastName: string;
  firstName: string;
  phoneNum: string;
  email: string;
  accountType: string;
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
  const [newEmail, setNewEmail] = useState("");
  const [newPhoneNum, setNewPhoneNum] = useState("");

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

  useEffect(() => {
    // Set initial values when the dialog is opened
    setNewEmail(user.email || "");
    setNewPhoneNum(user.phoneNum || "");
  }, [user.email, user.phoneNum]);

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
  };

  const updateUser = (doUpdateUserType: boolean) => {
    if (doUpdateUserType) {
      fetch(
        `http://localhost:5201/api/user/update-account-type?userId=${user.id}`,
        { credentials: "include", method: "PUT" }
      );
    }

    fetch("http://localhost:5201/api/user/update", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        email: newEmail || null,
        phoneNumber: newPhoneNum || null,
      }),
    });

    console.log(user.id, newEmail, newPhoneNum);
  };

  return (
    <div className="edit-user-dialog">
      <Dialog
        open={openEditUserDialog}
        onClose={handleEditUserDialogClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "fit-content",
              maxWidth: "57.5vw",
              height: "50%",
              maxHeight: "90vh",
              padding: "30px",
            },
          },
        }}
      >
        <DialogTitle>{`Edit ${user.firstName || ""} ${
          user.lastName || ""
        }`}</DialogTitle>

        <DialogContent className="edit-user-content">
          <TextField
            id="email"
            name="email"
            label="Email"
            type="string"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            fullWidth
          />
          <TextField
            id="phoneNum"
            name="phoneNum"
            label="Phone Number"
            type="string"
            value={newPhoneNum}
            fullWidth
            onChange={(e) => setNewPhoneNum(e.target.value)}
          />
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
