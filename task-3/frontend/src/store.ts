import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import { countersApiSlice } from "./slices/counter-api-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [countersApiSlice.reducerPath]: countersApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(countersApiSlice.middleware);
  },
});

export type AppStore = typeof store;
export type AppRootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  AppRootState,
  unknown,
  Action
>;
