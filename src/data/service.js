import axios from "axios";
import { useQuery } from "react-query";

export const queryKeys = {
  me: "me",
};

export const API = "https://bootcamp.akbolat.net";

export const Service = {
  me: async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  register: async ({ email, password }) => {
    const res = await axios.post(`${API}/auth/local/register`, {
      username: email,
      email,
      password,
    });
    localStorage.setItem("token", res.data.jwt);
    return res.data;
  },

  login: async ({ email, password }) => {
    const res = await axios.post(`${API}/auth/local`, {
      username: email,
      identifier: email,
      password,
    });
    localStorage.setItem("token", res.data.jwt);
    return res.data;
  },

  getAllProducts: async ({ categoryName }) => {
    const res = await axios.get(
      categoryName
        ? `${API}/products?category.name=${categoryName}`
        : `${API}/products`
    );
    return res.data;
  },

  getAllCategories: async () => {
    const res = await axios.get(`${API}/categories`);
    return res.data;
  },

  getProduct: async (id) => {
    const res = await axios.get(`${API}/products/${id}`);
    return res.data;
  },

  giveOffer: async ({ productId, offerPrice, userId }) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${API}/offers`,
      {
        product: productId,
        offerPrice,
        users_permissions_user: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },

  deleteOffer: async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API}/offers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  buyProduct: async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${API}/products/${id}`,
      {
        isSold: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },

  addProduct: async ({ image, userId, ...form }) => {
    const token = localStorage.getItem("token");
    const formdata = new FormData();

    formdata.append("files.image", image[0].file);
    formdata.append(
      "data",
      JSON.stringify({
        ...form,
        isOfferable: true,
        users_permissions_user: userId,
      })
    );

    const res = await axios.post(`${API}/products`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  getBrands: async () => {
    const res = await axios.get(`${API}/brands`);
    return res.data;
  },

  getColors: async () => {
    const res = await axios.get(`${API}/colors`);
    return res.data;
  },

  getStatus: async () => {
    const res = await axios.get(`${API}/using-statuses`);
    return res.data;
  },

  getOffers: async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/offers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  getGivenOffers: async (userId) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${API}/offers/?users_permissions_user=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },

  getReceivedOffers: async (userId) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${API}/products?users_permissions_user=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },

  updateOffers: async ({ id, offer }) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${API}/offers/${id}`,
      {
        isStatus: offer,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },
};

export function useCategories() {
  return useQuery(["getAllCategories"], Service.getAllCategories);
}
