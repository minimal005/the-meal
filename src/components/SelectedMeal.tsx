import { useQuery } from "@tanstack/react-query";
import { getMealById } from "../services/api";

type Props = {
  selectedMealIds: string[];
};

export const SelectedMeals: React.FC<Props> = ({ selectedMealIds }) => {
  const { data: meals } = useQuery({
    queryKey: ["selectedMeals", selectedMealIds],
    queryFn: async () => Promise.all(selectedMealIds.map(getMealById)),
    enabled: selectedMealIds.length > 0,
  });

  const ingredients = meals?.reduce((acc, meal) => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient) {
        acc[ingredient] = (acc[ingredient] || 0) + 1;
      }
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h2>Обрані рецепти:</h2>
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
