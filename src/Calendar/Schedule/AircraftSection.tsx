import './HourHolder.css';
import Hour from './HourIdentifier';
import Identifier from './Identifier';
import Reservation from './Reservation';
import Unavailable from './Unavailable';

export interface AircraftSectionProps {
  isDay: Boolean;
  AircraftName: String;
}

function AircraftSection(props: AircraftSectionProps) {
    return (
      <div className='container'>
        <Reservation Title='7:00AM Tommy Martin' duration={60} startTime='13:00' isDay={props.isDay}/>
        <Unavailable duration={60} startTime='14:00' isDay={props.isDay}/>
        <div className="mainBar">
          <Identifier Name={props.AircraftName}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
          <Hour isDay={props.isDay}/>
      </div>
      </div>
    );
  }
  
  export default AircraftSection;