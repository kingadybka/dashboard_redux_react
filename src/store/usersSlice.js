import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { API_URL } from "../helpers";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const { data } = await axios.get(API_URL);
  return data;
});

export const fetchUser = createAsyncThunk("fetchUser", async ({ id }) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
});

export const addNewUser = createAsyncThunk("addNewUser", async ({ values }) => {
  const { data } = await axios.post(API_URL, values);
  return data;
});

export const editUser = createAsyncThunk("editUser", async ({ id, values }) => {
  const { data } = await axios.put(`${API_URL}/${id}`, values);
  return data;
});

export const removeUser = createAsyncThunk("removeUser", async ({ id }) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const initialState = {
  data: [],
  user: { name: "", username: "", email: "", address: { city: "" } },
  isLoading: true,
  isError: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    sort: (state, action) => {
      state.data = _.orderBy(state.data, ["username"], [action.payload]);
    },
    clearUser: (state) => {
      state.user = initialState.user;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.isLoading = true;
      state.data = [];
      state.isError = false;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [fetchUsers.rejected]: (state) => {
      state.isLoading = true;
      state.isError = true;
    },
    [addNewUser.pending]: (state) => {
      state.isLoading = true;
    },
    [addNewUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    },
    [addNewUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [fetchUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [fetchUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [editUser.pending]: (state) => {
      state.isLoading = true;
    },
    [editUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = state.data.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
    [editUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [removeUser.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [removeUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((user) => user.id !== action.payload);
    },
    [removeUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { sort, clearUser } = usersSlice.actions;
export default usersSlice.reducer;
