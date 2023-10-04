import './HourHolder.css';
import Hour from './HourIdentifier';
import Identifier from './Identifier';

export interface AircraftSectionProps {
  isDay: Boolean;
  AircraftName: String;
}

function AircraftSection(props: AircraftSectionProps) {
    return (
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
    );
  }
  
  export default AircraftSection;