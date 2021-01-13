import UserReducer from "./UserReducer";
import {combineReducers} from "redux";

 const CombinedReducer = combineReducers({user:UserReducer})
export default CombinedReducer;
