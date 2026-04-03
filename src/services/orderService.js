import apiClient from "./apiClient";

export const createOrder = async (orderData) => {
  const response = await apiClient.post("/orders", orderData);
  return response.data;
};
