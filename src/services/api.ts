import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1";
// const MEALS_PER_PAGE = 10;

// export const getMeals = async (page: number) => {
//   const { data } = await axios.get(`${API_URL}/search.php?s=${query}`);

//   const totalPages = Math.ceil(data.meals.length / MEALS_PER_PAGE);

//   return {
//     meals: data.meals.slice((page - 1) * MEALS_PER_PAGE, page * MEALS_PER_PAGE),
//     totalPages,
//   };
// };

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
