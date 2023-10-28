// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import WorkOrderList from 'sections/dashboard/analytics/WorkOrderList'
// project-imports
import axios from 'utils/axios';
import { useCallback, useState, useEffect } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
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
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
          <WorkOrderList workOrders={workOrders.countArray}/>
        </Grid>
      {workOrders.countArray.map((jobType) => (
        <Grid item  lg={3} key={jobType.name}>
          <AnalyticEcommerce title={jobType.name} count={jobType.count} />
        </Grid>
      ))}
      ;
      {/* {workOrders.countArray.map((jobType) => (
        <Grid item  lg={3} key={jobType.name}>
          <AnalyticEcommerce title={jobType.name} count={jobType.count} />
        </Grid>
      ))}
      ; */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid>
    </Grid>
  );
};

export default SamplePage;
