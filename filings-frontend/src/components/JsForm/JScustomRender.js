import moment from 'moment';

function isEndDateClose(endDate) {
  const twoDaysFromNow = moment().add(2, 'days');
  return moment(endDate).isSameOrBefore(twoDaysFromNow);
}

export function renderEndDateCell(params) {
    const endDate = params.value;
    console.log(params)
    const isClose = isEndDateClose(endDate);
    const cellStyle = isClose ? { backgroundColor: 'red' } : {};
  
    return (
      <div style={cellStyle}>
        {endDate}
      </div>
    );
  }