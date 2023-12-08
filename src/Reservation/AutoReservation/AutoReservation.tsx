import {
  Checkbox,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./AutoReservation.css";
import { Instructor, Plane } from "../../Calendar/Calendar";
import InstructorDropDown from "../../Utils/DropDowns/InstructorDropDown";
import ReservationTypeDropDown, {
  ReservationType,
} from "../../Utils/DropDowns/ReservationTypeDropDown";
import React from "react";
import PrimaryButton from "../../Utils/Buttons/PrimaryButton";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { makeApiCall } from "../../APICall";
import dayjs, { Dayjs } from "dayjs";

export interface AutoReservationProp {
  open: boolean;
  onClose: () => void;
  Instructors: Array<Instructor>;
  Planes: Array<Plane>;
  updateScreen: () => void;
}

interface User {
  id: number;
  student: boolean;
  proficientPlaneModels: string[] | null;
}

function AutoReservation(props: AutoReservationProp) {
  const { open, onClose, Planes } = props;
  const [instructorId, setInstructorId] = React.useState<string>("");
  const [preferredPlanes, setPreferredPlanes] = React.useState<Array<string>>(
    []
  );
  const [reservationType, setReservationType] = React.useState<ReservationType>(
    ReservationType.DualLesson
  );
  const [preferredDays, setPreferredDays] = React.useState<Array<string>>([]);
  const [earliestTime, setEarliestTime] = React.useState<Dayjs | null>(null);
  const [latestTime, setLatestTime] = React.useState<Dayjs | null>(null);
  const [reservationLength, setReservationLength] = React.useState<number>(0);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [reservation, setReservation] = React.useState<string>("");
  const [user, setUser] = React.useState<User>();

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

  React.useEffect(() => {
    getUser();
  }, []);

  const days = "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(
    ","
  );

  const handleClose = () => {
    onClose();
  };

  const handlePlaneChange = (
    event: SelectChangeEvent<typeof preferredPlanes>
  ) => {
    const {
      target: { value },
    } = event;
    setPreferredPlanes(typeof value === "string" ? value.split(",") : value);
  };

  const handleDayChange = (event: SelectChangeEvent<typeof preferredDays>) => {
    const {
      target: { value },
    } = event;
    setPreferredDays(typeof value === "string" ? value.split(",") : value);
  };

  const createReservation = async () => {
    const data = {
      instructor: instructorId,
      aircraft: preferredPlanes,
      reservationType: reservationType,
      earliestTime: earliestTime?.format("HH:mm"),
      latestTime: latestTime?.format("HH:mm"),
      reservationLength: reservationLength,
      preferredDays: preferredDays,
    };

    try {
      const responseData = await makeApiCall(
        "/api/reservation/automatic",
        data,
        "post"
      );
      console.log(responseData);
      if (
        responseData ===
          "No timeslot satisfying instructor, plane, and pilot conflicts within the next 4 weeks of the current date" ||
        responseData === "Couldn't Parse EarliestTime" ||
        responseData === "Couldn't Parse LatestTime"
      ) {
        setErrorMessage(responseData + ". Please try again.");
        return;
      }
      const planeTail = Planes.find((p) => p.planeId === responseData.planeId)
        ?.tailNumber;
      const instructorName = props.Instructors.find(
        (i) => i.userId === responseData.instructorId
      )?.name;
      const reservation = `Reservation created from ${responseData.startTime} to ${responseData.endTime} in ${planeTail} with ${instructorName}`;
      setReservation(reservation);
      return;
    } catch (err) {
      console.error(err);
      handleClose();
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "900px",
            height: "100%",
            maxHeight: "650px",
            padding: "30px",
          },
        },
      }}
    >
      <div className="maincontent">
        <div className="top-title">
          <div className="space-filler"></div>
          <h1>Find the Next Available Reservation</h1>
          <div className="boxframe">
            <CloseIcon onClick={handleClose} />
          </div>
        </div>

        <div className="maindropdowncontent">
          <div className="threewide">
            <InstructorDropDown
              Instructors={props.Instructors}
              InstructorId={instructorId}
              setInstructorIdParent={setInstructorId}
            />

            <FormControl
              sx={{ m: 2, minWidth: 240, maxWidth: 240 }}
              size="small"
            >
              <InputLabel id="preferred-aircraft-label">
                Preferred Aircraft
              </InputLabel>
              <Select
                multiple
                labelId="aircraft-label"
                id="aircraft-select"
                label="aircraft"
                value={preferredPlanes}
                onChange={handlePlaneChange}
                renderValue={(selected) => {
                  if (Array.isArray(selected)) {
                    return selected
                      .map((planeId) => {
                        const plane = Planes.find(
                          (p) => `${p.planeId}` === `${planeId}`
                        );
                        return plane
                          ? `${plane.model} (${plane.nickName})`
                          : "";
                      })
                      .join(", ");
                  }
                  return "";
                }}
              >
                {Planes.map((plane) =>
                  user?.proficientPlaneModels?.includes(plane.model) ? (
                    <MenuItem
                      key={plane.planeId}
                      value={plane.planeId}
                      sx={{ justifyContent: "space-between" }}
                    >
                      {`${plane.model} (${plane.nickName})`}
                      <Checkbox
                        checked={
                          preferredPlanes.indexOf(`${plane.planeId}`) > -1
                        }
                      />
                    </MenuItem>
                  ) : null
                )}
              </Select>
            </FormControl>

            <ReservationTypeDropDown
              ReservationType={reservationType}
              setReservationTypeParent={setReservationType}
            />
          </div>

          <div className="threewide">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Earliest Time"
                value={earliestTime}
                onChange={setEarliestTime}
                minTime={dayjs().set("hour", 5).set("minute", 59)}
                maxTime={dayjs().set("hour", 22).set("minute", 59)}
                sx={{
                  svg: { color: "#4DE8B4" },
                }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Latest Time"
                value={latestTime}
                onChange={setLatestTime}
                minTime={dayjs().set("hour", 5).set("minute", 59)}
                maxTime={dayjs().set("hour", 22).set("minute", 59)}
                sx={{
                  svg: { color: "#4DE8B4" },
                }}
              />
            </LocalizationProvider>

            <TextField
              id="reservation-length"
              label="Reservation Length"
              type="number"
              value={reservationLength}
              onChange={(e) => setReservationLength(Number(e.target.value))}
            />
          </div>

          <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
            <InputLabel id="preferred-days-label">Preferred Days</InputLabel>
            <Select
              multiple
              labelId="days-label"
              id="preferred-days-select"
              label="Preferred Days"
              value={preferredDays}
              onChange={handleDayChange}
              renderValue={(selected) => {
                if (Array.isArray(selected)) {
                  return selected
                    .map((d) => {
                      return d ? d : "";
                    })
                    .join(", ");
                }
                return "";
              }}
            >
              {days.map((day) => (
                <MenuItem
                  key={day}
                  value={day}
                  sx={{ justifyContent: "space-between" }}
                >
                  {day}
                  <Checkbox checked={preferredDays.indexOf(day) > -1} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="reservation">{reservation}</div>

          <div className="bottom-bar error-message">{errorMessage}</div>

          <div className="bottom-bar">
            <PrimaryButton
              text="Create Reservation"
              onClick={createReservation}
              disabled={
                instructorId === "" ||
                preferredPlanes.length === 0 ||
                preferredDays.length === 0 ||
                earliestTime === null ||
                latestTime === null ||
                reservationLength === 0
              }
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
export default AutoReservation;
