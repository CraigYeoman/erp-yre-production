import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { Box, useTheme, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";

const LaborList = () => {
  const theme = useTheme();
  const { getData, data, isLoading, getDetail } = useAppContext();

  useEffect(() => {
    getData();
  }, []);

  if (!data.labor) {
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
          onClick={() => getDetail(params.row._id, "labor")}
          to={`/labordetail/${params.row._id}`}
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
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: (params) => {
        return <div className="rowitem">${params.row.price}</div>;
      },
    },
  ];

  return (
    <Box>
      <Header title="Labor" subtitle="List of Labor" />
      <Box
        m="1.5rem 2.5rem"
        height="80vh"
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
          loading={isLoading || !data.labor}
          rows={data.labor}
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

export default LaborList;
