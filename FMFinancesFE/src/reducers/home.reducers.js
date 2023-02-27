import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HomeApi from '../API/Home.api';

const initialState = {
  AllHomeHaveUser: [],
  id: null,
  name: null,
  members: [],
  avatar: null,
  joinId: null,
  isLoading: false,
  createAt: null,
  updateAt: null,
};

export const HomeReduces = createSlice({
  name: 'home',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getHomeInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHomeInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.members = action.payload.members;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.joinId = action.payload.joinId;
      state.createAt = action.payload.createAt;
      state.updateAt = action.payload.updateAt;
    });
    builder.addCase(getHomeInfo.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const getHomeInfo = createAsyncThunk('home/getHomeInfo', async (uid) => {
  const res = await HomeApi.getHome(uid);
  if (res.success) {
    return res.data;
  }
});

export const getAllHomeHaveUser = createAsyncThunk('home/getAllHomeHaveUser', async (uid) => {
  const res = await HomeApi.getAllHomeByUid(uid);
  if (res.success) {
    return res.data;
  }
});
