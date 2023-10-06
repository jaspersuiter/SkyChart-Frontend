import { Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeApiCall } from '../APICall';
import TextField from '@mui/material/TextField';
import './AddNewAircraft.css'
import PrimaryButton from '../Buttons/PrimaryButton';
import { useState } from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';

export interface AddNewAircraftProp {
    open: boolean;
    onClose: () => void;
  }
function AddNewAircraft(props: AddNewAircraftProp){
    const {open, onClose } = props;

    const [tailNumber, setTailNumber] = useState('');
    const [model, setModel] = useState('');
    const [aircraftNickname, setAircraftNickname] = useState('');
    const [numEngines, setNumEngines] = useState('');
    const [tachHours, settachHours] = useState('');
    const [hobbsHours, setHobbsHours] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');

    const handleClose = () => {
        onClose();
      };

    const resetAll = () => {
      setTailNumber("")
      setModel("")
      setAircraftNickname("")
      setNumEngines("")
      settachHours("")
      setHobbsHours("")
      setHourlyRate("")

      handleClose()
    }

    const createNewAircraft = async () => {
        const data = {
            tailNumber: tailNumber,
            model: model,
            nickName: aircraftNickname,
            hourlyRate: parseFloat(hourlyRate),
            numEngines: parseInt(numEngines),
            tachHours: parseFloat(tachHours),
            hobbsHours: parseFloat(hobbsHours) 
        }
        try {
            const responseData2 = await makeApiCall("/api/plane/create", data)
            resetAll()
        } catch (error) {
          
          console.error(error);
        }

    }

      return (
            <Dialog onClose={handleClose} open={open} sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "900px",
                    height: "100%",
                    maxHeight: "650px",
                    padding: "30px"
                  },
                },
              }} >
                <div className='maincontent'>
                    <div className='top-title'>
                        <div className='space-filler'></div>
                        <h1>Add New Aircraft</h1>
                        <div className='boxframe'><CloseIcon onClick={handleClose}/></div>
                    </div>
                    
                    <div className='maindropdowncontent'>
                        <div className='threewide'>
                            <TextField id="Tail Number" 
                            label="Tail Number" 
                            value={tailNumber} 
                            onChange={(event) => {setTailNumber(event.target.value)}}/>


                            <TextField id="Model" 
                            label="Model" 
                            value={model} 
                            onChange={(event) => {setModel(event.target.value)}}/>


                            <TextField id="Aircraft Nickname" 
                            label="Aircraft Nickname" 
                            value={aircraftNickname} 
                            onChange={(event) => {setAircraftNickname(event.target.value)}}/>
                        </div>
                        <div className='threewide'>
                            <TextField id="Number of Engines" 
                            label="Number of Engines" 
                            value={numEngines} 
                            onChange={(event) => {setNumEngines(event.target.value)}}/>


                            <TextField id="Tach hours" 
                            label="Tach Hours" 
                            value={tachHours} 
                            onChange={(event) => {settachHours(event.target.value)}}/>


                            <TextField id="Hobbs Hours" 
                            label="Hobbs Hours" 
                            value={hobbsHours} 
                            onChange={(event) => {setHobbsHours(event.target.value)}}/>
                        </div>
                        <div className='twowide'>
                            <TextField id="Hourly Rate" 
                            label="Hourly Rate" 
                            value={hourlyRate} 
                            onChange={(event) => {setHourlyRate(event.target.value)}}/>

                            <SecondaryButton text="Aircraft Image"/>
                        </div>
                    </div>

                    <div className='spacertwo'>

                    </div>

                    <div className='confirmationbottom'>
                        <PrimaryButton text="Create Aircraft" onClick={createNewAircraft}/>
                    </div>
                </div>

                
            </Dialog>
    );

}
export default AddNewAircraft