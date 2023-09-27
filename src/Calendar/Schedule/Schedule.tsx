import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

function Schedule() {
  return (
    <Box sx={{ flexGrow: 1, p: 2}}>
      <Grid
        container
        spacing={2}
        sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'black',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'black',
          },
        }}
      >
        {[...Array(160)].map((_, index) => (
          <Grid key={index} {...{ sm: 0.75}} minHeight={35} />
        ))}
      </Grid>
    </Box>
  );
}

export default Schedule;