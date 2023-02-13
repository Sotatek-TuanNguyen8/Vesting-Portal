import { Action as ReduxAction, combineReducers } from "redux";
import authAction from "../action/auth.action";
import claimAction from "../action/claim.action";
import statusWalletEditAction from "../action/statusEditWallet";
import resendEmail from "./../action/resend-email";
import statusEmailEditAction from "./../action/statusEditEmail";
import statusFullNameEditAction from "./../action/statusEditFullName";
import statusTokenAmountEditAction from "./../action/statusEditTokenAmount";
import msgErrTokenAmountEditAction from "./../action/msgErrorToken";

export interface IAction<T> extends ReduxAction {
  payload?: T;
}
const appReducer = combineReducers({
  authAction,
  claimAction,
  resendEmail,
  statusFullNameEditAction,
  statusEmailEditAction,
  statusWalletEditAction,
  statusTokenAmountEditAction,
  msgErrTokenAmountEditAction,
});

const rootReducer = (state: any, action: IAction<any>) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
