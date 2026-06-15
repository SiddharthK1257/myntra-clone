import axios from "axios";

const API = "https://myntra-clone-pp8m.onrender.com/api/cart";

export const addToCart = (userId, productId) =>
  axios.post(`${API}/add`, {
    userId,
    productId
  });

export const saveForLater = (userId, productId) =>
  axios.post(`${API}/save`, {
    userId,
    productId
  });

export const moveToCart = (userId, productId) =>
  axios.post(`${API}/move`, {
    userId,
    productId
  });

export const getCart = userId =>
  axios.get(`${API}/${userId}`);