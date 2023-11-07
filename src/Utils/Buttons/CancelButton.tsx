import React from 'react';
import './Buttons.css'

function CancelButton(props: any) {
  return (
    <div>
        <button className="cancel-button" onClick={props.onClick}>
          <div className="text-style">
            {props.text}
          </div>
        </button>
    </div>
  );
}

export default CancelButton;