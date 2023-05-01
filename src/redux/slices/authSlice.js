import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/login", params);
  return data;
});

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async (params) => {
    const { data } = await axios.post("/signUp", params);
    return data;
  }
);

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async () => {
  const { data } = await axios.get("/profile");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchSignUp.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchSignUp.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchSignUp.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchProfile.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchProfile.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectIsAdmin = (state) => Boolean(state.auth.data.accessRights);

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
