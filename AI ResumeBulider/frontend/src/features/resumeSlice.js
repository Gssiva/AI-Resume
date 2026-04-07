import { createSlice } from '@reduxjs/toolkit';
import {
  getResumeData,
  updateResumeData,
  generateResumePDF
} from './actions/resumeAction';

const initialState = {
  resumeData: {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    skills: [],
    education: [],
    experience: [],
    projects: []
  },
  isLoading: false,
  error: null,
  pdfGenerating: false
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    resetResume: (state) => {
      state.error = null;
      state.isLoading = false;
      state.pdfGenerating = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Resume Data
      .addCase(getResumeData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getResumeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resumeData = action.payload;
        state.error = null;
      })
      .addCase(getResumeData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Resume Data
      .addCase(updateResumeData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateResumeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resumeData = action.payload.data;
        state.error = null;
      })
      .addCase(updateResumeData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Generate PDF
      .addCase(generateResumePDF.pending, (state) => {
        state.pdfGenerating = true;
        state.error = null;
      })
      .addCase(generateResumePDF.fulfilled, (state) => {
        state.pdfGenerating = false;
        state.error = null;
      })
      .addCase(generateResumePDF.rejected, (state, action) => {
        state.pdfGenerating = false;
        state.error = action.payload;
      });
  }
});

export const { resetResume } = resumeSlice.actions;
export default resumeSlice.reducer;
