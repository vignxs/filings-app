import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {  Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

import {
  FormControlLabel,
  Radio,
  styled,
  RadioGroup,
  TextField
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { color } from "@mui/system";

export const PersonalInfo = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [userinfo, setInfo] = React.useState({});
  const [newGstinfo, setnewGstInfo] = React.useState({});
  const [Gstinfo, setGstInfo] = React.useState({ period: new Date(), });
  const [Paninfo, setPanInfo] = React.useState({});
  const [Taxinfo, setTaxInfo] = React.useState({});
  const [error, seterror] = React.useState(false);


  const quaters = ['Q1', 'Q2', 'Q3', 'Q4']

 const handleChangeInfo = (e, service) => {
   const { name, value } = e.target;
    if (service === 'user') {
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

const userInfoPost =  (e) => {
  handleClickVariant("success");
  e.preventDefault();
    console.log("submit");

  if (userinfo.enquiredfor === "GST") {
       setInfo({'serviceInfo' : Gstinfo});
    } 
    if (userinfo.enquiredfor === "GST Registration") {
    console.log("submit");

             setInfo({ serviceInfo: newGstinfo });

    } 
    if (userinfo.enquiredfor === "PAN Registration") {
             setInfo({ serviceInfo: Paninfo });

    } 
    if (userinfo.enquiredfor === "TAX Registration") {
             setInfo({ serviceInfo: Taxinfo });

    }
    console.log(userinfo);
   fetch("https://filings.deta.dev/enqform", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       userinfo,
     }),
   });

    Object.keys(userinfo).forEach((key) => delete userinfo[key]);
  };

  const services = [
    "GST",
    "GST Registration",
    "PAN Registration",
    "TAX Registration",
  ];

  return (
    <ValidatorForm
      // instantValidate
      onSubmit={userInfoPost}
      onError={(errors) => console.log(errors)}
    >
      <Grid
        style={{
          "& .MuiTypographyH6": {
            fontSize: "12px",
            lineHeight: "35px",
            fontWeight: "600",
          },
          marginTop: "20px",
          marginLeft: "40px",
          // display: "flex",
          flexDirection: "column",
          position: "relative",
          left: "-370px",
        }}
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid style={{ display: "flex" }}>
          <TextValidator
            label="First name"
            size="small"
            color="green"
            type="text"
            name="fst_name"
            required={true}
            value={userinfo.fst_name || ""}
            onChange={(e) =>
              handleChangeInfo(e, "user", seterror(!e.target.value))
            }
          />
          <TextValidator
            label="Last name"
            size="small"
            color="green"
            type="text"
            name="lst_name"
            required={true}
            value={userinfo.lst_name || ""}
            onChange={(e) =>
              handleChangeInfo(e, "user", seterror(!e.target.value))
            }
          />
        </Grid>
        <Grid style={{ display: "flex" }}>
          <TextValidator
            label="Mobile"
            name="mobile"
            validators={["isNumber"]}
            errorMessages={["Please enter 10 digit Mobile number"]}
            value={userinfo.mobile || ""}
            required={true}
            onChange={(e) => handleChangeInfo(e, "user")}
            size="small"
            color="green"
            type="text"
          />
          <TextValidator
            label="Address"
            multiline
            name="address"
            value={userinfo.address || ""}
            onChange={(e) => handleChangeInfo(e, "user")}
            size="small"
            required={true}
            color="green"
            type="text"
          />
        </Grid>
        <Grid style={{ display: "flex" }}>
          <TextValidator
            label="City"
            size="small"
            name="city"
            value={userinfo.city || ""}
            onChange={(e) => handleChangeInfo(e, "user")}
            color="green"
            // required={true}
            type="text"
          />
          <TextValidator
            label="Pincode"
            size="small"
            name="pincode"
            value={userinfo.pincode || ""}
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
          <TextValidator
            label="Email"
            onChange={(e) => handleChangeInfo(e, "user")}
            name="email"
            size="small"
            // required={true}
            value={userinfo.email || ""}
            validators={["isEmail"]}
            errorMessages={["email is not valid"]}
          />
          <FormControl sx={{ m: 2, minWidth: "30ch" }} size="small">
            <InputLabel id="demo-simple-select-label">Enquired for*</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-label"
              label="Enquired for*"
              color="green"
              value={userinfo.enquiredfor || ""}
              name="enquiredfor"
              required={true}
              onChange={(e) => handleChangeInfo(e, "user")}
            >
              {services.map((val) => (
                <MenuItem value={val}>{val}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Divider variant="middle" sx={{ m: 2, width: "40%" }} />

        {userinfo.enquiredfor === "GST" ? (
          <Grid>
            <RadioGroup
              row
              name="gst_time"
              required={true}
              sx={{ mb: 2 }}
              value={Gstinfo.gst_time}
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
                  onChange={(e) =>
                    setGstInfo({ ...Gstinfo, period: { year: e } })
                  }
                  renderInput={(params) => (
                    <TextValidator
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
                  value={Gstinfo.period.month || ""}
                  onChange={(e) =>
                    setGstInfo({ ...Gstinfo, period: { month: e } })
                  }
                  renderInput={(params) => (
                    <TextValidator
                      size="small"
                      {...params}
                      helperText={null}
                      fullWidth
                    />
                  )}
                />
              ) : Gstinfo.gst_time === "Quaterly" ? (
                <FormControl sx={{ m: 2, minWidth: "30ch" }} size="small">
                  <InputLabel id="demo-simple-select-label">Period</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Gstinfo.period.quater}
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
        ) : userinfo.enquiredfor === "GST Registration" ? (
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
            </Grid>
            <Grid style={{ display: "flex" }}>
              <TextValidator
                label="City"
                name="company_city"
                value={"" || userinfo.company_city}
                onChange={(e) => handleChangeInfo(e, "newgst")}
                size="small"
                color="green"
                type="text"
              />
              <TextValidator
                label="Pincode"
                name="company_pincode"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                value={userinfo.company_pincode}
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
                errorMessages={["this field is required", "email is not valid"]}
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
                type="email"
              />
            </Grid>
          </>
        ) : userinfo.enquiredfor === "PAN Registration" ? (
          <Grid
            style={{
              display: "flex",
            }}
          >
            <TextValidator
              label="Aadhar Number"
              size="small"
              color="green"
              validators={["matchRegexp:^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$"]}
              errorMessages={["Please enter 12 digit number "]}
              name="aadhar"
              required={true}
              value={Paninfo.aadhar}
              onChange={(e) => handleChangeInfo(e, "pan")}
              type="text"
            />
          </Grid>
        ) : userinfo.enquiredfor === "TAX Registration" ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid style={{ display: "flex" }}>
              <DatePicker
                orientation="landscape"
                width="inherit"
                openTo="year"
                label="Assessment year"
                views={["year"]}
                value={Taxinfo.assessmentyear}
                onChange={(e) => setInfo({ ...Taxinfo, assessmentyear: e })}
                renderInput={(params) => (
                  <TextValidator
                    required={true}
                    size="small"
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
                name="pan"
                validators={["matchRegexp:^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$"]}
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
        <Button sx={{ m: 2 }} variant="contained" color="success" type="submit">
          Submit
        </Button>
      </Grid>
    </ValidatorForm>
  );
};

