import React from 'react';
import { Plane } from '../Calendar';
import './Identifier.css';
import AircraftPopup from '../../Aircraft/AircraftPopup';

export interface HourIdentifierProps {
  Name?: String
  Aircraft?: Plane
}

function Identifier(props: HourIdentifierProps) {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (props.Aircraft) {
      setOpen(true);
    } 
  };

  const handleClose = () => {
    setOpen(false);
  };


    return (
      <div className="mainbody" onClick={handleClick}>
        {props.Name && <p className='Text'>{props.Name}</p>}
        {props.Aircraft && <AircraftPopup open={open} onClose={handleClose} plane={props.Aircraft}/>}
      </div>
    );
  }
  
  export default Identifier;