import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import PrimaryButton from '../../Utils/Buttons/PrimaryButton';
import './verification.css';

function VerificationPage() {
  return (
    <div className='VerificationPage'>
        <Grid container spacing={2} justifyContent={'center'} direction={'column'} alignItems={'center'}>
            <Grid item alignItems={'center'}>
                <div className='label'>
                    <p className='text-wrapper'>Enter the verification code sent to someone@email.com</p>
                </div>
            </Grid>
            <Grid item>
                <TextField
                    id="filled-search"
                    label="Enter Code"
                    variant="filled"
                    inputProps={{maxLength: 5}}
                />
            </Grid>
            <Grid item>
                <PrimaryButton text="Verify Account" />
            </Grid>
        </Grid>
    </div>
  )
}

export default VerificationPage;
