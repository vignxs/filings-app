


const reducer = ( state, action) => {
    switch (action.type) {
      
      case "DELETE_REQUESTS":
        console.log(action.payload);
        return {
          ...state,
          requests: state.requests.filter(
            (requests) => requests.enq_id !== action.payload
          ),
        };
      case "UPDATE_REQUESTS":
        return {
          ...state,
          requests: action.payload,
        };

      default:
        throw new Error("No action matched");
    }
}

export default reducer