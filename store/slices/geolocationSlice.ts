import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '..';

export interface GeolocationState {
  geolocation: any;
}

const initialState: GeolocationState = {
  geolocation: null,
};

export const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.geolocation = action.payload;
      // state.location=state.location
    },
  },
});

// Actions creators are generated for each case reducer function
export const { setLocation } = geolocationSlice.actions;
export const selectGeolocationState = (state: AppState) =>
  state.geolocation.geolocation;

export default geolocationSlice.reducer;
