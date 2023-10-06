import './Settings.css'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PrimaryButton from '../Buttons/PrimaryButton';
import CancelButton from '../Buttons/CancelButton';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import StaticSidebar from '../Sidebar/Sidebar';
import SecondaryButton from '../Buttons/SecondaryButton';
import InstructorAvailibility from './InstructorAvailability/InstructorAvailability';
import { useEffect, useState } from 'react';

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
    UserNameOrEmail: string, 
    password: string 
};

function Settings() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [selectedInstructor, setSelectedInstructor] = useState('');
    const [selectedAircraft, setSelectedAircraft] = useState('');
    const [planes, setPlanes] = useState<Plane[]>([]);
    const [instructors, setInstructors] = useState<Instructor[]>([]); // Declare rows as a state variable
  
    const fetchPlanes = async () => {
        try {
            const planes = await fetch('http://localhost:5201/api/plane/get-all',
            {credentials: 'include'})
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
    }

    useEffect(() => {
        fetchPlanes();
    }, []); 

    const fetchInstructors = async () => {
        try {
            const instructors = await fetch('http://localhost:5201/api/instructor/get-all',
            {credentials: 'include'})
                .then((response) => response.json())
                .then((data) => data);

            // Create a new array of rows based on the instructors data
            const mappedRows = instructors.map((instructor: any, index: number) => {
                const nameParts = instructor.name.split(','); // Split by comma
                return {
                id: instructor.userId,
                lastName: nameParts[0].trim(),
                firstName: nameParts[1].trim(),
                phoneNum: instructor.phone,
                rating: instructor.instructorRatings?.join(', '),
                }
            });

            setInstructors(mappedRows); // Update the state variable with the mapped rows
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchInstructors(); // Call fetchInstructors when the component mounts
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const handleConfirmChanges = () => {
        const changes: Changes = { preferredInstructorId: selectedInstructor, preferredPlanes: [selectedAircraft] }
        
        console.log(changes)
        const makeChanges = async () => {
            await fetch('http://localhost:5201/api/user/update', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changes), 
            })
                .then(response => response.json())
                .then(data => {
                    
                    if (data.verified === true) { 
                        console.log('Success:', data);
                    }
                    
                })
                .catch(error => {
                    console.error(error);
                });
        }

        makeChanges();
    }

    return (
        <div className="settings-page">
            <StaticSidebar />
            <div className="settings-content">
                <div className="settings-top-content">
                    <FormControl sx={{ minWidth: 240 }} size="small">
                        <InputLabel id="preferred-instructor-label">Preferred Instructor</InputLabel>
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
                  <FormControl sx={{ minWidth: 240 }} size="small">
                    <InputLabel id="preferred-aircraft-label">Preferred Aircraft</InputLabel>
                    <Select
                        labelId="aircraft-label"
                        id="aircraft-select"
                        label="aircraft"
                        value={selectedAircraft}
                        onChange={(e) => setSelectedAircraft(e.target.value)}
                    >
                        {planes.map((plane) => (
                            <MenuItem key={plane.id} value={plane.id}>
                                {`${plane.model} (${plane.nickname})`}
                            </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                    <InstructorAvailibility />
                    
                    <div className="confirm-button">
                        <PrimaryButton text="Confirm Changes" onClick={handleConfirmChanges}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;