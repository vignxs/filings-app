export const getRequests = async (dispatch) => {
  const result = await fetch("http://localhost:8000/api/v1/req-data-all");
  const content = await result.json();
  if (content) {
    dispatch({ type: "UPDATE_REQUESTS", payload: content });
  }
};
