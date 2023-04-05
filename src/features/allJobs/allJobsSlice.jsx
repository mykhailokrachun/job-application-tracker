import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

const initialFiltersState = {
  search: '',
  searchStatus: 'all', //interview pending declined
  searchType: 'all', // full-time part remote and so on
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
  'allJobs/getAllJobs',
  async (_, thunkAPI) => {
    const { search, searchType, searchStatus, sort, page } =
      thunkAPI.getState().allJobs;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    try {
      const resp = await customFetch.get(url);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);
export const showStats = createAsyncThunk(
  'allJobs/showStats',
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get('/jobs/stats');
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobsState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
        state.numOfPages = action.payload.numOfPages;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.defaultStats;
        state.monthlyApplications = action.payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
