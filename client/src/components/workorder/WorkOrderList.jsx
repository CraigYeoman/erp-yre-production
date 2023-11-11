import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  Box,
  useTheme,
  Link,
  InputLabel,
  Button,
  FormControl,
  NativeSelect,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";
import FlexBetween from "../FlexBetween";

const { DateTime } = require("luxon");

const WorkOrderList = () => {
  const {
    getWorkOrders,
    data,
    isLoading,
    sumTotal,
    getDetail,
    clearFilters,
    handleChange,
    sort,
    complete,
    jobType,
  } = useAppContext();

  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  useEffect(() => {
    getWorkOrders();
  }, [sort, complete, jobType]);

  if (!data.workOrders) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const columns = [
    {
      field: "work_order_number",
      headerName: "Work Order Number",
      flex: 0.8,
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
      field: "jobType",
      headerName: "Job Type",
      flex: 1,
      renderCell: (params) => {
        return <div className="rowitem">{params.row.jobType.name}</div>;
      },
    },
    {
      field: "customer",
      headerName: "Customer Name",
      flex: 1,
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
      field: "date_received",
      headerName: "Date Received",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {DateTime.fromISO(params.row.date_received).toFormat("D")}
          </div>
        );
      },
    },
    {
      field: "date_due",
      headerName: "Due Date",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {DateTime.fromISO(params.row.date_due).toFormat("D")}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Estimated Price",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            $
            {(
              sumTotal(params.row.labor, "price") +
              sumTotal(params.row.parts, "customer_price") -
              0
            ).toFixed(2)}
          </div>
        );
      },
    },
  ];

  return (
    <Box>
      <Header title="Work Orders" subtitle="List of Work Orders" />
      <Box
        m="1.5rem 2.5rem"
        height="625px"
        maxWidth="calc(100% - 100px)"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-main": {
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: theme.palette.background.default,
          },
          "& .MuiDataGrid-cell": {
            border: "none",
            backgroundColor: theme.palette.background.default,
            paddingBottom: "3px",
            paddingTop: "3px",

            color: theme.palette.secondary.main,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.secondary.main,
            borderBottom: "none",
            maxHeight: "168px !important",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.default,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary.main,
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary.main} !important`,
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            whiteSpace: "normal",
            lineHeight: "normal",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeader": {
            // Forced to use important since overriding inline styles
            height: "unset !important",
          },
        }}
      >
        <FlexBetween m="1.5rem 2.5rem">
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="jobtype">Job Type</InputLabel>
            <NativeSelect
              type="select"
              placeholder="jobtype"
              name="jobType"
              required={true}
              onChange={handleChange}
              value={jobType}
            >
              {(data.jobTypeList || [])
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((jobType) => {
                  return (
                    <option key={jobType._id} value={jobType._id}>
                      {jobType.name}
                    </option>
                  );
                })}
            </NativeSelect>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="sort">Sort</InputLabel>
            <NativeSelect
              type="select"
              placeholder="sort"
              name="sort"
              required={true}
              onChange={handleChange}
              value={sort}
            >
              <option value="date_due">Due Date</option>
              <option value="date_received">Date Recieved</option>
              <option value="Work Order Number">Work Order Number</option>
              <option value="customer_name_a">Customer Name A-Z</option>
              <option value="customer_name_z">Customer Name Z-A</option>
              <option value="estimated_price_>">Estimated Price Largest</option>
              <option value="estimated_price_<">
                Estimated Price Smallest
              </option>
            </NativeSelect>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="complete">Status</InputLabel>
            <NativeSelect
              type="select"
              placeholder="complete"
              name="complete"
              required={true}
              onChange={handleChange}
              value={complete}
            >
              <option value="all">All</option>
              <option value="false">Incomplete</option>
              <option value="true">Complete</option>
            </NativeSelect>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Clear Filters
          </Button>
        </FlexBetween>
        <DataGrid
          loading={isLoading || !data.workOrders}
          rows={data.workOrders}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={10}
          height="600px"
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
        />
      </Box>
    </Box>
  );
};

export default WorkOrderList;
