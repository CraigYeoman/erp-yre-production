import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { Box, useTheme, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";

const CustomerList = () => {
  const { getData, data, isLoading, formatPhoneNumber, getDetail } =
    useAppContext();

  const theme = useTheme();

  useEffect(() => {
    getData();
  }, []);

  if (!data.customers) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      renderCell: (params) => (
        <Link
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
          component={RouterLink}
          color="inherit"
          onClick={() => getDetail(params.row._id, "customers")}
          to={`/customerdetail/${params.row._id}`}
        >
          {params.row._id}
        </Link>
      ),
    },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 0.6,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 0.6,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 0.8,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {formatPhoneNumber(params.row.phone_number)}
          </div>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Customers" subtitle="List of Customers" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderColor: theme.palette.secondary[300],
            paddingBottom: "8px",
            paddingTop: "8px",
            height: "auto",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
            maxHeight: "168px !important",
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
          "& .MuiDataGrid-columnHeaderTitle": {
            whiteSpace: "normal",
            lineHeight: "normal",
          },
          "& .MuiDataGrid-columnHeader": {
            // Forced to use important since overriding inline styles
            height: "unset !important",
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data.customers}
          rows={data.customers}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default CustomerList;
