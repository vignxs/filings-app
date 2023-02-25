import { Box  } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Sidebar from "../Sidebar/Sidebar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

import {
  FormControlLabel,
  Radio,
  styled,
  RadioGroup,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";


export const EnqForm = (props) => {
  
 
  const [userinfo, setInfo] = React.useState({
    first_name: "vignesh",
    last_name: "siva",
    mobile: "7639290579",
    email: "vignxs@gmail.com",
    address: "15/10 , mela thoopu street",
    city: "PYR",
    pincode: "609307",
  });
  const [newGstinfo, setnewGstInfo] = React.useState({
    company_name: "IGS",
    company_address: "medavakkam koot road",
    company_city: "chennai",
    company_pincode: "600021",
    company_email: "igs@gamil.com",
  });
  const [Gstinfo, setGstInfo] = React.useState({ gst_time: "", period: {} });
  const [Paninfo, setPanInfo] = React.useState({});
  const [Taxinfo, setTaxInfo] = React.useState({});
  // const [heightBox, setheightBox] = React.useState("700px");

  const quaters = ["Q1", "Q2", "Q3", "Q4"];

  const handleChangeInfo = (e, service) => {
    const { name, value } = e.target;
    if (service === "user") {
      // if (name === "enquired_for") {
      //   if (value === "GST") {
      //     setheightBox("500px")
      //   }
      // }
      setInfo((prevalues) => {
        return { ...prevalues, [name]: value };
      });
    }
    if (service === "gst") {
      setGstInfo((prevalues) => {
        return { ...prevalues, [name]: value };
      });
    }
    if (service === "newgst") {
      setnewGstInfo((prevalues) => {
        return { ...prevalues, [name]: value };
      });
    }
    if (service === "pan") {
      setPanInfo((prevalues) => {
        return { ...prevalues, [name]: value };
      });
    }
    if (service === "tax") {
      setTaxInfo((prevalues) => {
        return { ...prevalues, [name]: value };
      });
    }
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("File uploaded successfuly!", { variant });
  };

  const userInfoPost = (e) => {
    handleClickVariant("success");
    e.preventDefault();

    if (userinfo.enquired_for === "GST") {
      userinfo["serviceInfo"] = Gstinfo;
    } else if (userinfo.enquired_for === "GST Registration") {
      userinfo["serviceInfo"] = newGstinfo;
    } else if (userinfo.enquired_for === "PAN Registration") {
      userinfo["serviceInfo"] = Paninfo;
    } else if (userinfo.enquired_for === "TAX Registration") {
      userinfo["serviceInfo"] = Taxinfo;
    }
    console.log(userinfo);

    fetch("http://localhost:8000/enqform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userinfo,
      }),
    });

    // Object.keys(userinfo).forEach((key) => delete userinfo[key]);
    // Object.keys(userinfo.serviceInfo).forEach((key) => delete userinfo.serviceInfo[key]);
  };

  const services = [
    "GST",
    "GST Registration",
    "PAN Registration",
    "TAX Registration",
  ];
  const inputBox = {
    margin: "0 auto",
    width: "100%",
    "& .MuiTextField-root": {
      m: 1.5,
      // borderRadius:'15px',
      backgroundColor: "#fffffe",
      borderRadius: "10px",
      width: "23ch",
    },
    "& .MuiInputBase-input": {
      borderRadius: "10px",
      backgroundColor: "#fffffe",
    },
    "& .MuiAutocomplete-popupIndicator": {
      display: "none !important",
    },
    "&  .MuiFormHelperText-root.Mui-error": {
      background: "#d8eefe",
      margin: 0,
      paddingLeft: 10,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
    // marginLeft: "70px",
    justifyContent: "center",
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
    // bgcolor: "#094067",
    // left: "-170px",
    // top: ".8rem",
    // width: "1300px",
    // height: {heightBox},
    flexGrow:1,
    position: "relative",
    borderRadius: "10px",
  };
      const theme = createTheme({
        palette: {
          primary: {
            main: "#2FA0A4",
          },
          green: {
            main: "#094067",
          },
        },
      });

    return (
      <>
        <Box border={1} borderColor="#094067" sx={inputBox}>
          <Typography
            variant="h6"
            color={"#ef4565"}
            sx={{
              p: 2,
              fontWeight: "500",
              fontSize: "18px",
              flexGrow: 1,
              fontFamily: "PT Sans Caption",
            }}
            noWrap
            component="h3"
          >
            Enquiry Form
          </Typography>
          <Divider />
          <ThemeProvider theme={theme}>
            <ValidatorForm
              // instantValidate
              onSubmit={userInfoPost}
              onError={(errors) => console.log(errors)}
            >
              <Grid
                style={{
                  paddingTop: "10px",
                  "& .MuiTypographyH6": {
                    fontSize: "12px",
                    lineHeight: "35px",
                    fontWeight: "600",
                  },
                  flexDirection: "column",
                  position: "relative",
                }}
                container
                direction="row"
                justify="center"
                alignItems="inherit"
              >
                <Grid style={{ display: "flex" }}>
                  <TextValidator
                    label="First name"
                    size="small"
                    color="green"
                    type="text"
                    name="first_name"
                    required={true}
                    value={userinfo.first_name}
                    onChange={(e) => handleChangeInfo(e, "user")}
                  />
                  <TextValidator
                    label="Last name"
                    size="small"
                    color="green"
                    type="text"
                    name="last_name"
                    required={true}
                    value={userinfo.last_name}
                    onChange={(e) => handleChangeInfo(e, "user")}
                  />
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <TextValidator
                    label="Mobile"
                    name="mobile"
                    validators={["isNumber"]}
                    errorMessages={["Please enter 10 digit Mobile number"]}
                    value={userinfo.mobile}
                    required={true}
                    onChange={(e) => handleChangeInfo(e, "user")}
                    size="small"
                    color="green"
                    type="text"
                  />
                  <TextValidator
                    label="Email"
                    onChange={(e) => handleChangeInfo(e, "user")}
                    name="email"
                    size="small"
                    color="green"
                    // required={true}
                    value={userinfo.email}
                    validators={["isEmail"]}
                    errorMessages={["email is not valid"]}
                  />
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <TextValidator
                    label="Address"
                    multiline
                    name="address"
                    value={userinfo.address}
                    onChange={(e) => handleChangeInfo(e, "user")}
                    size="small"
                    required={true}
                    color="green"
                    type="text"
                  />
                  <TextValidator
                    label="City"
                    size="small"
                    name="city"
                    value={userinfo.city}
                    onChange={(e) => handleChangeInfo(e, "user")}
                    color="green"
                    // required={true}
                    type="text"
                  />
                  <TextValidator
                    label="Pincode"
                    size="small"
                    name="pincode"
                    value={userinfo.pincode}
                    onChange={(e) => handleChangeInfo(e, "user")}
                    color="green"
                    validators={["isNumber", "matchRegexp:^[1-9][0-9]{5}$"]}
                    errorMessages={[
                      "Please enter 6 digit Pincode",
                      "Please enter 6 digit Pincode",
                    ]}
                    type="text"
                    // required={true}
                  />
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                    <InputLabel color="green" id="demo-simple-select-label">
                      Enquired for*
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-label"
                      label="Enquired for*"
                      color="green"
                      value={userinfo.enquired_for || ""}
                      name="enquired_for"
                      required={true}
                      onChange={(e) => handleChangeInfo(e, "user")}
                    >
                      {services.map((val) => (
                        <MenuItem value={val}>{val}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Divider variant="middle" sx={{ m: 2, width: "40%" }} /> */}

                {userinfo.enquired_for === "GST" ? (
                  <Grid>
                    <RadioGroup
                      row
                      name="gst_time"
                      required={true}
                      sx={{ mb: 2, p: 0, left: "20px", position: "relative" }}
                      value={Gstinfo.gst_time || ""}
                      onChange={(e) => handleChangeInfo(e, "gst")}
                    >
                      <FormControlLabel
                        value="Monthly"
                        label="Monthly"
                        labelPlacement="end"
                        control={<Radio required={true} color="green" />}
                      />

                      <FormControlLabel
                        value="Quaterly"
                        label="Quaterly"
                        labelPlacement="end"
                        control={<Radio required={true} color="green" />}
                      />

                      <FormControlLabel
                        value="Yearly"
                        label="Yearly"
                        labelPlacement="end"
                        control={<Radio required={true} color="green" />}
                      />
                    </RadioGroup>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      {Gstinfo.gst_time === "Yearly" ? (
                        <DatePicker
                          orientation="landscape"
                          openTo="year"
                          views={["year"]}
                          value={Gstinfo.period.year}
                          label="Period"
                          onChange={(date) =>
                            setGstInfo({
                              ...Gstinfo,
                              period: { year: date ? date.toISOString() : "" },
                            })
                          }
                          renderInput={(params) => (
                            <TextValidator
                              color="green"
                              size="small"
                              {...params}
                              helperText={null}
                              fullWidth
                            />
                          )}
                        />
                      ) : Gstinfo.gst_time === "Monthly" ? (
                        <DatePicker
                          orientation="landscape"
                          openTo="month"
                          label="Period"
                          views={["year", "month"]}
                          value={Gstinfo.period.month}
                          onChange={(e) =>
                            setGstInfo({ ...Gstinfo, period: { month: e } })
                          }
                          renderInput={(params) => (
                            <TextValidator
                              size="small"
                              {...params}
                              color="green"
                              helperText={null}
                              fullWidth
                            />
                          )}
                        />
                      ) : Gstinfo.gst_time === "Quaterly" ? (
                        <FormControl
                          sx={{ m: 1.5, minWidth: "23ch" }}
                          size="small"
                        >
                          <InputLabel id="demo-simple-select-label">
                            Period
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            color="green"
                            value={Gstinfo.period.quater || "Q1"}
                            label="Period"
                            name="period"
                            onChange={(e) => {
                              setGstInfo({
                                ...Gstinfo,
                                period: { quater: e.target.value },
                              });
                            }}
                          >
                            {quaters.map((val) => (
                              <MenuItem value={val}>{val}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        false
                      )}
                    </LocalizationProvider>
                  </Grid>
                ) : userinfo.enquired_for === "GST Registration" ? (
                  <>
                    <Grid style={{ display: "flex" }}>
                      <TextValidator
                        label="Company name"
                        size="small"
                        color="green"
                        name="company_name"
                        required={true}
                        value={newGstinfo.company_name}
                        onChange={(e) => handleChangeInfo(e, "newgst")}
                        type="text"
                      />
                    </Grid>
                    <Grid style={{ display: "flex" }}>
                      <TextValidator
                        label="Company address"
                        multiline
                        size="small"
                        name="company_address"
                        value={newGstinfo.company_address}
                        onChange={(e) => handleChangeInfo(e, "newgst")}
                        color="green"
                        type="text"
                      />
                      <TextValidator
                        label="City"
                        name="company_city"
                        value={"" || newGstinfo.company_city}
                        onChange={(e) => handleChangeInfo(e, "newgst")}
                        size="small"
                        color="green"
                        type="text"
                      />
                      <TextValidator
                        label="Pincode"
                        name="company_pincode"
                        value={newGstinfo.company_pincode}
                        onChange={(e) => handleChangeInfo(e, "newgst")}
                        size="small"
                        color="green"
                        type="tel"
                      />
                    </Grid>
                    <Grid style={{ display: "flex" }}>
                      <TextValidator
                        label="Email"
                        name="company_email"
                        value={newGstinfo.company_email}
                        validators={["required", "isEmail"]}
                        errorMessages={[
                          "this field is required",
                          "email is not valid",
                        ]}
                        onChange={(e) => handleChangeInfo(e, "newgst")}
                        size="small"
                        color="green"
                        type="email"
                      />
                      <TextValidator
                        label="Employer Pan"
                        name="employer_pan"
                        value={newGstinfo.employer_pan}
                        onChange={(e) => handleChangeInfo(e, "newgst")}
                        size="small"
                        required={true}
                        color="green"
                        type="tel"
                      />
                    </Grid>
                  </>
                ) : userinfo.enquired_for === "PAN Registration" ? (
                  <Grid
                    style={{
                      display: "flex",
                    }}
                  >
                    <TextValidator
                      label="Aadhar Number"
                      size="small"
                      color="green"
                      validators={[
                        "matchRegexp:^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$",
                      ]}
                      errorMessages={["Please enter 12 digit number "]}
                      name="aadhar"
                      required={true}
                      value={Paninfo.aadhar}
                      onChange={(e) => handleChangeInfo(e, "pan")}
                      type="text"
                    />
                  </Grid>
                ) : userinfo.enquired_for === "TAX Registration" ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid style={{ display: "flex" }}>
                      <DatePicker
                        orientation="landscape"
                        width="inherit"
                        openTo="year"
                        label="Assessment year"
                        views={["year"]}
                        value={Taxinfo.assessment_year}
                        onChange={(e) =>
                          setTaxInfo({ ...Taxinfo, assessment_year: e })
                        }
                        renderInput={(params) => (
                          <TextValidator
                            required={true}
                            size="small"
                            color="green"
                            {...params}
                            helperText={null}
                            fullWidth
                          />
                        )}
                      />
                      <TextValidator
                        inputProps={{ style: { textTransform: "uppercase" } }}
                        size="small"
                        label="Pan"
                        required={true}
                        color="green"
                        name="pan"
                        validators={[
                          "matchRegexp:^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$",
                        ]}
                        errorMessages={["Please valid Pan number "]}
                        value={Taxinfo.pan}
                        onChange={(e) => handleChangeInfo(e, "tax")}
                        type="text"
                        id="outlined-textarea"
                      />
                    </Grid>
                  </LocalizationProvider>
                ) : (
                  false
                )}
              </Grid>
              <div style={{ positiion: "absolute", bottom: 0, width: "100%" }}>
                <Divider />
                <Stack spacing={2} direction="row">
                  <Button
                    sx={{ m: 2, width: "100px", color: "#FFFFFE" }}
                    variant="contained"
                    color="green"
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Button
                    sx={{
                      m: 2,
                      width: "100px",
                      height: "38px",
                      top: "17px",
                      color: "#094067",
                    }}
                    variant="outlined"
                    color="green"
                    type="reset"
                  >
                    Clear
                  </Button>
                </Stack>
              </div>
            </ValidatorForm>
          </ThemeProvider>
        </Box>
      </>
    );
  };



