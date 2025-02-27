import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export const getMeals = async (query: string) => {
  const { data } = await axios.get(`${API_URL}/search.php?s=${query}`);
  return data.meals || [];
};

export const getCategories = async () => {
  const { data } = await axios.get(`${API_URL}/categories.php`);
  return data.categories.map(
    (category: { strCategory: string }) => category.strCategory
  );
};

export const getMealById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/lookup.php?i=${id}`);
  return data.meals ? data.meals[0] : null;
};
