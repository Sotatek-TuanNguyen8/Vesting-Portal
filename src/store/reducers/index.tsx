import { combineReducers } from "redux";
import { Action as ReduxAction } from "redux";
import authAction from "../action/auth.action";
import resendEmail from "./../action/resend-email";
export interface IAction<T> extends ReduxAction {
  payload?: T;
}
const appReducer = combineReducers({
  authAction,
  resendEmail,
});

const rootReducer = (state: any, action: IAction<any>) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
