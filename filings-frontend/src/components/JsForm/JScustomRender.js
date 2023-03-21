import moment from "moment";

function isEndDateClose(endDate) {
  const twoDaysFromNow = moment().add(2, "days");
  return moment(endDate).isSameOrBefore(twoDaysFromNow);
}

export function renderEndDateCell(params) {
  const endDate = params.value;
  console.log(params);
  const isClose = isEndDateClose(endDate);
  const cellStyle = isClose
    ? {
        backgroundColor: "#ff000036",
        padding: "10px",
        color: "red",
        borderRadius: "5px",
        fontWeight: "bold",
      }
    : {};
  // if(isClose){
  //     window.confrim(`the follow up date is coming near for` )
  // }

  return <div style={cellStyle}>{endDate}</div>;
}
