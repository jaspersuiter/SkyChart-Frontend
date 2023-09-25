import React from 'react';
import './Buttons.css'

function SecondaryButton(props: any) {
  return (
    <div>
        <button className="secondary-button" onClick={props.onClick}>
            {props.text}
        </button>
    </div>
  );
}

export default SecondaryButton;