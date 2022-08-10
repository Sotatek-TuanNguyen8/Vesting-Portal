import { combineReducers } from "redux";
import { Action as ReduxAction } from "redux";

export interface IAction<T> extends ReduxAction {
  payload?: T;
}
const appReducer = combineReducers({});

const rootReducer = (state: any, action: IAction<any>) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
