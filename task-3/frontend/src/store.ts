import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import { counterApiSlice } from "./slices/counter-api-slice";
import { authApiSlice } from "./slices/auth-api-slice";
import { registerApiSlice } from "./slices/register-api-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [counterApiSlice.reducerPath]: counterApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [registerApiSlice.reducerPath]: registerApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      counterApiSlice.middleware,
      authApiSlice.middleware,
      registerApiSlice.middleware,
    );
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
