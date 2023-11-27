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
import { useEffect, useState } from "react";
interface User {
  id: number;
  lastName: string;
  firstName: string;
  phoneNum: string;
  email: string;
  type: string;
  username: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  preferredInstructor: string;
  preferredPlanes: string[];
  proficientPlaneModels: string[];
}

interface ViewUserDialogProps {
  user: User;
  openEditUserDialog: boolean;
  setOpenEditUserDialog: React.Dispatch<React.SetStateAction<boolean>>;
  airplaneModels: string[];
}

const ViewUserDialog: React.FC<ViewUserDialogProps> = ({
  user,
  openEditUserDialog,
  setOpenEditUserDialog,
  airplaneModels,
}) => {
  const [doUpdateUserType, setDoUpdateUserType] = useState(false);
  const [approvedModels, setApprovedModels] = useState<string[]>(
    user.proficientPlaneModels
  );

  useEffect(() => {
    // Set the initial state for approvedModels when the dialog is opened
    if (user.proficientPlaneModels === undefined) setApprovedModels([]);

    setApprovedModels(user.proficientPlaneModels);
  }, [openEditUserDialog, user.proficientPlaneModels]);

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
    event: SelectChangeEvent<typeof approvedModels>
  ) => {
    const {
      target: { value },
    } = event;
    setApprovedModels(typeof value === "string" ? value.split(",") : value);

    console.log("plane added", value);
    console.log("Approved models list", approvedModels);
  };

  const handleEditUserDialogClose = (confirmed: boolean) => {
    if (confirmed === true) {
      updateUser(doUpdateUserType);
    }
    setOpenEditUserDialog(false);
    setDoUpdateUserType(false);
    setApprovedModels([]);
  };

  const updateUser = (doUpdateUserType: boolean) => {
    if (doUpdateUserType) {
      fetch(
        `http://localhost:5201/api/user/update-account-type?userId=${user.id}`,
        { credentials: "include", method: "PUT" }
      );
    }

    if (
      JSON.stringify(approvedModels) !==
      JSON.stringify(user.proficientPlaneModels)
    ) {
      fetch(
        `http://localhost:5201/api/user/instructor-update-user?userId=${user.id}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userProficientPlanes: approvedModels }),
        }
      );
    }
  };

  return (
    <div className="view-user-dialog">
      <Dialog
        open={openEditUserDialog}
        onClose={handleEditUserDialogClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              maxWidth: "65em",
              height: "30em",
              maxHeight: "90vh",
              padding: "2em",
            },
          },
        }}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          <b>{`${user.firstName || ""} ${user.lastName || ""}`}</b>
        </DialogTitle>

        <DialogContent className="view-user-content">
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
            {user.preferredPlanes ? (
              <p className="p">
                Preferred Plane: <b>{user.preferredPlanes}</b>
              </p>
            ) : null}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEditUserDialogClose(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewUserDialog;
