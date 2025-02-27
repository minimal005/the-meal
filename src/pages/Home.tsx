import { useQuery } from "@tanstack/react-query";
import { getCategories, getMeals } from "../services/api";
import { Meal } from "../types/meal";
import React, { useCallback, useState } from "react";
import { Pagination } from "../components/Pagination";
import debounce from "lodash.debounce";
import { MealCard } from "../components/MealCard";

import { CategoryFilter } from "../components/CategoryFilter";

const MEALS_PER_PAGE = 10;

type Props = {
  selectedMeals: Meal[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
};
export const Home: React.FC<Props> = ({ selectedMeals, setSelectedMeals }) => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(debounce(setQuery, 300), []);

  const {
    data: meals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meals", query],
    queryFn: () => getMeals(query),
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
      <form>
        <input
          type="text"
          value={query}
          placeholder="Введіть назву страви"
          onChange={(e) => debouncedSearch(e.target.value)}
          className="border p-2 mb-4"
        />
      </form>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {visibledMeals.map((meal) => (
        <MealCard
          key={meal.idMeal}
          meal={meal}
          selectedMeals={selectedMeals}
          setSelectedMeals={setSelectedMeals}
        />
      ))}

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      {/* <SelectedMeals
        selectedMealIds={selectedMeals.map((meal) => meal.idMeal)}
      /> */}
    </div>
  );
};
