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
      field: "part_number",
      headerName: "Part Number",
      flex: 1.5,
      renderCell: (params) => (
        <Link
          component={RouterLink}
          color="inherit"
          onClick={() => getDetail(params.row._id, "parts")}
          to={`/partdetail/${params.row._id}`}
        >
          {params.row.part_number}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Name",
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
    <Box>
      <Header title="Parts" subtitle="List of Parts" />
      <Box
        m="1.5rem 2.5rem"
        height="75vh"
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
            paddingBottom: "8px",
            paddingTop: "8px",
            height: "auto",
            color:theme.palette.secondary.main
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
            fontWeight: "bold"
          },
          "& .MuiDataGrid-columnHeader": {
            // Forced to use important since overriding inline styles
            height: "unset !important",
            
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data.parts}
          rows={data.parts}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={20}
          autoHeight={true}
          getRowHeight={() => "auto"}
        />
      </Box>
    </Box>
  );
};

export default PartsList;
