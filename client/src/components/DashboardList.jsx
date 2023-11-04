import { Box, Grid, List, ListItemButton, ListItemText, Stack, Typography, useTheme } from '@mui/material';


// ==============================|| PAGE VIEWS BY PAGE TITLE ||============================== //

const DashboardList = ({data}) => {
  console.log(data)
  const theme = useTheme();
  return (
    <Box sx={{backgroundColor: theme.palette.background.default, padding: "10px", height: "fit-content", borderRadius: "10px"}}>
      <Grid container sx={{ justifyContent: "center", display: "flex", mb: "5px" }} >
        <Grid item >
        <Typography
            variant="h4"
            color={theme.palette.secondary.main}
            fontWeight="bold"
           
          >Work Orders</Typography>
        </Grid>
        <Grid item />
      </Grid>
        <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 0 } }}>
          {data.map((jobType) => (
            <ListItemButton divider key={jobType.name}>
            <ListItemText
            secondary={
              <Typography variant="subtitle1" sx={{ display: 'inline', color: theme.palette.secondary.main}}>
                {jobType.name}
              </Typography>
            }
              primary={<Typography color={theme.palette.secondary.light}>Job Type</Typography>}
              
            />
            <Stack alignItems="flex-end">
            <Typography  color={theme.palette.secondary.light}>
                Total
              </Typography>
              <Typography variant="h5" color="primary">
                {jobType.count}
              </Typography>
              
            </Stack>
          </ListItemButton>
      ))}
      
          
        </List>
    </Box>
  );
}
export default DashboardList;