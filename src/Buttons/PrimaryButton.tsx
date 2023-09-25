import React from 'react';
import './Buttons.css'

function PrimaryButton(props: any) {
  return (
    <div>
        <button className="primary-button" onClick={props.onClick}>
            <div className="text-style">
              {props.text}
            </div>
        </button>
    </div>
  );
}

export default PrimaryButton;