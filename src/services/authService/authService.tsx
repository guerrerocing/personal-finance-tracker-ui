import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AuthResponse {
  token: string;
}

interface ErrorResponse {
  message: string;
}

const authService = {
  register: async (userData: {
    username: string;
    password: string;
  }): Promise<AuthResponse> => {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/users/register`,
        userData
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response && err.response.data) {
        throw err.response.data;
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  },

  login: async (credentials: {
    username: string;
    password: string;
  }): Promise<AuthResponse> => {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/users/login`,
        credentials
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response && err.response.data) {
        throw err.response.data;
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  },

  saveToken: (token: string) => {
    localStorage.setItem("jwtToken", token);
  },

  getToken: (): string | null => {
    return localStorage.getItem("jwtToken");
  },

  logout: () => {
    localStorage.removeItem("jwtToken");
  },
};

export default authService;
