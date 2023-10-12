import { QuizManageAPI } from 'src/services/quizManage';
import { QuizAPI } from 'src/services/quiz';
import { GreenNews } from './../services/greenNews';
import { LoginWarranty } from 'src/services/loginWarranty';
import { Warranty } from 'src/services/warranty';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { HomeAPI } from 'src/services/home';
import TreeReducer from 'src/services/treeAPI';
import { AuthApi } from 'src/services/auth';
import { TreeAPI } from 'src/services/treeAPI';
import { Facebook } from 'src/services/facebook';

export const store = configureStore({
  reducer: {
    Trees: TreeReducer,
    [HomeAPI.reducerPath]: HomeAPI.reducer,
    [Warranty.reducerPath]: Warranty.reducer,
    [LoginWarranty.reducerPath]: LoginWarranty.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [GreenNews.reducerPath]: GreenNews.reducer,
    [TreeAPI.reducerPath]: TreeAPI.reducer,
    [Facebook.reducerPath]: Facebook.reducer,
    [QuizAPI.reducerPath]: QuizAPI.reducer,
    [QuizManageAPI.reducerPath]: QuizManageAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      LoginWarranty.middleware,
      HomeAPI.middleware,
      Warranty.middleware,
      AuthApi.middleware,
      GreenNews.middleware,
      TreeAPI.middleware,
      Facebook.middleware,
      QuizAPI.middleware,
      QuizManageAPI.middleware,
    ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
