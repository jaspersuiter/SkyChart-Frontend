import './Identifier.css';

export interface HourIdentifierProps {
  Name?: String
}

function Identifier(props: HourIdentifierProps) {
    return (
      <div className="mainbody">
        {props.Name && <p className='Text'>{props.Name}</p>}
      </div>
    );
  }
  
  export default Identifier;