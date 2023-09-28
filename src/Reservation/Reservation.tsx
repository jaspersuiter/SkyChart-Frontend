import './Reservation.css'

function ReservationPopup(props: any) {
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

export default ReservationPopup;