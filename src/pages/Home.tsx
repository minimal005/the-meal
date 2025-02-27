import { useQuery } from "@tanstack/react-query";
import { getCategories, getMeals } from "../services/api";
import { Meal } from "../types/meal";
import React, { useState } from "react";
import { Pagination } from "../components/Pagination";
import { MealCard } from "../components/MealCard";

import { CategoryFilter } from "../components/CategoryFilter";
import useDebounce from "../utils/useDebounce";

const MEALS_PER_PAGE = 10;

type Props = {
  selectedMeals: Meal[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
};
export const Home: React.FC<Props> = ({ selectedMeals, setSelectedMeals }) => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const debouncedSearch = useDebounce(query, 500);

  const {
    data: meals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meals", debouncedSearch],
    queryFn: () => getMeals(debouncedSearch),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const filteredMeals: Meal[] = selectedCategory
    ? meals?.filter((meal: Meal) => meal.strCategory === selectedCategory)
    : meals;

  const totalPages = Math.ceil(filteredMeals?.length / MEALS_PER_PAGE);
  const visibledMeals: Meal[] = filteredMeals?.slice(
    (page - 1) * MEALS_PER_PAGE,
    page * MEALS_PER_PAGE
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <form className="mb-6">
        <input
          type="text"
          value={query}
          placeholder="Enter the dish..."
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full sm:w-80"
        />
      </form>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex flex-wrap gap-6 justify-center">
        {visibledMeals.map((meal) => (
          <MealCard
            key={meal.idMeal}
            meal={meal}
            selectedMeals={selectedMeals}
            setSelectedMeals={setSelectedMeals}
          />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};
