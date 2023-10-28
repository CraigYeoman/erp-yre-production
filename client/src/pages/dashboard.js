// material-ui
import { Grid, Typography} from '@mui/material';


// project import
import WorkOrderList from 'sections/dashboard/analytics/WorkOrderList'
import DashboardList from 'sections/dashboard/analytics/DashBoardList';
import MainCard from 'components/MainCard';
// project-imports
import axios from 'utils/axios';
import { useCallback, useState, useEffect } from 'react';
import OrdersList from 'sections/dashboard/analytics/OrdersList';

// ==============================|| SAMPLE PAGE ||============================== //

const Dashboard = () => {
  const [workOrders, setWorkOrders] = useState();

  const WorkOrders = useCallback(async () => {
    try {
      const response = await axios.get('/workorders/index');
      setWorkOrders(response.data);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    WorkOrders();
  }, [WorkOrders]);

  console.log(workOrders);

  if (workOrders === undefined) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={5} lg={4}>
          <DashboardList workOrders={workOrders.countArray}/>
      </Grid>
       <Grid item xs={12} md={5} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Past Due</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersList />
          </MainCard>
        </Grid>
      <Grid item xs={12} md={5} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Past Due</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <WorkOrderList data={workOrders.past_due}/>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Due This Week</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <WorkOrderList data={workOrders.due_this_week}/>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Due Next Week</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <WorkOrderList data={workOrders.due_next_week}/>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Due in 30 Days</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <WorkOrderList data={workOrders.due_week_three}/>
          </MainCard>
        </Grid>
      {/* {workOrders.countArray.map((jobType) => (
        <Grid item  lg={3} key={jobType.name}>
          <AnalyticEcommerce title={jobType.name} count={jobType.count} />
        </Grid>
      ))}
      ; */}
    </Grid>
  );
};

export default Dashboard;
