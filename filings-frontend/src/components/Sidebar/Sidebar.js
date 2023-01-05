import React, { Fragment, useState } from "react";
import "./index.css";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import {Icon,  styled } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

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

const ListBtn = styled(ListItemButton)(({ theme }) => ({
  color: "white",
  borderRadius: "6PX",
  "&:hover": {
    background: "#F0F4F7",
    cursor: "pointer",
    "& .icon-list-1": {
      color: "black",
    },
    "& .text-list-1": {
      color: "black",
    },
  },
  height: 44,
}));
const label = { inputProps: { "aria-label": "Collapse sidebar" } };

const Sidebar = (props) => {
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
    color: "white",
    transition: ".9s",
    display: show ? "block" : "none",
    lineHeight: "35px",
    position: "relative",
    right: "5px",
    backgroundColor: "inherit",
    fontWeight: "500",
  };

  const textStyl = {
    color: "white",
    fontSize: "0.8rem",
    right: "1rem",
    position: "relative",
    display: show ? "block" : "none",
  };

const [open, setOpen] = React.useState(false);
const [side, setSide] = React.useState("Collapse");

const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <main className={show ? "space-toggle1" : null}>
        <header className={`header ${show ? "space-toggle" : null}`}>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
        </header>

        <aside
          className={`sidebar  ${show ? "show" : null}`}
          onMouseEnter={offtog ? 0 : () => toggle()}
          onMouseLeave={offtog ? 0 : () => toggle()}
        >
          <nav className="nav">
            <div className="header-nav">
              <ListBtn sx={{ color: "#F0F4F7",  "&:hover": {
                      background: "#F0F4F7",
                      cursor: "pointer",
                      "& .icon-list-1": {
                        color: "black",
                      },
                      "& .text-list-1": {
                        color: "black",
                      },
                    },}}>
                <ListItemIcon>
                  <FlashOnIcon style={headerStyl} />
                </ListItemIcon>
                <ListItemText
                  className="text-list-1"
                  disableTypography
                  style={{
                    fontFamily: "PT Sans Caption",
                    fontSize: "15px",
                    right: "30px",
                    fontWeight: "bold",
                    position: "relative",
                    color: "white",
                                     }}
                  primary="FilingFixer.io"
                />
              </ListBtn>
              <Tooltip title={side} arrow>
                <Switch
                  {...label}
                  sx={{ left: "5px" }}
                  // color="default"
                  onChange={() => offtoggle()}
                  size="small"
                />
              </Tooltip>
            </div>
            <div class=" " style={{ height: "100%" }}>
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
                      <a href="/compliance">
                        <ListBtn>
                          <ListItemIcon className="icon-list-1" sx={iconStyl}>
                            <ContactPageOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText
                            className="text-list-1"
                            sx={textStyl}
                            primary="Compliance"
                            primaryTypographyProps={{
                              fontSize: "0.9rem",
                              fontWeight: "400",
                            }}
                          />
                        </ListBtn>
                      </a>
                    </Fragment>
                    <Fragment>
                      <a href="/enq-form">
                        <ListBtn>
                          <ListItemIcon className="icon-list-1" sx={iconStyl}>
                            <ContactPageOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText
                            className="text-list-1"
                            sx={textStyl}
                            primary="Enquiry Form"
                            primaryTypographyProps={{
                              fontSize: "0.9rem",
                              fontWeight: "400",
                            }}
                          />
                        </ListBtn>
                      </a>
                    </Fragment>

                    <ListBtn onClick={handleClick}>
                      <ListItemIcon className="icon-list-1" sx={iconStyl}>
                        <DescriptionOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText
                        className="text-list-1"
                        sx={textStyl}
                        primary="Filings"
                        primaryTypographyProps={{
                          fontSize: "0.9rem",
                          fontWeight: "400",
                        }}
                      />
                      {open ? (
                        <Icon className="icon-list-1">expand_more</Icon>
                      ) : (
                        <Icon className="icon-list-1">expand_less</Icon>
                      )}
                    </ListBtn>
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
                          <ListBtn sx={[{ pl: "4" }]}>
                            <ListItemIcon className="icon-list-1" sx={iconStyl}>
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
                              className="text-list-1"
                              sx={textStyl}
                              primary="GST"
                              primaryTypographyProps={{
                                fontSize: "0.9rem",
                                fontWeight: "400",
                              }}
                            />
                          </ListBtn>
                        </a>
                      </List>
                    </Collapse>
                    <Fragment>
                      <a href="/payroll-hr">
                        <ListBtn>
                          <ListItemIcon className="icon-list-1" sx={iconStyl}>
                            <ContactPageOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText
                            className="text-list-1"
                            sx={textStyl}
                            primary="Payroll & HR"
                            primaryTypographyProps={{
                              fontSize: "0.9rem",
                              fontWeight: "400",
                            }}
                          />
                        </ListBtn>
                      </a>
                    </Fragment>
                  </List>
                </div>
              </div>
              {/* <ListBtn sx={listBtn}  >
                                <ListItemIcon className="icon-list-1" sx={iconStyl}>
                                    <Icon>receipt_long</Icon>
                                </ListItemIcon>
                                <ListItemText className="text-list-1" sx={textStyl} primary="Logout" primaryTypographyProps={{
                                    fontSize: '0.9rem', fontWeight: '400',
                                }} />
                            </ListBtn> */}
            </div>
          </nav>
        </aside>
      </main>
      <main className={show ? "space-toggle" : null}>{props.children}</main>
    </>
  );
};

export default Sidebar;
