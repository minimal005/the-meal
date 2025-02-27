import { useQuery } from "@tanstack/react-query";
import { getMealById } from "../services/api";
import { Meal } from "../types/meal";
import { MealCard } from "../components/MealCard";

type Props = {
  selectedMeals: Meal[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
};

export const Favorites: React.FC<Props> = ({
  selectedMeals,
  setSelectedMeals,
}) => {
  const { data: meals, isLoading } = useQuery({
    queryKey: ["selectedMeals", selectedMeals.map((meal) => meal.idMeal)],
    queryFn: async () =>
      Promise.all(selectedMeals.map((meal) => getMealById(meal.idMeal))),
    enabled: selectedMeals.length > 0,
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
        <div className="flex flex-wrap gap-6 justify-center flex-1">
          {meals?.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
              selectedMeals={selectedMeals}
              setSelectedMeals={setSelectedMeals}
              fixedHeight={true}
            />
          ))}
        </div>

        <div className="lg:w-1/3 xl:w-1/4 bg-zinc-700 p-4 rounded-md shadow-md text-zinc-200">
          <h3 className="text-xl font-bold">General list of ingredients:</h3>
          <ul className="mt-3 divide-y divide-zinc-500">
            {Object.entries(ingredients || {}).map(([name, count]) => (
              <li key={name} className="text-lg py-2">
                {name}: {count as number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
