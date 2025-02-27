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

  if (isLoading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Selected recipes:</h2>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
          {meals?.map((meal) => (
            <div
              key={meal.idMeal}
              className="w-72 h-64 border rounded-lg overflow-hidden shadow-md bg-white flex flex-col"
            >
              <h3 className="text-lg font-bold p-3 text-center flex-grow">
                <Link
                  to={`/recipe/${meal.idMeal}`}
                  className="text-blue-600 hover:underline"
                >
                  {meal.strMeal}
                </Link>
              </h3>

              <img
                src={`${meal.strMealThumb}/medium`}
                alt={meal.strMeal}
                className="w-full h-40 object-cover "
              />
            </div>
          ))}
        </div>

        <div className="lg:w-1/3 xl:w-1/4 bg-zinc-700 p-4 rounded-md shadow-md text-zinc-200">
          <h3 className="text-xl font-bold">General list of ingredients:</h3>
          <ul className="mt-3">
            {Object.entries(ingredients || {}).map(([name, count]) => (
              <li key={name} className="text-lg">
                {name}: {count as number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
