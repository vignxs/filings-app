


const reducer = ( state, action) => {
    switch (action.type) {
      case "DELETE_REQUESTS":
        return {
          ...state,
          requests: state.requests.filter(
            (requests) => requests.req_id !== action.payload
          ),
        };
      case "UPDATE_REQUESTS":
        return {
          ...state,
          requests: action.payload,
        };
      case "OPEN_SIDEBAR":
        return {
          ...state,
          sidebarState: action.payload,
        };
      case "CLOSE_SIDEBAR":
        return {
          ...state,
          sidebarState: action.payload,
        };
      case "LOGGED_IN":
        return {
          ...state,
          isLogged: action.payload,
        };
      case "LOGGED_OUT":
        return {
          ...state,
          isLogged: action.payload,
        };
      case "IS_ADMIN":
        return {
          ...state,
          isAdmin: action.payload,
        };
      case "APPS_ACCESS":
        return {
          ...state,
          apps: action.payload,
        };
      case "CURRENT_USER":
        return {
          ...state,
          currentUser: action.payload,
        };

      default:
        throw new Error("No action matched");
    }
}

export default reducer