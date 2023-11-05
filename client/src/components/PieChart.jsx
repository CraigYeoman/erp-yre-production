import * as React from "react";
import { PieChart, pieArcClasses } from "@mui/x-charts/PieChart";
import { useTheme } from "@mui/material";

// const data = [
//   { id: 0, value: 10, label: 'series A' },
//   { id: 1, value: 15, label: 'series B' },
//   { id: 2, value: 20, label: 'series C' },
// ];

export default function PieActiveArc({ data }) {
  const theme = useTheme();

  data.forEach((jobTypes) => {
    jobTypes.value = jobTypes.count;
    jobTypes.label = jobTypes.name;
    jobTypes.id = jobTypes.index;
  });
  return (
    <PieChart
      colors={[
        theme.palette.primary.main,
        theme.palette.primary.dark,
        theme.palette.secondary.main,
        theme.palette.neutral.main,
      ]}
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30 },
        },
      ]}
      sx={{
        [`& .${pieArcClasses.faded}`]: {
          fill: "gray",
        },
        backgroundColor: theme.palette.background.default,
      }}
      slotProps={{
        legend: {
          labelStyle: {
            fontSize: 14,
            fill: theme.palette.secondary.main,
          },
        },
        title: "hi",
      }}
      height={300}
      maxWidth={500}
    />
  );
}
