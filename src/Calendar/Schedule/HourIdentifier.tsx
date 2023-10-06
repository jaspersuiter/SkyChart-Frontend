import './HourIdentifier.css';

export interface HourIdentifierProps {
  isDay: Boolean;
  Time?: String;
}

function Hour(props: HourIdentifierProps) {
    return (
      <div className={props.isDay ? 'DaySelection' : 'WeekSelection'}>
        {props.Time && <p className={props.isDay ? "DayText" : "WeekText"}>{props.Time}</p>}
      </div>
    );
  }
  
  export default Hour;