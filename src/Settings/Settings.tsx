import "./Settings.css";
import {
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import PrimaryButton from "../Utils/Buttons/PrimaryButton";
import CancelButton from "../Utils/Buttons/CancelButton";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import StaticSidebar from "../Utils/Sidebar/Sidebar";
import SecondaryButton from "../Utils/Buttons/SecondaryButton";
import InstructorAvailibility from "./InstructorAvailability/InstructorAvailability";
import { useEffect, useState } from "react";
import { makeApiCall } from "../APICall";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmPopup from "../Utils/ConfirmPopup/Confirm";

interface Plane {
  id: number;
  model: string;
  grounded: boolean;
  nickname: string;
}

interface Instructor {
  id: number;
  lastName: string;
  firstName: string;
  phoneNum: string;
  rating: string;
}

interface Changes {
  preferredInstructorId: string;
  preferredPlanes: string[];
}

interface UserCredentials {
  UserNameOrEmail: string;
  password: string;
}

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
  emergencyContactPhoneNumber: string;
  preferredInstructorId: string;
  preferredInstructor: string;
  preferredPlanes: string[];
  proficientPlaneModels: string[];
}

function Settings() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [mailingAddress, setMailingAddress] = useState("");
  const [emergencyContactPhoneNumber, setEmergencyContactPhoneNumber] = useState("");
  const [user, setUser] = useState<User>();
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedAircraft, setSelectedAircraft] = useState<Array<string>>([]);
  const [planes, setPlanes] = useState<Plane[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]); // Declare rows as a state variable
  const [openPreferenceConfirm, setOpenPreferenceConfirm] = useState(false);
  const [openUpdateUserConfirm, setOpenUpdateUserConfirm] = useState(false);
  const [errormessage, setErrormessage] = useState("");


  const resetAll = () => {
    //setSelectedInstructor("");
    //setSelectedAircraft([]);
  };

  const closePreferenceConfirmDialog = () => {
    resetAll();
    setOpenPreferenceConfirm(false);
  };
  const openPreferenceConfirmDialog = () => {
    setOpenPreferenceConfirm(true);
  };

  const closeUpdateUserConfirmDialog = () => {
    resetAll();
    setOpenUpdateUserConfirm(false);
  };
  const openUpdateUserConfirmDialog = () => {
    setOpenUpdateUserConfirm(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmergencyContactNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmergencyContactName(e.target.value);
  }

  const handleMailingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMailingAddress(e.target.value);
  }

  const handleEmergencyContactPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmergencyContactPhoneNumber(e.target.value);
  }

  const handleChange = (event: SelectChangeEvent<typeof selectedAircraft>) => {
    const {
      target: { value },
    } = event;

    const newSelection = typeof value === "string" ? value.split(",") : value;

    if (newSelection.length <= 3) {
      setSelectedAircraft(newSelection);
    } else {
      console.log("Max number of preferred planes is 3");
    }
  };

  const updatePreferredItems = async () => {
    const data = {
      PreferredInstructorId: selectedInstructor,
      PreferredPlanes: selectedAircraft,
    };

    let responseData2 = null;
    try {
      responseData2 = await makeApiCall("/api/user/update", data, "put");

      console.log(responseData2);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const user = await fetch(`http://localhost:5201/api/user/get-current`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => data);
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlanes = async () => {
    try {
      const planes = await fetch("http://localhost:5201/api/plane/get-all", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => data);

      const mappedPlanes = planes.map((plane: any) => ({
        id: plane.planeId,
        model: plane.model,
        grounded: plane.grounded,
        nickname: plane.nickName,
      }));

      setPlanes(mappedPlanes);
    } catch (error) {
      console.log(error);
    }
  };

  const populatePreferredInstructor = () => {
    const foundInstructor = instructors.find(
      (instructor) => instructor.id.toString() === user?.preferredInstructorId
    );
  
    if (foundInstructor) {
      setSelectedInstructor(user?.preferredInstructorId.toString() ?? "");
    }
  };

  const populatePreferredAircrafts = () => {
    setSelectedAircraft(user?.preferredPlanes ?? []);
  };

  const populateUserFields = () => {
    setEmail(user?.email ?? "");
    setEmergencyContactName(user?.emergencyContactName ?? "");
    setEmergencyContactPhoneNumber(user?.emergencyContactPhoneNumber ?? "");
    setFirstName(user?.firstName ?? "");
    setLastName(user?.lastName ?? "");
    setMailingAddress(user?.address ?? "");
  }

  useEffect(() => {
    fetchInstructors();
    fetchPlanes();
    getUser();
  }, []);

  useEffect(() => {
    populatePreferredInstructor();
    populatePreferredAircrafts();
    populateUserFields();
  }, [instructors, 
    user?.preferredInstructorId, 
    user?.preferredPlanes, 
    user?.email, 
    user?.emergencyContactName, 
    user?.emergencyContactPhoneNumber, 
    user?.firstName, 
    user?.lastName, 
    user?.address
  ]);

  const fetchInstructors = async () => {
    try {
      const instructors = await fetch(
        "http://localhost:5201/api/instructor/get-all",
        { credentials: "include" }
      )
        .then((response) => response.json())
        .then((data) => data);

      // Create a new array of rows based on the instructors data
      const mappedRows = instructors.map((instructor: any, index: number) => {
        const nameParts = instructor.name.split(","); // Split by comma
        return {
          id: instructor.userId,
          lastName: nameParts[0].trim(),
          firstName: nameParts[1].trim(),
          phoneNum: instructor.phone,
          rating: instructor.instructorRatings?.join(", "),
        };
      });

      setInstructors(mappedRows); // Update the state variable with the mapped rows
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    const data = {
      Email: email,
      FirstName: firstName,
      LastName: lastName,
      EmergencyContactName: emergencyContactName,
      EmergencyContactPhoneNumber: emergencyContactPhoneNumber,
      Address: mailingAddress,
    };

    let responseData2 = null;
    try {
      responseData2 = await makeApiCall(
        "/api/user/update",
        data,
        "put"
      );

      console.log(responseData2);

      if (
        responseData2 ===
        "Couldn't find UserId"
      ) {
        setErrormessage(responseData2);
        return;
      } else if (responseData2 === "Cannot have more than 3 preferred planes") {
        setErrormessage(responseData2);
        return;
      } else if (responseData2 === "Cannot have duplicate planes") {
        setErrormessage(responseData2);
        return;
      } else if (responseData2 === "At least one of the preferred planes don't exist in the database") {
        setErrormessage(responseData2);
        return;
      }
      resetAll();
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="settings-content">
      <StaticSidebar />
        <div className="settings-title">
          <h1 className="h3">Settings</h1>
          <div className="row-items">
            <div className="column-items">
              <div className="preferences-box">
                <div className="column-flex-item">
                  <h1 className="h1">Set Preferences</h1>
                  {/*<p>
                    Proficient Plane Models:{" "}
                    <b>{user?.proficientPlaneModels.join(", ")}</b>
                  </p>*/}
                  <div className="row-flex-item">
                    <FormControl sx={{ minWidth: 300 }} size="small">
                      <InputLabel id="preferred-instructor-label">
                        Preferred Instructor
                      </InputLabel>
                      <Select
                        labelId="instructor-label"
                        id="instructor-select"
                        label="instructor"
                        value={selectedInstructor} // Controlled value
                        onChange={(e) => setSelectedInstructor(e.target.value)}
                      >
                        {instructors.map((instructor) => (
                          <MenuItem key={instructor.id} value={instructor.id}>
                            {instructor.firstName} {instructor.lastName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 300, maxWidth: 300 }} size="small">
                      <InputLabel id="preferred-aircraft-label">
                        Preferred Aircraft
                      </InputLabel>
                      <Select
                        multiple
                        labelId="aircraft-label"
                        id="aircraft-select"
                        label="aircraft"
                        value={selectedAircraft}
                        onChange={handleChange}
                        renderValue={(selected) => {
                          if (Array.isArray(selected)) {
                            return selected
                              .map((planeId) => {
                                const plane = planes.find(
                                  (p) => `${p.id}` === `${planeId}`
                                );
                                return plane
                                  ? `${plane.model} (${plane.nickname})`
                                  : "";
                              })
                              .join(", ");
                          }
                          return "";
                        }}
                      >
                        {planes.map((plane) => (
                          <MenuItem
                            key={plane.id}
                            value={plane.id}
                            sx={{ justifyContent: "space-between" }}
                          >
                            {`${plane.model} (${plane.nickname})`}
                            <Checkbox
                              checked={selectedAircraft.indexOf(`${plane.id}`) > -1}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <PrimaryButton
                    text="Confirm Changes"
                    onClick={openPreferenceConfirmDialog}
                  />
                  <ConfirmPopup
                    open={openPreferenceConfirm}
                    onClose={closePreferenceConfirmDialog}
                    func={updatePreferredItems}
                    text="Are you sure you want add these preferences?"
                  />
                </div>
              </div>
              <div className="availability-box">
                <div className="column-flex-item">
                  <h1 className="h1">Set Availability</h1>
                  <InstructorAvailibility />
                </div>
              </div>
            </div>
            <div className="profile-box">
              <div className="column-flex-item">
                <h1 className="h1">Edit Profile</h1>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  fullWidth
                />
                <TextField
                  id="firstName"
                  label="First Name"
                  type="firstName"
                  required
                  value={firstName}
                  onChange={handleFirstNameChange}
                  fullWidth
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  type="lastName"
                  required
                  value={lastName}
                  onChange={handleLastNameChange}
                  fullWidth
                />
                <TextField
                  id="emergencyContactName"
                  label="Emergency Contact Name"
                  type="emergencyContactName"
                  required
                  value={emergencyContactName}
                  onChange={handleEmergencyContactNameChange}
                  fullWidth
                />
                <TextField
                  id="mailingAddress"
                  label="Mailing Address"
                  type="email"
                  required
                  value={mailingAddress}
                  onChange={handleMailingAddressChange}
                  fullWidth
                />
                <TextField
                  id="emergencyContactPhoneNumber"
                  label="Emergency Contact Phone Number"
                  type="emergencyContactPhoneNumber"
                  required
                  value={emergencyContactPhoneNumber}
                  onChange={handleEmergencyContactPhoneNumberChange}
                  fullWidth
                />
                <PrimaryButton
                    text="Confirm Changes"
                    onClick={openUpdateUserConfirmDialog}
                />
                <ConfirmPopup
                    open={openUpdateUserConfirm}
                    onClose={closeUpdateUserConfirmDialog}
                    func={updateUser}
                    text="Are you sure you want apply these updates?"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Settings;
