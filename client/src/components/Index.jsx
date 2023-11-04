import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { Box, useTheme, Typography } from "@mui/material";
import IndexGrid from "./IndexGrid";
import Header from "./Header";
import DashboardList from "./DashboardList"
import PieActiveArc from "./PieChart";

const Index = () => {
  const { getData, data, updatePath } = useAppContext();
  const theme = useTheme();

  useEffect(() => {
    updatePath("/workorders/index");
    getData();
    // eslint-disable-next-line
  }, []);

  if (data.countArray == null) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
console.log(data.countArray)
  return (
    <Box >
      <Header title="ERP APP" subtitle="Welcome" />

      
        {/* <Box
          mt="20px"
          gap="1rem"
          sx={{
            flexDirection: "row",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          p="1.25rem 1rem"
        > */}
          {/* {data.countArray.map((jobType) => (
            <Box key={jobType.name}>
              <Typography
                variant="h4"
                fontWeight="600"
                sx={{ color: theme.palette.secondary[100] }}
              >
                {jobType.name}: {jobType.count}
              </Typography>
            </Box>
          ))} */}
        {/* </Box> */}
      
      <Box height="75vh">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            gap: "15px",
            padding: "25px",
            alignItems: "center"
          }}
        >
          <DashboardList data={data.countArray}></DashboardList>
          <Box width="550px"
            sx={{ padding: "25px", backgroundColor: theme.palette.background.default, borderRadius: "10px"}}>
            <PieActiveArc data={data.countArray}/>
          </Box>
          <IndexGrid name="Past Due" data={data.past_due} />
          <IndexGrid name="Due This Week" data={data.due_this_week} />
          <IndexGrid name="Due Next Week" data={data.due_next_week} />
          <IndexGrid name="Due in 30 Days" data={data.due_week_three_four} />
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
