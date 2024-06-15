import axios from "axios";

const apiClient = axios.create({
  maxBodyLength: Infinity,

  baseURL: "https://8rj4lzl7zf.execute-api.us-east-1.amazonaws.com/dev/",
});

export const getPresentationData = async () => {
  const response = await apiClient.get("getPresentationData");
  return response.data;
};

export const getRouteSessionData = async (routeSessionId: string) => {
  const response = await apiClient.get(
    `getRouteSessionDetails/?routeSessionId=${routeSessionId}`
  );
  return response.data;
};
