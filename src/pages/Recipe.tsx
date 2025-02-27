import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMealById } from "../services/api";

export const Recipe = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: meal,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getMealById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p>Помилка: {error.message}</p>;
  }

  return (
    <div>
      <h1>{meal?.strMeal}</h1>
      <img src={`${meal?.strMealThumb}/medium`} alt={meal?.strMeal} />
      <h3>Категорія: {meal?.strCategory}</h3>
      <h3>Кухня: {meal?.strArea}</h3>
      <h3>Інгредієнти:</h3>
      <ul>
        {Array.from({ length: 20 }).map((_, i) => {
          const ingredient = meal?.[`strIngredient${i + 1}`];
          return ingredient ? <li key={i}>{ingredient}</li> : null;
        })}
      </ul>
      <h3>Інструкції:</h3>
      <p>{meal?.strInstructions}</p>
    </div>
  );
};
