import axios, { AxiosError } from "axios";
import authService from "../authService"; // Assuming authService manages the token

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Transaction {
  id?: string;
  description: string;
  amount: string;
  type: string;
  date?: string;
}

interface ErrorResponse {
  message: string;
}

interface TransactionResponse {
  transactions: Transaction[];
}

const transactionService = {
  getTransactions: async () => {
    try {
      const token = authService.getToken(); // Retrieve the token from authService
      const response = await axios.get<TransactionResponse>(
        `${API_BASE_URL}/transactions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

  createTransaction: async (transaction: Transaction) => {
    try {
      const token = authService.getToken(); // Retrieve the token from authService
      const response = await axios.post(
        `${API_BASE_URL}/transactions/create`,
        transaction,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

  editTransaction: async (transaction: Transaction) => {
    try {
      const token = authService.getToken(); // Retrieve the token from authService
      const response = await axios.put(
        `${API_BASE_URL}/transactions/edit/`,
        transaction,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

  deleteTransaction: async (transactionId: string | undefined) => {
    try {
      const token = authService.getToken(); // Retrieve the token from authService
      await axios.delete(
        `${API_BASE_URL}/transactions/delete/${transactionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response && err.response.data) {
        throw err.response.data;
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  },

  getSummary: async () => {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_BASE_URL}/transactions/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
};

export default transactionService;
