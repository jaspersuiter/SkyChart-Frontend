import "./Confirm.css";
import Dialog from '@mui/material/Dialog';
import PrimaryButton from '../Buttons/PrimaryButton';
import SecondaryButton from "../Buttons/SecondaryButton";

export interface ConfirmProps {
  open: boolean;
  onClose: () => void;
  func: () => void;
  text: string;
}


function ConfirmPopup(props: ConfirmProps) {

  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const confirm = () => {
    props.func();
    handleClose();
  }

  return (
    <Dialog onClose={handleClose} open={open}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "30%",
            maxWidth: "57.5vw",
            height: "25%",
            maxHeight: "95vh",
            paddingBottom: "30px",
            paddingLeft: "30px",
            paddingRight: "30px"
          },
        },
      }}>
      <div className="confirmText">
        <h2>{props.text}</h2>
      </div>
      <div className='FlexRowItem'>
        <PrimaryButton text="Yes" onClick={confirm} />
        <SecondaryButton text="No" onClick={handleClose} />
      </div>
    </Dialog>
  );
}

export default ConfirmPopup;