import React from 'react';
import { Plane } from '../Calendar';
import './Identifier.css';
import AircraftPopup from '../../Aircraft/AircraftPopup/AircraftPopup';

export interface HourIdentifierProps {
  Name?: String
  Aircraft?: Plane
  isHighlighted: Boolean
  openAirplane?: (plane: Plane) => void;
}

function Identifier(props: HourIdentifierProps) {

  const handleClick = () => {
    if (props.openAirplane && props.Aircraft) {
      props.openAirplane(props.Aircraft);
    } 
  };


    return (
      <div className={props.isHighlighted? "mainbodyHighlight" : "mainbody"} onClick={handleClick} >
        {props.Name && <p className='Text'>{props.Name}</p>}
      </div>
    );
  }
  
  export default Identifier;