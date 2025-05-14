// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import userListSlice from "../view/user/list/users/store/userListSlice"
import userFilterSlice from "../view/user/list/users/store/userFilterSlice"
import NewsList from "../view/news/store/NewsList"

const rootReducer = { navbar, layout, userListSlice, userFilterSlice,NewsList};

export default rootReducer;
