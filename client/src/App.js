import Index from "./components/Index";
import Landing from "./components/Landing";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  CustomerDetail,
  CustomerEditForm,
  CustomerForm,
  CustomerList,
} from "./components/customer";
import {
  JobTypeDetail,
  JobTypeEditForm,
  JobTypeList,
  JobTypeForm,
} from "./components/jobtype";
import {
  LaborDetail,
  LaborEditForm,
  LaborList,
  LaborForm,
  LaborCategory,
  LaborCategoryDetail,
  LaborCategoryEditForm,
  LaborCategoryForm,
} from "./components/labor";
import {
  PartDetail,
  PartEditForm,
  PartsList,
  PartForm,
  PartCategory,
  PartCategoryDetail,
  PartCategoryEditForm,
  PartCategoryForm,
} from "./components/parts";
import {
  VendorDetail,
  VendorEditForm,
  VendorForm,
  VendorList,
} from "./components/vendor";
import {
  WorkOrderDetail,
  WorkOrderEditForm,
  WorkOrderList,
  WorkOrderForm,
} from "./components/workorder/";
import Format from "./components/Format";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./components/theme";
import { useAppContext } from "./context/appContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const { mode } = useAppContext();
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <Format />
                </ProtectedRoute>
              }
            >
              <Route index path="/" element={<Index />}></Route>
              <Route
                path="/customerdetail/:id"
                element={<CustomerDetail />}
              ></Route>
              <Route
                path="/customeredit/:id"
                element={<CustomerEditForm />}
              ></Route>
              <Route path="/customerform" element={<CustomerForm />}></Route>
              <Route path="/customerlist" element={<CustomerList />}></Route>
              <Route
                path="/jobtypedetail/:id"
                element={<JobTypeDetail />}
              ></Route>
              <Route
                path="/jobtypeeditform/:id"
                element={<JobTypeEditForm />}
              ></Route>
              <Route path="/jobtypelist" element={<JobTypeList />}></Route>
              <Route path="/jobtypeform" element={<JobTypeForm />}></Route>
              <Route path="/labordetail/:id" element={<LaborDetail />}></Route>
              <Route path="/laboredit/:id" element={<LaborEditForm />}></Route>
              <Route path="/laborform" element={<LaborForm />}></Route>
              <Route path="/laborlist" element={<LaborList />}></Route>
              <Route path="/laborcategory" element={<LaborCategory />}></Route>
              <Route
                path="/laborcategoryform"
                element={<LaborCategoryForm />}
              ></Route>
              <Route
                path="/laborcategorydetail/:id"
                element={<LaborCategoryDetail />}
              ></Route>
              <Route
                path="/laborcategoryedit/:id"
                element={<LaborCategoryEditForm />}
              ></Route>
              <Route path="/partdetail/:id" element={<PartDetail />}></Route>
              <Route
                path="/parteditform/:id"
                element={<PartEditForm />}
              ></Route>
              <Route path="/partslist" element={<PartsList />}></Route>
              <Route path="/partform" element={<PartForm />}></Route>
              <Route path="/partcategory" element={<PartCategory />}></Route>
              <Route
                path="/partcategoryform"
                element={<PartCategoryForm />}
              ></Route>
              <Route
                path="/partcategorydetail/:id"
                element={<PartCategoryDetail />}
              ></Route>
              <Route
                path="/partcategoryeditform/:id"
                element={<PartCategoryEditForm />}
              ></Route>
              <Route
                path="/vendordetail/:id"
                element={<VendorDetail />}
              ></Route>
              <Route
                path="/vendoreditform/:id"
                element={<VendorEditForm />}
              ></Route>
              <Route path="/vendorform" element={<VendorForm />}></Route>
              <Route path="/vendorlist" element={<VendorList />}></Route>
              <Route
                path="/workorderdetail/:id"
                element={<WorkOrderDetail />}
              ></Route>
              <Route
                path="/workordereditform/:id"
                element={<WorkOrderEditForm />}
              ></Route>
              <Route path="/workorderlist" element={<WorkOrderList />}></Route>
              <Route path="/workorderform" element={<WorkOrderForm />}></Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
