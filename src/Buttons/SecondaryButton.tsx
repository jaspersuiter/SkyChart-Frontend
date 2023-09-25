import React from 'react';
import './Buttons.css'

function SecondaryButton(props: any) {
  return (
    <div>
        <button className="secondary-button" onClick={props.onClick}>
          <div className="text-style">
            {props.text}
          </div>
        </button>
    </div>
  );
}

export default SecondaryButton;