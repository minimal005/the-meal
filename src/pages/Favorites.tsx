import { useQuery } from "@tanstack/react-query";
import { getMealById } from "../services/api";
import { Link } from "react-router-dom";

type Props = {
  selectedMealIds: string[];
};

export const Favorites: React.FC<Props> = ({ selectedMealIds }) => {
  const { data: meals, isLoading } = useQuery({
    queryKey: ["selectedMeals", selectedMealIds],
    queryFn: async () => Promise.all(selectedMealIds.map(getMealById)),
    enabled: selectedMealIds.length > 0,
  });

  if (isLoading) return <p>Завантаження...</p>;

  const ingredients = meals?.reduce((acc, meal) => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient?.trim()) {
        acc[ingredient] = (acc[ingredient] || 0) + 1;
      }
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h2>Обрані рецепти:</h2>
      {meals?.map((meal) => (
        <div key={meal.idMeal}>
          <h3 className="text-lg font-bold">
            <Link
              to={`/recipe/${meal.idMeal}`}
              className="text-blue-600 hover:underline"
            >
              {meal.strMeal}
            </Link>
          </h3>

          <img src={`${meal.strMealThumb}/medium`} alt={meal.strMeal} />
        </div>
      ))}
      <h3>Загальний список інгредієнтів:</h3>
      <ul>
        {Object.entries(ingredients || {}).map(([name, count]) => (
          <li key={name}>
            {name}: {count as number}
          </li>
        ))}
      </ul>
    </div>
  );
};
