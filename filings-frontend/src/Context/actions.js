export const getRequests = async (dispatch) => {
  const result = await fetch("http://localhost:8000/enq-data");
  const content = await result.json();
  if (content) {
    console.log(content)
    dispatch({ type: "UPDATE_REQUESTS", payload: content });
  }
};