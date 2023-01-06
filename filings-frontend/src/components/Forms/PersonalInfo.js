import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {  Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const PersonalInfo = (props) => {
  const navigate = useNavigate();
  const [userinfo, setInfo] = React.useState({});
  const [newGstinfo, setnewGstInfo] = React.useState({});
  const [Gstinfo, setGstInfo] = React.useState({});
  const [Paninfo, setPanInfo] = React.useState({});
  const [Taxinfo, setTaxInfo] = React.useState({});
  const periods = ["Monthly", "Quaterly", "Yearly"];
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


const userInfoPost = async (e) => {
  // e.preventDefault();
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
  // await fetch("http://localhost:8000/products", {
  //   method: "POST",
  //   headers: { Accept: "multipart/form-data" },
  //   body: data,
  // });

  // await navigate(-1);
};

  const services = [
    "GST",
    "GST Registration",
    "PAN Registration",
    "TAX Registration",
  ];


  return (
    <Grid
      style={{
        "& .MuiTypographyH6": {
          fontSize: "12px",
          lineHeight: "35px",
          fontWeight: "600",
        },
        marginTop: "20px",
        marginLeft: "40px",
        display: "flex",
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
      <Grid>
        <TextField
          label="First name"
          size="small"
          color="green"
          type="text"
          name="fst_name"
          value={userinfo.fst_name}
          onChange={(e) => handleChangeInfo(e, "user")}
        />
        <TextField
          label="Last name"
          name="lst_name"
          value={userinfo.lst_name}
          onChange={(e) => handleChangeInfo(e, "user")}
          size="small"
          color="green"
          type="text"
        />
      </Grid>
      <Grid>
        <TextField
          label="Mobile"
          name="mobile"
          value={userinfo.mobile}
          onChange={(e) => handleChangeInfo(e, "user")}
          size="small"
          color="green"
          type="text"
        />
        <TextField
          label="Address"
          multiline
          name="address"
          value={userinfo.address}
          onChange={(e) => handleChangeInfo(e, "user")}
          size="small"
          color="green"
          type="text"
        />
      </Grid>
      <Grid>
        <TextField
          label="City"
          size="small"
          name="city"
          value={userinfo.city}
          onChange={(e) => handleChangeInfo(e, "user")}
          color="green"
          type="text"
        />
        <TextField
          label="Pincode"
          size="small"
          name="pincode"
          value={userinfo.pincode}
          onChange={(e) => handleChangeInfo(e, "user")}
          color="green"
          type="tel"
        />
      </Grid>
      <Grid>
        <TextField
          label="Email"
          size="small"
          name="email"
          value={userinfo.email}
          onChange={(e) => handleChangeInfo(e, "user")}
          color="green"
          type="email"
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
            required
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
            sx={{ mb: 2 }}
            value={Gstinfo.gst_time || ""}
            onChange={(e) => handleChangeInfo(e, "gst")}
          >
            <FormControlLabel
              value="Monthly"
              label="Monthly"
              labelPlacement="end"
              control={<Radio color="green" />}
            />

            <FormControlLabel
              value="Quaterly"
              label="Quaterly"
              labelPlacement="end"
              control={<Radio color="green" />}
            />

            <FormControlLabel
              value="Yearly"
              label="Yearly"
              labelPlacement="end"
              control={<Radio color="green" />}
            />
          </RadioGroup>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {Gstinfo.gst_time === "Yearly" ? (
              <DatePicker
                orientation="landscape"
                openTo="year"
                views={["year"]}
                value={Gstinfo.period}
                label="Period"
                onChange={(e) => setGstInfo({ ...Gstinfo, period: e })}
                renderInput={(params) => (
                  <TextField
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
                width="inherit"
                openTo="month"
                label="Period"
                views={["year", "month"]}
                value={userinfo.period}
                onChange={(e) => setInfo({ ...Gstinfo, period: e })}
                renderInput={(params) => (
                  <TextField
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
                  value={Gstinfo.period || "Q1"}
                  label="Period"
                  name="period"
                  onChange={(e) => handleChangeInfo(e, "gst")}
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
          <Grid>
            <TextField
              label="Company name"
              size="small"
              color="green"
              name="company_name"
              value={newGstinfo.company_name}
              onChange={(e) => handleChangeInfo(e, "newgst")}
              type="text"
            />
            <TextField
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
          <Grid>
            <TextField
              label="City"
              name="company_city"
              value={"" || userinfo.company_city}
              // onChange={(e) => setInfo({ ...userinfo, company_city: e.target.value})}
              onChange={(e) => handleChangeInfo(e, "newgst")}
              size="small"
              color="green"
              type="text"
            />
            <TextField
              label="Pincode"
              error
              helperText="please enter only numbers"
              name="company_pincode"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={userinfo.company_pincode}
              onChange={(e) => handleChangeInfo(e, "newgst")}
              size="small"
              color="green"
              type="tel"
            />
          </Grid>
          <Grid>
            <TextField
              label="Email"
              name="company_email"
              value={newGstinfo.company_email}
              onChange={(e) => handleChangeInfo(e, "newgst")}
              size="small"
              color="green"
              type="email"
            />
            <TextField
              label="Employer Pan"
              name="employer_pan"
              value={newGstinfo.employer_pan}
              onChange={(e) => handleChangeInfo(e, "newgst")}
              size="small"
              color="green"
              type="email"
            />
          </Grid>
        </>
      ) : userinfo.enquiredfor === "PAN Registration" ? (
        <Grid>
          <TextField
            label="Aadhar Number"
            size="small"
            color="green"
            name="aadhar"
            value={Paninfo.aadhar}
            onChange={(e) => handleChangeInfo(e, "pan")}
            type="text"
          />
        </Grid>
      ) : userinfo.enquiredfor === "TAX Registration" ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid>
            <DatePicker
              orientation="landscape"
              width="inherit"
              openTo="year"
              label="Assessment year"
              views={["year"]}
              value={Taxinfo.assessmentyear}
              onChange={(e) => setInfo({ ...Taxinfo, assessmentyear: e })}
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  helperText={null}
                  fullWidth
                />
              )}
            />
            <TextField
              size="small"
              label="Pan"
              name="pan"
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
      <Button
        sx={{ m: 2 }}
        variant="contained"
        onClick={userInfoPost}
        color="success"
      >
        Submit
      </Button>
    </Grid>
  );
};

