// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import userListSlice from "../view/user/list/users/store/userListSlice"
import userFilterSlice from "../view/user/list/users/store/userFilterSlice"

const rootReducer = { navbar, layout, userListSlice, userFilterSlice };

export default rootReducer;
