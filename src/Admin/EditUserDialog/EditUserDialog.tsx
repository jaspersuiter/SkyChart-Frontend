// import { Dialog, DialogTitle } from "@mui/material";

// function EditUserDialog() {
//   useEffect(() => {
//     // Set initial values when the dialog is opened
//     setNewEmail(user.email || "");
//     setNewPhoneNum(user.phoneNum || "");
//   }, [user.email, user.phoneNum]);

//   return (
//     <div className="edit-user-dialog">
//       <Dialog
//         open={openEditUserDialog}
//         onClose={handleEditUserDialogClose}
//         sx={{
//           "& .MuiDialog-container": {
//             "& .MuiPaper-root": {
//               width: "fit-content",
//               maxWidth: "57.5vw",
//               height: "50%",
//               maxHeight: "90vh",
//               padding: "30px",
//             },
//           },
//         }}
//       >
//         <DialogTitle>{`Edit ${user.firstName || ""} ${
//           user.lastName || ""
//         }`}</DialogTitle>

//         <DialogContent className="edit-user-content">
//           <TextField
//             id="email"
//             name="email"
//             label="Email"
//             type="string"
//             value={newEmail}
//             onChange={(e) => setNewEmail(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             id="phoneNum"
//             name="phoneNum"
//             label="Phone Number"
//             type="string"
//             value={newPhoneNum}
//             fullWidth
//             onChange={(e) => setNewPhoneNum(e.target.value)}
//           />
//           <div>
//             <FormControl sx={{ m: 1, width: 300 }}>
//               <InputLabel id="plane-model-label">
//                 Approved Plane Models
//               </InputLabel>
//               <Select
//                 labelId="plane-model-label"
//                 id="plane-model-checkbox"
//                 multiple
//                 fullWidth
//                 value={approvedModel}
//                 onChange={handleChangeSelector}
//                 input={<OutlinedInput label="Approved Plane Models" />}
//                 renderValue={(selected) => selected.join(", ")}
//                 MenuProps={MenuProps}
//               >
//                 {airplaneModels.map((model) => (
//                   <MenuItem key={model} value={model}>
//                     <Checkbox checked={approvedModel.indexOf(model) > -1} />
//                     <ListItemText primary={model} />
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//           {user.accountType === "pilot" ? (
//             doUpdateUserType ? (
//               <SecondaryButton
//                 text="Revert user to a Pilot?"
//                 onClick={() => setDoUpdateUserType(false)}
//               />
//             ) : (
//               <PrimaryButton
//                 text="Make user an Instructor?"
//                 onClick={() => setDoUpdateUserType(true)}
//               />
//             )
//           ) : null}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => handleEditUserDialogClose(true)}>
//             Confirm
//           </Button>
//           <Button onClick={() => handleEditUserDialogClose(false)}>
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default EditUserDialog;
