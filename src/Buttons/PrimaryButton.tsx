import React from 'react';
import './Buttons.css'

function PrimaryButton(props: any) {
  return (
    <div>
        <button className="primary-button" onClick={props.onClick}>
            {props.text}
        </button>
    </div>
  );
}

export default PrimaryButton;