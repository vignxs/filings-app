import React from "react";
import { useSignOut } from "react-auth-kit";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RequestPageRoundedIcon from "@mui/icons-material/RequestPageRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useValue } from "../../Context/ContextProvider";

const admin_nav = [
  // {
  //   icon: <ListAltRoundedIcon />,
  //   path: "/enq-form",
  //   name: "Enquiry Form",
  // },
  { 
    isSelected : 1,
    icon: <AdminPanelSettingsRoundedIcon />,
    path: "/enq-admin",
    name: "Enquiry Admin",
  },
];

const data = [
  {
    isSelected: 2,
    icon: <RequestPageRoundedIcon />,
    path: "/tax-filing",
    name: "Tax Filing",
  },
  {
    isSelected: 3,
    icon: <DescriptionRoundedIcon />,
    path: "/compliance",
    name: "Compliance",
  },
  {
    isSelected: 4,
    icon: <ContactPageRoundedIcon />,
    path: "/payroll-hr",
    name: "Payroll & HR",
  },
];

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: `rgb(0 0 0 / 6%) 0px 5px 5px -3px, rgb(0 0 0 / 4%) 0px 8px 10px 1px, rgb(0 0 0 / 4%) 0px 3px 14px 2px`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    boxShadow: `rgb(0 0 0 / 6%) 0px 5px 5px -3px, rgb(0 0 0 / 4%) 0px 8px 10px 1px, rgb(0 0 0 / 4%) 0px 3px 14px 2px`,

    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // boxShadow: "rgb(0 0 0 / 6%) 0px 5px 5px -3px, rgb(0 0 0 / 4%) 0px 8px 10px 1px, rgb(0 0 0 / 4%) 0px 3px 14px 2px",
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function HeaderBar(props) {
  const {
    state: { isLogged },
    dispatch,
  } = useValue();

  const [Expand, setExpand] = React.useState(false);
  const [ReqExpand, setReqExpand] = React.useState(false);

  const handleClickExpand = () => {
    setExpand(!Expand);
  };
  const handleClickReqExpand = () => {
    setReqExpand(!ReqExpand);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#094067",
      },
      green: {
        main: "#004643",
      },
      background: {
        main: "#d8eefe",
      },
      teritiary: {
        main: "#ef4565",
      },
      bg: {
        main: "#FFFFFE",
      },
    },
  });
  // const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [open, setOpen] = React.useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signOut = useSignOut();

  const handleClick = () => {
    signOut();
    dispatch({ type: "LOGGED_OUT", payload: true });
  };

  // const auth = useAuthUser();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <CssBaseline />
        <AppBar
          sx={{ display: isLogged === true ? "none" : "block" }}
          position="fixed"
          color="background"
          open={open}
        >
          <Toolbar>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuRoundedIcon color="teritiary" />
              </IconButton>

              <Button
                to="/enq-admin"
                component={Link}
                sx={{ textTransform: "none" }}
              >
                <Typography
                  variant="h6"
                  color={"#094067"}
                  sx={{
                    fontWeight: "bold",
                    flexGrow: 1,
                    float: "right",
                    fontFamily: "Poppins",
                  }}
                  noWrap
                  component="div"
                >
                  Intellecto Global Services
                </Typography>
              </Button>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                p: 1,
                m: 1,
                float: "right",
                // left: "1150px",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
            >
              {user || "Login"}
              {/* .replace(/['"]+/g, "") */}
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          transitionDuration={500}
          variant="permanent"
          PaperProps={{
            sx: {
              // backgroundColor: "black",
            },
          }}
          sx={{
            display: isLogged === true ? "none" : "block",
            "& .MuiDrawer-paper": {
              backgroundColor: "#d8eefe",
            },
          }}
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon color="teritiary" />
              ) : (
                <ChevronLeftIcon color="teritiary" />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List component="div">
            <ListItemButton
              sx={{
                borderRadius: "6px",
                "&:hover": {
                  background: "#90b4ce",
                  "& .icon-list-1": {
                    color: "#FFFFFE",
                  },
                  "& .text-list-1": {
                    color: "#FFFFFE",
                  },
                },
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={handleClickReqExpand}
            >
              <ListItemIcon
                className="icon-list-1"
                sx={{
                  color: "#094067",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AddTaskIcon />
              </ListItemIcon>
              <ListItemText
                className="text-list-1"
                sx={{ color: "#094067", opacity: open ? 1 : 0 }}
                primary="Requests"
              />
              {ReqExpand ? (
                <ExpandLess
                  className="icon-list-1"
                  sx={{
                    color: "#094067",
                    // minWidth: 0,
                    // mr: open ? 3 : "auto",
                    // justifyContent: "center",
                  }}
                />
              ) : (
                <ExpandMore
                  className="icon-list-1"
                  sx={{
                    color: "#094067",
                    // minWidth: 0,
                    // mr: open ? 3 : "auto",
                    // justifyContent: "center",
                  }}
                />
              )}
            </ListItemButton>
            <Collapse in={ReqExpand} timeout="auto" unmountOnExit>
              {admin_nav.map((text, idx) => (
                <ListItem
                  component={Link}
                  to={text.path}
                  key={idx}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    selected={selectedIndex === text.isSelected}
                    onClick={(event) =>
                      handleListItemClick(event, text.isSelected)
                    }
                    component="div"
                    to={text.path}
                    key={idx}
                    sx={{
                      borderRadius: "6px",

                      "&:hover": {
                        background: "#90b4ce",
                        "& .icon-list-1": {
                          color: "#FFFFFE",
                        },
                        "& .text-list-1": {
                          color: "#FFFFFE",
                        },
                      },
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      pl: open ? 4 : 2.5,
                    }}
                  >
                    <ListItemIcon
                      className="icon-list-1"
                      sx={{
                        color: "#094067",
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {text.icon}
                    </ListItemIcon>
                    <ListItemText
                      className="text-list-1"
                      primary={text.name}
                      sx={{ color: "#094067", opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </Collapse>
          </List>
          <Divider />
          <List component="div">
            <ListItemButton
              sx={{
                borderRadius: "6px",
                "&:hover": {
                  background: "#90b4ce",
                  "& .icon-list-1": {
                    color: "#FFFFFE",
                  },
                  "& .text-list-1": {
                    color: "#FFFFFE",
                  },
                },
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                pl: 2.5,
              }}
              onClick={handleClickExpand}
            >
              <ListItemIcon
                className="icon-list-1"
                sx={{
                  color: "#094067",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <EngineeringRoundedIcon />
              </ListItemIcon>
              <ListItemText
                className="text-list-1"
                sx={{ color: "#094067", opacity: open ? 1 : 0 }}
                primary="Services"
              />
              {Expand ? (
                <ExpandLess
                  className="icon-list-1"
                  sx={{
                    color: "#094067",
                    // minWidth: 0,
                    // mr: open ? 3 : "auto",
                    // justifyContent: "center",
                  }}
                />
              ) : (
                <ExpandMore
                  className="icon-list-1"
                  sx={{
                    color: "#094067",
                    // minWidth: 0,
                    // mr: open ? 3 : "auto",
                    // justifyContent: "center",
                  }}
                />
              )}
            </ListItemButton>
            <Collapse in={Expand} timeout="auto" unmountOnExit>
              <List>
                {data.map((text, index) => (
                  // <ListItem key={index} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    selected={selectedIndex === text.isSelected}
                    onClick={(event) =>
                      handleListItemClick(event, text.isSelected)
                    }
                    component={Link}
                    to={text.path}
                    key={index}
                    sx={{
                      // pl: 4,
                      borderRadius: "6px",
                      "&:hover": {
                        background: "#90b4ce",
                        "& .icon-list-1": {
                          color: "#FFFFFE",
                        },
                        "& .text-list-1": {
                          color: "#FFFFFE",
                        },
                      },
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      pl: open ? 4 : 2.5,
                    }}
                  >
                    <ListItemIcon
                      className="icon-list-1"
                      sx={{
                        color: "#094067",
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {text.icon}
                    </ListItemIcon>
                    <ListItemText
                      className="text-list-1"
                      primary={text.name}
                      sx={{ color: "#094067", opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  // </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
          <List style={{ marginTop: `auto` }}>
            <Divider />
            <ListItem key={1} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={handleClick}
                component={Link}
                to={"/login"}
                sx={{
                  borderRadius: "6px",
                  "&:hover": {
                    background: "#90b4ce",
                    "& .icon-list-1": {
                      color: "#FFFFFE",
                    },
                    "& .text-list-1": {
                      color: "#FFFFFE",
                    },
                  },
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  className="icon-list-1"
                  sx={{
                    color: "#094067",
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  className="text-list-1"
                  primary={"Logout"}
                  sx={{ color: "#094067", opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box
          sx={{
            flexGrow: 1,
            paddingTop: "96px",
            paddingLeft: "38px",
            paddingRight: "38px",
            bgcolor: "#FFFFFE",
            width: "100vw",
            minHeight: "100vw",
          }}
        >
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
