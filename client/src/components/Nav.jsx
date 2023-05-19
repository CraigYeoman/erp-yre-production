import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { IoDocumentsOutline, IoDocumentOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import { GiGears } from "react-icons/gi";
import { RiHomeGearFill, RiCarFill, RiCarWashingFill } from "react-icons/ri";
import {
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  GroupAdd,
  Build,
  Construction,
  HomeRepairService,
  Store,
  AddBusiness,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useEffect, useState } from "react";

function Nav() {
  const { updatePath, showSideBar, jobType, complete, sort } = useAppContext();
  const theme = useTheme();
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const isNonMobile = useMediaQuery("(min-width: 600px");
  const drawerWidth = "250px";
  const navigate = useNavigate();

  const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
      nav: "",
      listType: "/workorders/index",
    },
    {
      text: "Work Orders",
      icon: null,
      nav: "",
      listType: "",
    },
    {
      text: "Work Order List",
      icon: <IoDocumentsOutline />,
      nav: "workorderlist",
      listType: `/workorders?jobType=${jobType}&complete=${complete}&sort=${sort}`,
    },
    {
      text: "New Work Order",
      icon: <IoDocumentOutline />,
      nav: "workorderform",
      listType: "",
    },
    {
      text: "Customer",
      icon: null,
      nav: "",
      listType: "",
    },
    {
      text: "Customer List",
      icon: <Groups2Outlined />,
      nav: "customerlist",
      listType: "/customers",
    },
    {
      text: "New Customer",
      icon: <GroupAdd />,
      nav: "customerform",
      listType: "",
    },
    {
      text: "Parts",
      icon: null,
      nav: "",
      listType: "",
    },
    {
      text: "Parts List",
      icon: <GiGears />,
      nav: "partslist",
      listType: "parts",
    },
    {
      text: "New Part",
      icon: <GoGear />,
      nav: "partform",
      listType: "",
    },
    {
      text: "Part Category",
      icon: <RiHomeGearFill />,
      nav: "partcategory",
      listType: "partcategory",
    },
    {
      text: "Labor",
      icon: null,
      nav: "",
      listType: "",
    },
    {
      text: "Labor List",
      icon: <Construction />,
      nav: "laborlist",
      listType: "labor",
    },
    {
      text: "New Labor",
      icon: <Build />,
      nav: "laborform",
      listType: "",
    },
    {
      text: "Labor Category",
      icon: <HomeRepairService />,
      nav: "laborcategory",
      listType: "laborcategory",
    },
    {
      text: "Vendor",
      icon: null,
      nav: "",
      listType: "",
    },
    {
      text: "Vendor List",
      icon: <Store />,
      nav: "vendorlist",
      listType: "vendors",
    },
    {
      text: "New Vendor",
      icon: <AddBusiness />,
      nav: "vendorform",
      listType: "",
    },
    {
      text: "Job Type",
      icon: null,
      nav: "",
      listType: "",
    },
    {
      text: "Job Types List",
      icon: <RiCarFill />,
      nav: "jobtypelist",
      listType: "jobtypes",
    },
    {
      text: "New Job Type",
      icon: <RiCarWashingFill />,
      nav: "jobtypeform",
      listType: "",
    },
  ];

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {showSideBar && (
        <Drawer
          open={showSideBar}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.1rem 2rem 1.1rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Yeoman Race Engines
                  </Typography>
                </Box>
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, nav, listType }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      fontWeight="bold"
                      sx={{ m: ".75rem 0 .75rem 3rem" }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = nav.toLowerCase();

                return (
                  <ListItem key={text} disablePadding sx={{ height: "30px" }}>
                    <ListItemButton
                      onClick={() => {
                        updatePath(listType);
                        navigate(`/${nav}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                        height: "30px",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ m: ".5rem 0 .5rem 0rem" }}
                      />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

export default Nav;
