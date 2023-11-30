import { Ref, forwardRef } from 'react';
import './HourIdentifier.css';

export interface HourIdentifierProps {
  isDay: Boolean;
  isHighlighted?: Boolean;
  Time?: String;
}

const Hour = forwardRef(function(props: HourIdentifierProps, ref: Ref<HTMLDivElement>) {
    return (
      <div ref={ref} className={props.isDay ? (props.isHighlighted ? 'DaySelectionHighlited' : 'DaySelection') : (props.isHighlighted ? 'WeekSelectionHighlited':'WeekSelection')}>
        {props.Time && <p className={props.isDay ? "DayText" : "WeekText"}>{props.Time}</p>}
      </div>
    );
  })
  
  export default Hour;