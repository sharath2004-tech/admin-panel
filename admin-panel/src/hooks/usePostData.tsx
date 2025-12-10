/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosProgressEvent,
} from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem("Zulu");
      window.location.href = "/login";
    }

    // reject with error if response status is not 403
    return Promise.reject(error);
  }
);
type MutationOptions = {
  url: string;
  method: AxiosRequestConfig["method"];
  body?: any;
  headers?: AxiosRequestConfig["headers"];
  onSuccess?: (data: AxiosResponse["data"]) => void;
  onError?: (error: any) => void;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
};

const useDynamicMutation = () => {
  const dynamicMutation = useMutation(
    async (options: MutationOptions) => {
      const {
        url,
        method,
        body,
        headers,
        onSuccess,
        onError,
        onUploadProgress,
        onDownloadProgress,
      } = options;
      try {
        const response = await axios.request({
          url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}${url}`,
          method,
          headers,
          data: body,
          onUploadProgress,
          onDownloadProgress,
        });

        if (onSuccess) {
          onSuccess(response.data);
        }

        return response.data;
      } catch (error) {
        if (onError) {
          onError(error);
        }

        throw error;
      }
    },
    {
      retry: false,
    }
  );

  return dynamicMutation;
};

export default useDynamicMutation;
