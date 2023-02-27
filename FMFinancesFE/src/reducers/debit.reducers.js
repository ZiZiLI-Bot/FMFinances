import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DebitApi from '../API/Debit.api';

const initialState = {
  id: null,
  homeId: null,
  uid1: null,
  uid2: null,
  billOwnerId: null,
  totalMoney: null,
  createdAt: null,
  updatedAt: null,
  isLoading: false,
};

export const DebitReduces = createSlice({
  name: 'debit',
  initialState,
  extraReducers: (builder) => {
    builder.addCase;
  },
});

export const getAllDebitByUid = createAsyncThunk('debit/getAllDebitByUid', async (data) => {
  const res = await DebitApi.getAllDebitsByUid(data);
});
