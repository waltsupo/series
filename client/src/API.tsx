import axios from 'axios';

import { history } from './App';
import { APIResponse } from './types';
import useStore from './store';

const baseURL = 'https://localhost/api';

const sendRequest = async (
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE',
  endpoint: string,
  data?: object
): Promise<APIResponse> => {
  const options = {
    url: baseURL + endpoint,
    method,
    data,
  };

  try {
    const response = await axios.request<APIResponse>(options);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Navigate user to login view for authentication
      if (history.location.pathname !== '/login') {
        useStore.getState().setUser(undefined);
        history.push('/login');
      }
      return error.response.data;
    } else {
      return error.response.data;
    }
  }
};

export const loginRequest = async (username: string, password: string): Promise<APIResponse> => {
  return sendRequest('POST', '/auth/login', { username, password });
};

export const checkAuthRequest = async (): Promise<APIResponse> => {
  return sendRequest('GET', '/auth/checkauth');
};

export const logoutRequest = async (): Promise<APIResponse> => {
  return sendRequest('GET', '/auth/logout');
};

export const fetchLatestEpisodes = async (): Promise<APIResponse> => {
  return sendRequest('GET', '/episodes/latest');
};

export const fetchSeries = async (): Promise<APIResponse> => {
  return sendRequest('GET', '/series');
};

export const fetchSingleSeries = async (id: number): Promise<APIResponse> => {
  return sendRequest('GET', `/series/${id}`);
};

export const fetchEpisodesForSeries = async (id: number): Promise<APIResponse> => {
  return sendRequest('GET', `/series/${id}/episodes`);
};
