/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

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
interface Header extends AxiosRequestConfig {
  headers: {
    "Content-Type": string;
    Accept: string;
    Authorization: string;
  };
}
export const useFetchData = (
  queryKey: (string | number | boolean | undefined | null | any)[],
  url: string,
  headers: Header["headers"],
  onSuccess?: (res: any) => void,
  onError?: (err: any) => void,
  enabled?: boolean
) => {
  const token = "dvasdv";
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}${url}`,
        {
          headers,
        }
      );
      return response.data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!token && enabled,
    onSuccess,
    onError,
  });
};
