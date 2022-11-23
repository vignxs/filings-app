import React, { Fragment, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { Box, ButtonBase, Icon, styled } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { fontWeight } from "@mui/system";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const iconStyl = {
  color: "white",
  right: "0.6rem",
  position: "relative",
};

const headerStyl = {
  color: "white",
  right: "1.3rem",
  position: "relative",
};
const label = { inputProps: { "aria-label": "Collapse sidebar" } };

const Sidebar = (props) => {
  const ListLabel = {
    fontSize: "12px",
    marginTop: "20px",
    marginLeft: "15px",
    marginBottom: "10px",
    textTransform: "uppercase",
  };
  var [show, setShow] = useState(true);

  var [offtog, setTog] = useState(true);

  function toggle(params) {
    setShow(!show);
  }

  function offtoggle(params) {
    setShow(true);
    setTog(!offtog);
    setSide("Collapse");
  }

  const subhdr = {
    whiteSpace: "normal",
    fontSize: "12px",
    margiBottom: "10px",
    textTransform: " uppercase",
    color: `rgba(255, 255, 255, 0.7)`,
    transition: ".9s",
    display: show ? "block" : "none",
    lineHeight: "25px",
    position: "relative",
    right: "5px",
    backgroundColor: "inherit",
    fontWeight: "400",
  };

  const listBtn = {
    color: "white",
    borderRadius: "6PX",
    "&:hover": { background: "rgba(255, 255, 255, 0.08)" },
    height: 44,
  };
  const textStyl = {
    color: "white",
    fontSize: "0.8rem",
    right: "1rem",
    position: "relative",
    display: show ? "block" : "none",
  };

  const [open, setOpen] = React.useState(true);

  const [side, setSide] = React.useState("Expand");

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <main className={show ? "space-toggle" : null}>
        <header className={`header ${show ? "space-toggle" : null}`}></header>

        <aside
          className={`sidebar  ${show ? "show" : null}`}
          onMouseLeave={offtog ? 0 : () => toggle()}
          onMouseEnter={offtog ? 0 : () => toggle()}
        >
          <nav className="nav">
            <div>
              <div className="header-nav">
                <ListItemButton sx={{ color: "white" }}>
                  <ListItemIcon sx={headerStyl}>
                    {" "}
                    <Icon>home</Icon>{" "}
                  </ListItemIcon>
                  <ListItemText style={textStyl} primary="home.io" />
                </ListItemButton>
                <Tooltip title={side} arrow>
                  <Switch
                    {...label}
                    sx={{ left: "5px" }}
                    color="info"
                    onChange={() => offtoggle()}
                    size="small"
                  />
                </Tooltip>
              </div>

              <div
                className="scrollbar-container"
                style={{
                  height: "100%",
                  position: "relative",
                  display: "flex",
                  flexGrow: "1",
                  flexDirection: "column",
                }}
              >
                <div className="nav-list">
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      borderRadius: "6px",
                      color: "white",
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <ListSubheader
                        component="div"
                        variant="p"
                        id="nested-list-subheader"
                        color="inherit"
                        style={subhdr}
                      >
                        Services
                      </ListSubheader>
                    }
                  >
                    <Fragment>
                      <ListItemButton sx={listBtn}>
                        <ListItemIcon sx={iconStyl}>
                          <Icon>receipt_long</Icon>
                        </ListItemIcon>
                        <ListItemText
                          sx={textStyl}
                          primary="Compliance"
                          primaryTypographyProps={{
                            fontSize: "0.9rem",
                            fontWeight: "400",
                          }}
                        />
                      </ListItemButton>
                    </Fragment>
                    <ListItemButton sx={listBtn} onClick={handleClick}>
                      <ListItemIcon sx={iconStyl}>
                        <Icon sx={{ color: "white" }}>text_snippet</Icon>
                      </ListItemIcon>
                      <ListItemText
                        sx={textStyl}
                        primary="Filings"
                        primaryTypographyProps={{
                          fontSize: "0.9rem",
                          fontWeight: "400",
                        }}
                      />
                      {open ? (
                        <Icon>expand_more</Icon>
                      ) : (
                        <Icon>expand_less</Icon>
                      )}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List
                        sx={{
                          display: show ? "block" : "none",
                          transition: "0.8s",
                          color: "white",
                        }}
                        component="div"
                        disablePadding
                      >
                        <a href="/tax-filing">
                          <ListItemButton sx={[listBtn, { pl: "4" }]}>
                            <ListItemIcon sx={iconStyl}>
                              <Icon
                                style={{
                                  fontSize: "7px",
                                  position: "relative",
                                  left: "15px",
                                }}
                              >
                                lens
                              </Icon>
                            </ListItemIcon>
                            <ListItemText
                              sx={textStyl}
                              primary="GST"
                              primaryTypographyProps={{
                                fontSize: "0.9rem",
                                fontWeight: "400",
                              }}
                            />
                          </ListItemButton>
                        </a>
                      </List>
                    </Collapse>
                  </List>

                  <Fragment>
                    <a href="/">
                      <ListItemButton sx={listBtn}>
                        <ListItemIcon sx={iconStyl}>
                          <Icon>description</Icon>
                        </ListItemIcon>
                        <ListItemText
                          style={textStyl}
                          primary="Payroll & HR"
                          primaryTypographyProps={{
                            fontSize: "0.9rem",
                            fontWeight: "400",
                          }}
                        />
                      </ListItemButton>
                    </a>
                  </Fragment>
                </div>
              </div>
            </div>
            {/* <ListItemButton sx={listBtn}  >
                                <ListItemIcon sx={iconStyl}>
                                    <Icon>receipt_long</Icon>
                                </ListItemIcon>
                                <ListItemText sx={textStyl} primary="Logout" primaryTypographyProps={{
                                    fontSize: '0.9rem', fontWeight: '400',
                                }} />
                            </ListItemButton> */}
          </nav>
        </aside>
      </main>
      <main className={show ? "space-toggle" : null}>{props.children}</main>
    </>
  );
};

export default Sidebar;
