import React from 'react';
import './Buttons.css'

function PrimaryButton(props: any) {
  return (
    <div>
        <button className="primary-button">
            {props.text}
        </button>
    </div>
  );
}

export default PrimaryButton;