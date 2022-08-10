import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

export interface IState {
  rootReducer: any;
}

export const store = configureStore({
  reducer: { rootReducer: rootReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
