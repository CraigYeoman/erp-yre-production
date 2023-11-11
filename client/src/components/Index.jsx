import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { Box, useTheme } from "@mui/material";
import IndexGrid from "./IndexGrid";
import Header from "./Header";
import DashboardList from "./DashboardList";
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

  return (
    <Box>
      <Header title="ERP APP" subtitle="Welcome" />
      <Box height="75vh">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            gap: "15px",
            padding: "25px",
            alignItems: "center",
          }}
        >
          <DashboardList data={data.countArray}></DashboardList>
          <Box
            width="550px"
            sx={{
              padding: "25px",
              backgroundColor: theme.palette.background.default,
              borderRadius: "10px",
            }}
          >
            <PieActiveArc data={data.countArray} />
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
