const UseForm = () => {
  const [open, setOpen] = React.useState(false);
  const [userinfo, setInfo] = React.useState();
  const handleClickOpen = () => {
    setOpen(true);

    const endpoints = {
      GST: "req-service-gst",
      "GST Registration": "req-service-gst-rgst",
      "PAN Registration": "req-service-pan-rgst",
      "TAX Registration": "req-service-tax-rgst",
    };

    const endpoint = endpoints[userinfo.enquired_for];

    if (endpoint) {
      fetch(`http://localhost:8000/api/v1/${endpoint}/${params.row.req_id}`)
        .then((res) => res.json())
        .then((result) => {
          setOutput(result);
          // setInfo(result)
        });
    }
    console.log(output);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <UserInfoForm {...{ params }} setInfo={setInfo} userinfo={userinfo} />
        );
      case 1:
        return (
          <ServiceInfoForm
            userinfo={userinfo}
            output={output}
            setOutput={setOutput}
          />
        );
      case 2:
        return <ServiceFileForm />;
      default:
        break;
    }
  }
  return { handleClickOpen, getStepContent };
};
export default UseForm;
