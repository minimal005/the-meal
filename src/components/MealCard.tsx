import { Link } from "react-router-dom";
import { Meal } from "../types/meal";

type Props = {
  meal: Meal;
  selectedMeals: Meal[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  fixedHeight?: boolean; // Додаємо пропс для контролю висоти
};

export const MealCard: React.FC<Props> = ({
  meal,
  selectedMeals,
  setSelectedMeals,
  fixedHeight = false, // За замовчуванням висота не фіксована
}) => {
  const isSelected = selectedMeals.some(
    (currentMeal) => currentMeal.idMeal === meal.idMeal
  );

  const handleSelect = () => {
    setSelectedMeals((prev) =>
      isSelected
        ? prev.filter((currentMeal) => currentMeal.idMeal !== meal.idMeal)
        : [...prev, meal]
    );
  };

  return (
    <div
      className={`border rounded-lg overflow-hidden shadow-md bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col ${
        fixedHeight ? "h-[300px]" : "h-auto"
      }`}
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold flex-grow flex items-center justify-center text-center">
          <Link
            to={`/recipe/${meal.idMeal}`}
            className="text-blue-600 hover:underline"
          >
            {meal.strMeal}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 text-center">
          {meal.strCategory} • {meal.strArea}
        </p>

        <div className="mt-3 flex items-center justify-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelect}
            className="w-5 h-5 accent-blue-600"
          />
          <span className="ml-2 text-sm">Add to favorites</span>
        </div>
      </div>
    </div>
  );
};
