import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { Box, useTheme, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";

const PartsList = () => {
  const { getData, data, getDetail, isLoading } = useAppContext();

  const theme = useTheme();

  useEffect(() => {
    getData();
  }, []);

  if (!data.parts) {
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
      flex: 1.5,
      renderCell: (params) => (
        <Link
          component={RouterLink}
          color="inherit"
          onClick={() => getDetail(params.row._id, "parts")}
          to={`/partdetail/${params.row._id}`}
        >
          {params.row._id}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "part_number",
      headerName: "Part Number",
      flex: 1,
    },
    {
      field: "partCategory",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => {
        return <div className="rowitem">{params.row.partCategory.name}</div>;
      },
    },
    {
      field: "manufacture",
      headerName: "Manufacture",
      flex: 1,
    },
    {
      field: "customer_price",
      headerName: "Customer Price",
      flex: 1,
      renderCell: (params) => {
        return <div className="rowitem">${params.row.customer_price}</div>;
      },
    },
    {
      field: "vendor",
      headerName: "Vendor Name",
      flex: 1,
      renderCell: (params) => (
        <Link
          component={RouterLink}
          color="inherit"
          onClick={() => getDetail(params.row.vendor._id, "vendors")}
          to={`/vendordetail/${params.row.vendor._id}`}
        >
          {params.row.vendor.name}
        </Link>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Parts" subtitle="List of Parts" />
      <Box
        mt="40px"
        height="75vh"
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
        <DataGrid
          loading={isLoading || !data.parts}
          rows={data.parts}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default PartsList;
