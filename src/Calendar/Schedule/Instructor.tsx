import './HourHolder.css';
import Hour from './HourIdentifier';
import Identifier from './Identifier';

export interface InstructorSelectionProps {
  isDay: Boolean;
  InstructorName: String;
}

function InstructorSelection(props: InstructorSelectionProps) {
    return (
      <div className="mainBar">
        <Identifier Name={props.InstructorName}/>
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
  
  export default InstructorSelection;