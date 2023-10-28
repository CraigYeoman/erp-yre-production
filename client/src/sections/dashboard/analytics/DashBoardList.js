// material-ui
import { Grid, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| PAGE VIEWS BY PAGE TITLE ||============================== //

function DashboardList({workOrders}) {
  console.log(workOrders)
  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Work Orders</Typography>
        </Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
          {workOrders.map((jobType) => (
            <ListItemButton divider key={jobType.name}>
            <ListItemText
            secondary={
              <Typography variant="subtitle1" sx={{ display: 'inline' }}>
                {jobType.name}
              </Typography>
            }
              primary={<Typography color="textSecondary">Job Type</Typography>}
              
            />
            <Stack alignItems="flex-end">
            <Typography variant="body2" color="textSecondary">
                Total
              </Typography>
              <Typography variant="h5" color="primary">
                {jobType.count}
              </Typography>
              
            </Stack>
          </ListItemButton>
      ))}
      
          
        </List>
      </MainCard>
    </>
  );
}
export default DashboardList;
