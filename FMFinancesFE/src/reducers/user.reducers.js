import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthApi from '../API/Auth.api';
import AuthStorage from '../helper/AuthStorage';
import signInWithGoogle from '../helper/Firebase/GoogleLogin';

const initialState = {
  id: null,
  email: null,
  username: null,
  phoneNumber: null,
  avatar: null,
  isLoading: false,
  isLogin: false,
};

export const UserReduces = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.isLogin = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.id = action.payload?.id;
        state.email = action.payload?.email;
        state.username = action.payload?.username;
        state.phoneNumber = action.payload?.phoneNumber;
        state.avatar = action.payload?.avatar;
        state.isLoading = false;
        state.isLogin = true;
      })
      .addCase(googleLogin.rejected, (state) => {
        state.isLoading = false;
        state.isLogin = false;
      })
      .addCase(loginWithJWT.pending, (state) => {
        state.isLoading = true;
        state.isLogin = false;
      })
      .addCase(loginWithJWT.fulfilled, (state, action) => {
        state.id = action.payload?.id;
        state.email = action.payload?.email;
        state.username = action.payload?.username;
        state.phoneNumber = action.payload?.phoneNumber;
        state.avatar = action.payload?.avatar;
        state.isLoading = false;
        state.isLogin = true;
      })
      .addCase(loginWithJWT.rejected, (state) => {
        state.isLoading = false;
        state.isLogin = false;
      });
  },
});

export const loginWithJWT = createAsyncThunk('user/login/jwt', async (data) => {
  const res = await AuthApi.loginWithJWT(data);
  if (res.success) {
    AuthStorage.setKey('uid', res.data._id);
    const data = {
      id: res.data._id,
      ...res.data,
    };
    return data;
  }
});

export const googleLogin = createAsyncThunk('user/login/google', async () => {
  const user = await signInWithGoogle();
  const userData = {
    username: user.user.displayName,
    email: user.user.email,
    avatar: user.user.photoURL,
    password: user.user.uid.slice(0, 12),
  };
  const checkUser = await AuthApi.getUserByEmail(userData);
  if (checkUser.success || checkUser.data?.length > 0) {
    const res = await AuthApi.login(userData);
    if (res.success) {
      const infoData = {
        id: res.data._id,
        ...userData,
      };
      AuthStorage.setKey('token', res.data.token);
      AuthStorage.setKey('uid', res.data._id);
      return infoData;
    }
  } else {
    const res = await AuthApi.register(userData);
    if (res.success) {
      const login = await AuthApi.login(userData);
      if (login.success) {
        const infoData = {
          id: login.data._id,
          ...userData,
        };
        AuthStorage.setKey('token', res.data.token);
        AuthStorage.setKey('uid', res.data._id);
        return infoData;
      }
    }
  }
});
