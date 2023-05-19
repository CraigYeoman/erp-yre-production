import { Link as RouterLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { Box, useTheme, Link, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const { DateTime } = require("luxon");

const IndexGrid = ({ name, data }) => {
  const { loading, getDetail } = useAppContext();

  const theme = useTheme();

  if (!data) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const columns = [
    {
      field: "work_order_number",
      headerName: "Work Order #",
      flex: 1,
      renderCell: (params) => (
        <Link
          component={RouterLink}
          color="inherit"
          onClick={() => getDetail(params.row._id, "workorders")}
          to={`/workorderdetail/${params.row._id}`}
        >
          {params.row.work_order_number}
        </Link>
      ),
    },
    {
      field: "date_due",
      headerName: "Due Date",
      flex: 0.9,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {DateTime.fromISO(params.row.date_due).toFormat("D")}
          </div>
        );
      },
    },
    {
      field: "date_received",
      headerName: "Date Received",
      flex: 1.1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {DateTime.fromISO(params.row.date_received).toFormat("D")}
          </div>
        );
      },
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1.1,
      renderCell: (params) => (
        <Link
          component={RouterLink}
          color="inherit"
          onClick={() => getDetail(params.row.customer._id, "customers")}
          to={`/customerdetail/${params.row.customer._id}`}
        >
          {params.row.customer.first_name} {params.row.customer.last_name}
        </Link>
      ),
    },
    {
      field: "jobType",
      headerName: "Job Type",
      flex: 1,
      renderCell: (params) => {
        return <div className="rowitem">{params.row.jobType.name}</div>;
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        mt="15px"
        width="460px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <FlexBetween>
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            {name}
          </Typography>
        </FlexBetween>
        <DataGrid
          loading={loading || !data}
          rows={data}
          getRowId={(row) => row._id}
          columns={columns}
          autoHeight={true}
          rowHeight={20}
          hideFooter={true}
        />
      </Box>
    </Box>
  );
};

export default IndexGrid;
