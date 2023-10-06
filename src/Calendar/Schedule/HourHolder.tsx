import './HourHolder.css';
import Hour from './HourIdentifier';
import Identifier from './Identifier';

export interface HourIdentifierProps {
  isDay: Boolean;
}

function HourBar(props: HourIdentifierProps) {
    return (
      <div className="mainBar">
        {!props.isDay && <div className='spacer'></div>}
        <Identifier/>
        <Hour isDay={props.isDay} Time={"6am"}/>
        <Hour isDay={props.isDay} Time={"7am"}/>
        <Hour isDay={props.isDay} Time={"8am"}/>
        <Hour isDay={props.isDay} Time={"9am"}/>
        <Hour isDay={props.isDay} Time={"10am"}/>
        <Hour isDay={props.isDay} Time={"11am"}/>
        <Hour isDay={props.isDay} Time={"12am"}/>
        <Hour isDay={props.isDay} Time={"1pm"}/>
        <Hour isDay={props.isDay} Time={"2pm"}/>
        <Hour isDay={props.isDay} Time={"3pm"}/>
        <Hour isDay={props.isDay} Time={"4pm"}/>
        <Hour isDay={props.isDay} Time={"5pm"}/>
        <Hour isDay={props.isDay} Time={"6pm"}/>
        <Hour isDay={props.isDay} Time={"7pm"}/>
        <Hour isDay={props.isDay} Time={"8pm"}/>
        <Hour isDay={props.isDay} Time={"9pm"}/>
        <Hour isDay={props.isDay} Time={"10pm"}/>
      </div>
    );
  }
  
  export default HourBar;