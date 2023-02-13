import { Action as ReduxAction, combineReducers } from "redux";
import authReducer from "../action/auth.action";
import claimReducer from "../action/claim.action";
import statusWalletEditReducer from "../action/statusEditWallet";
import resendEmailReducer from "./../action/resend-email";
import statusEmailEditReducer from "./../action/statusEditEmail";
import statusFullNameEditReducer from "./../action/statusEditFullName";
import statusTokenAmountEditReducer from "./../action/statusEditTokenAmount";
import msgErrTokenAmountEditReducer from "./../action/msgErrorToken";
import ggAuthReducer from "./../action/ggAuth.action";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "..";

export interface IAction<T> extends ReduxAction {
  payload?: T;
}
const appReducer = combineReducers({
  authReducer,
  claimReducer,
  resendEmailReducer,
  statusFullNameEditReducer,
  statusEmailEditReducer,
  statusWalletEditReducer,
  statusTokenAmountEditReducer,
  msgErrTokenAmountEditReducer,
  ggAuthReducer,
});

const rootReducer = (state: any, action: IAction<any>) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default rootReducer;
