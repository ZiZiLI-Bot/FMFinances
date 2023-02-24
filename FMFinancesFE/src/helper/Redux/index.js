import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { UserReduces } from '../../reducers/user.reducers';

export default configureStore({
  reducer: {
    user: UserReduces.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});
