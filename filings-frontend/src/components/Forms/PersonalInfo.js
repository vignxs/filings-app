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
import Divider from "@mui/material/Divider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const PersonalInfo = (props) => {
  const [userinfo, setInfo] = React.useState({});
  const periods = ["Monthly", "Quaterly", "Yearly"];
  const quaters = ['Q1', 'Q2', 'Q3', 'Q4']

 
   const handleChangeInfo = (e) => {
    const {name,value}=e.target;
     setInfo((prevalues)=>{
       return { ...prevalues ,
      [name]:value
    };
      });
     console.log(userinfo)
   };

   const userdatapost = ()=>{

   }




function Newgst(params) {
  return (
    <>
      <Grid>
        <TextField
          label="Company name"
          size="small"
          color="green"
          name="company_name"
          value={userinfo.company_name}
          onChange={handleChangeInfo}
          type="text"
        />
        <TextField
          label="Company address"
          multiline
          size="small"
          name="company_address"
          value={userinfo.company_address}
          onChange={handleChangeInfo}
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
          onChange={handleChangeInfo}
          size="small"
          color="green"
          type="text"
        />
        <TextField
          label="Pincode"
          name="company_pincode"
          value={userinfo.company_pincode}
          onChange={handleChangeInfo}
          size="small"
          color="green"
          type="tel"
        />
      </Grid>
      <Grid>
        <TextField
          label="Email"
          name="company_email"
          value={userinfo.company_email}
          onChange={handleChangeInfo}
          size="small"
          color="green"
          type="email"
        />
        <TextField
          label="Employer Pan"
          name="employer_pan"
          value={userinfo.employer_pan}
          onChange={handleChangeInfo}
          size="small"
          color="green"
          type="email"
        />
      </Grid>
    </>
  );
}
function NewPan(params) {
  return (
    <>
      <Grid>
        <TextField
          label="Aadhar Number"
          size="small"
          color="green"
          name="aadhar"
          value={userinfo.aadhar}
          onChange={handleChangeInfo}
          type="text"
        />
      </Grid>
    </>
  );
}

 function Tax(params) {
return (
  <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid>
        <DatePicker
          orientation="landscape"
          width="inherit"
          openTo="year"
          label="Assessment year"
          views={["year"]}
          value={userinfo.assessmentyear}
          onChange={(e) => setInfo({ ...userinfo, assessmentyear: e })}
          renderInput={(params) => (
            <TextField size="small" {...params} helperText={null} fullWidth />
          )}
        />
        <TextField
          size="small"
          label="Pan"
          name="pan"
          value={userinfo.pan}
          onChange={handleChangeInfo}
          type="text"
          id="outlined-textarea"
        />
      </Grid>
    </LocalizationProvider>
  </>
);
 }

  function GST(params) {
    return (
      <>
        <Grid>
          <FormControl sx={{ m: 2, minWidth: "30ch" }} size="small">
            <InputLabel id="demo-1simple-select-label">GST time</InputLabel>
            <Select
              label="GST time"
              labelId="demo-1simple-select-label"
              id="demo-simple-select"
              value={userinfo.gst_time}
              name="gst_time"
              onChange={handleChangeInfo}
            >
              {periods.map((val) => (
                <MenuItem value={val}>{val}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {userinfo.gst_time === "Yearly" ? (
              <DatePicker
                orientation="landscape"
                openTo="year"
                views={["year"]}
                value={userinfo.period}
                label="Period"
                onChange={(e) => setInfo({ ...userinfo, period: e })}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    helperText={null}
                    fullWidth
                  />
                )}
              />
            ) : userinfo.gst_time === "Monthly" ? (
              <DatePicker
                orientation="landscape"
                width="inherit"
                openTo="month"
                label="Period"
                views={["year", "month"]}
                value={userinfo.period}
                onChange={(e) => setInfo({ ...userinfo, period: e })}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    helperText={null}
                    fullWidth
                  />
                )}
              />
            ) : userinfo.gst_time === "Quaterly" ? (
              <FormControl sx={{ m: 2, minWidth: "30ch" }} size="small">
                <InputLabel id="demo-simple-select-label">Period</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userinfo.period || "Q1"}
                  label="Period"
                  name="period"
                  onChange={handleChangeInfo}
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
      </>
    );
  }

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
          onChange={handleChangeInfo}
        />
        <TextField
          label="Last name"
          name="lst_name"
          value={userinfo.lst_name}
          onChange={handleChangeInfo}
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
          onChange={handleChangeInfo}
          size="small"
          color="green"
          type="text"
        />
        <TextField
          label="Address"
          multiline
          name="address"
          value={userinfo.address}
          onChange={handleChangeInfo}
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
          onChange={handleChangeInfo}
          color="green"
          type="text"
        />
        <TextField
          label="Pincode"
          size="small"
          name="pincode"
          value={userinfo.pincode}
          onChange={handleChangeInfo}
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
          onChange={handleChangeInfo}
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
            onChange={handleChangeInfo}
          >
            {services.map((val) => (
              <MenuItem value={val}>{val}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Divider variant="middle" sx={{ m: 2, width: "40%" }} />

      {userinfo.enquiredfor === "GST" ? (
        <GST />
      ) : userinfo.enquiredfor === "GST Registration" ? (
        <Newgst />
      ) : userinfo.enquiredfor === "PAN Registration" ? (
        <NewPan />
      ) : userinfo.enquiredfor === "TAX Registration" ? (
        <Tax />
      ) : (
        false
      )}
      <Button sx={{ m: 2 }} variant="contained" onSubmit={userdatapost()} color="success">
        Submit
      </Button>
    </Grid>
  );
};

