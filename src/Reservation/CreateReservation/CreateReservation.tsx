import "./CreateReservation.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import PrimaryButton from "../../Utils/Buttons/PrimaryButton";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { makeApiCall } from "../../APICall";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Instructor, Plane } from "../../Calendar/Calendar";
import InstructorDropDown from "../../Utils/DropDowns/InstructorDropDown";
import PlaneDropDown from "../../Utils/DropDowns/PlaneDropDown";
import ReservationTypeDropDown, {
  ReservationType,
} from "../../Utils/DropDowns/ReservationTypeDropDown";
import React from "react";
import UpcomingMaintenance from "../UpcomingMaintenance/UpcomingMaintenance";
import ProjectedWeather from "../../Weather/ProjectedWeather";

export interface NewReservationProps {
  open: boolean;
  Instructors: Array<Instructor>;
  Planes: Array<Plane>;
  onClose: () => void;
  SelectedPlane?: Plane;
}

interface User {
  id: number;
  student: boolean;
  proficientPlaneModels: string[] | null;
}

function NewReservation(props: NewReservationProps) {
  const { open, onClose } = props;
  const [maintenanceOpen, setMaintenanceOpen] = React.useState(false);
  const [weatherOpen, setWeatherOpen] = React.useState(false);

  const handleClickOpenMaintenance = () => {
    setMaintenanceOpen(true);
  };

  const handleCloseMaintenance = () => {
    setMaintenanceOpen(false);
  };

  const openWeather = () => {
    setWeatherOpen(true);
  };

  const closeWeather = () => {
    setWeatherOpen(false);
  };

  const handleClose = (event?: any, reason?: any) => {
    if (reason !== "backdropClick") {
      setSelectedValue("");
      onClose();
    }
  };

  const showUpcomingMaintenanceLink = () => {
    if (planeId != "") {
      return (
        <p className="link-text" onClick={handleClickOpenMaintenance}>
          <u>See plane information</u>
        </p>
      );
    } else {
      return (
        <p>
          <br></br>
        </p>
      );
    }
  };

  const showWeatherOutlook = () => {
    const withinPredictionWindow = (day: Dayjs | null) => {
      if (day) {
        const now = dayjs().startOf("day");
        const dayToCheck = day.startOf("day");

        const dayDifference = dayToCheck.diff(now, "day");
        return dayDifference >= 1 && dayDifference <= 6;
      }
      return false;
    };
    if (withinPredictionWindow(day)) {
      return (
        <p className="link-text" onClick={openWeather}>
          <u>See weather outlook</u>
        </p>
      );
    }
  };

  const resetAll = () => {
    setPlaneId("");
    setInstructorId("");
    setStartTime(null);
    setEndTime(null);
    setDay(null);
    setReservationType(ReservationType.DualLesson);
    setErrormessage("");
    handleClose();
  };

  const [planeId, setPlaneId] = useState(
    props.SelectedPlane ? props.SelectedPlane.planeId : ""
  );
  const [instructorId, setInstructorId] = useState("");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [reservationType, setReservationType] = useState<ReservationType>(
    ReservationType.DualLesson
  );
  const [day, setDay] = useState<Dayjs | null>(null);
  const [errormessage, setErrormessage] = useState("");
  const [recurrances, setRecurrances] = useState(0);

  const createReservation = async () => {
    const data = {
      PlaneId: planeId,
      InstructorId: instructorId,
      StartTime: startTime,
      EndTime: endTime,
      FlightType: reservationType,
      Repeat: recurrances,
    };

    let responseData2 = null;
    try {
      responseData2 = await makeApiCall(
        "/api/reservation/create",
        data,
        "post"
      );

      console.log(responseData2);

      if (
        responseData2 ===
        "Reservation cannot be created due to conflicts with other reservations."
      ) {
        setErrormessage(responseData2);
        return;
      } else if (responseData2 === "Start time must be before end time.") {
        setErrormessage(responseData2);
        return;
      } else if (responseData2 === "User doesn't have model certificate") {
        setErrormessage(responseData2);
        return;
      } else if (responseData2 === "User doesn't have a night rating") {
        setErrormessage(responseData2);
        return;
      }
      resetAll();
    } catch (error) {
      console.error(error);
    }

    handleClose();
  };
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
    setReservationType(event.target.value);
  };

  function addDatetoTime(time: Dayjs | null) {
    let newTime = time
      ? time.set("date", day ? day?.date() : dayjs().date())
      : null;
    newTime = newTime
      ? newTime.set("month", day ? day?.month() : dayjs().month())
      : null;
    newTime = newTime
      ? newTime.set("year", day ? day?.year() : dayjs().year())
      : null;
    return newTime;
  }

  const handleStartTime = (newTime: Dayjs | null) => {
    setStartTime(addDatetoTime(newTime));
  };

  const handleEndTime = (newTime: Dayjs | null) => {
    setEndTime(addDatetoTime(newTime));
  };

  const handleDay = (day: Dayjs | null) => {
    setStartTime(addDatetoTime(startTime));

    setEndTime(addDatetoTime(endTime));

    setDay(day);
  };

  // We need to get the user object to see if its a student
  const [user, setUser] = useState<User>();

  const getUser = async () => {
    try {
      const user = (await fetch(`http://localhost:5201/api/user/get-current`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => data)) as User;
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const [student, setStudent] = useState(false);

  useEffect(() => {
    getUser();
    if (user != null) {
      setStudent(user.student);
    }
  }, [startTime]);

  return (
    <div className="reservation-popup">
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "57.5vw",
              height: "100%",
              maxHeight: "90vh",
              padding: "30px",
            },
          },
        }}
      >
        <div className="create-reservation-title-bar">
          <div className="spaceFiller" />
          <h1 className="h1">Create Reservation</h1>
          <div className="spaceFiller">
            <CloseIcon onClick={resetAll} />
          </div>
        </div>

        <div className="dialogBox">
          {/* Dropdown Menus for Selecting Aircraft & Instructor */}
          <div className="create-reservation-flexrow">
            <InstructorDropDown
              Instructors={props.Instructors}
              InstructorId={instructorId}
              setInstructorIdParent={setInstructorId}
            />
            <PlaneDropDown
              Planes={props.Planes.filter(
                (plane) => user?.proficientPlaneModels?.includes(plane.model)
              )}
              PlaneID={planeId}
              SetPlaneIdParent={setPlaneId}
            />
            <ReservationTypeDropDown
              ReservationType={reservationType}
              setReservationTypeParent={setReservationType}
            />
          </div>

          <div className="toggleableText">{showUpcomingMaintenanceLink()}</div>

          {/* Date and Time Pickers to Select Reservation Time */}
          <div className="create-reservation-flexrow">
            <div className="create-reservation-flexcol">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Day"
                  value={day}
                  onChange={handleDay}
                  sx={{
                    svg: { color: "#4DE8B4" },
                  }}
                />
              </LocalizationProvider>
              <div className="toggleableText">{showWeatherOutlook()}</div>
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={handleStartTime}
                minTime={dayjs().set("hour", 5).set("minute", 59)}
                maxTime={dayjs().set("hour", 22).set("minute", 59)}
                sx={{
                  svg: { color: "#4DE8B4" },
                }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="End Time"
                value={endTime}
                onChange={handleEndTime}
                minTime={dayjs().set("hour", 5).set("minute", 59)}
                maxTime={dayjs().set("hour", 22).set("minute", 59)}
                sx={{
                  svg: { color: "#4DE8B4" },
                }}
              />
            </LocalizationProvider>
          </div>

          <div className="horizontal">
            <TextField
              id="recur"
              label="Weeks to repeat"
              type="number"
              value={recurrances}
              onChange={(e) => setRecurrances(parseInt(e.target.value))}
            />
            <p>
              Number of weeks to repeat reservation (leave as default 0 to not
              repeat)
            </p>
          </div>

          <div className="error-message">{errormessage}</div>
        </div>
        {/* Confirm and Cancel Buttons */}
        <div className="create-reservation-bottom-bar">
          <PrimaryButton
            text="Create Reservation"
            onClick={createReservation}
            disabled={
              startTime === null ||
              endTime === null ||
              day === null ||
              (instructorId === "" && student)
            }
          />
        </div>
        <UpcomingMaintenance
          open={maintenanceOpen}
          onClose={handleCloseMaintenance}
          planeId={planeId}
        />
        <ProjectedWeather
          open={weatherOpen}
          onClose={closeWeather}
          day={day ? day.format("MM/DD/YYYY") : ""}
        />
      </Dialog>
    </div>
  );
}

export default NewReservation;
