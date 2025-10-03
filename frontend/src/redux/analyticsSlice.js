import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// async thunks to fetch from backend
export const fetchLocations = createAsyncThunk('analytics/fetchLocations', async () => {
  const res = await api.get('/analytics/locations');
  return res.data;
});
export const fetchDemographics = createAsyncThunk('analytics/fetchDemographics', async () => {
  const res = await api.get('/analytics/demographics');
  return res.data;
});
export const fetchTrialsPerCity = createAsyncThunk('analytics/fetchTrialsPerCity', async () => {
  const res = await api.get('/analytics/trials-per-city');
  return res.data;
});

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    locations: { loading: false, data: [], error: null },
    demographics: { loading: false, data: null, error: null },
    trialsPerCity: { loading: false, data: [], error: null }
  },
  reducers: {},
  extraReducers: builder => {
    // locations
    builder.addCase(fetchLocations.pending, state => { state.locations.loading = true; state.locations.error = null; });
    builder.addCase(fetchLocations.fulfilled, (state, action) => { state.locations.loading = false; state.locations.data = action.payload; });
    builder.addCase(fetchLocations.rejected, (state, action) => { state.locations.loading = false; state.locations.error = action.error.message; });

    // demographics
    builder.addCase(fetchDemographics.pending, state => { state.demographics.loading = true; state.demographics.error = null; });
    builder.addCase(fetchDemographics.fulfilled, (state, action) => { state.demographics.loading = false; state.demographics.data = action.payload; });
    builder.addCase(fetchDemographics.rejected, (state, action) => { state.demographics.loading = false; state.demographics.error = action.error.message; });

    // tials per city
    builder.addCase(fetchTrialsPerCity.pending, state => { state.trialsPerCity.loading = true; state.trialsPerCity.error = null; });
    builder.addCase(fetchTrialsPerCity.fulfilled, (state, action) => { state.trialsPerCity.loading = false; state.trialsPerCity.data = action.payload; });
    builder.addCase(fetchTrialsPerCity.rejected, (state, action) => { state.trialsPerCity.loading = false; state.trialsPerCity.error = action.error.message; });
  }
});

export default analyticsSlice.reducer;
