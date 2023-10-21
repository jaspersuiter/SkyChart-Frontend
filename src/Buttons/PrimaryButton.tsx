import React from 'react';
import './Buttons.css'

function PrimaryButton(props: any) {
  return (
    <div>
        <button className={(props.disabled ? 'primary-button-disabled' : 'primary-button')} onClick={props.onClick} disabled={props.disabled}>
            <div className="text-style">
              {props.text}
            </div>
        </button>
    </div>
  );
}

export default PrimaryButton;