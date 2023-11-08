import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { Box, useTheme, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";

const VendorList = () => {
  const theme = useTheme();

  const { getData, data, isLoading, formatPhoneNumber, getDetail } =
    useAppContext();

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Link
          component={RouterLink}
          color="inherit"
          onClick={() => getDetail(params.row._id, "vendors")}
          to={`/vendordetail/${params.row._id}`}
        >
          {params.row.name}
        </Link>
      ),
    },
    {
      field: "main_contact",
      headerName: "Main Contact",
      flex: 1,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {formatPhoneNumber(params.row.phone_number)}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];

  if (!data.vendors) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
  return (
    <Box>
      <Header title="Vendors" subtitle="List of Vendors" />
      <Box
        m="1.5rem 2.5rem"
        height="80vh"
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
            paddingBottom: "8px",
            paddingTop: "8px",
            height: "auto",
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
        <DataGrid
          loading={isLoading || !data.vendors}
          rows={data.vendors}
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

export default VendorList;
