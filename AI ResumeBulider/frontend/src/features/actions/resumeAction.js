import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInterceptorsInstance } from '../../config/axiosInterceptors';

// Use the environment variable for the base API URL
const apiBaseUrl = process.env.REACT_APP_API_URL || '';

const getResumeData = createAsyncThunk(
  'resume/getResumeData',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptorsInstance.get(
        `${apiBaseUrl}/api/resume`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const updateResumeData = createAsyncThunk(
  'resume/updateResumeData',
  async ({ section, data }, thunkAPI) => {
    console.log('Resume action called with:', { section, data });
    
    try {
      const response = await axiosInterceptorsInstance.put(
        `${apiBaseUrl}/api/resume`,
        { section, data }
      );
      console.log('Resume update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Resume update error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const generateResumePDF = createAsyncThunk(
  'resume/generateResumePDF',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptorsInstance.post(
        `${apiBaseUrl}/api/resume/generate-pdf`,
        {},
        {
          responseType: 'blob' // Important for file download
        }
      );
      
      // Create download link for HTML file
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/html' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.html');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true, message: 'Resume HTML downloaded successfully' };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export { getResumeData, updateResumeData, generateResumePDF };
