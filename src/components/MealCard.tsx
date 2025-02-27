import { Link } from "react-router-dom";
import { Meal } from "../types/meal";

type Props = {
  meal: Meal;
  selectedMeals: Meal[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  fixedHeight?: boolean;
};

export const MealCard: React.FC<Props> = ({
  meal,
  selectedMeals,
  setSelectedMeals,
  fixedHeight = false,
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
      className={`relative border rounded-lg overflow-hidden shadow-md bg-white flex flex-col w-[310px] ${
        fixedHeight ? "h-[320px]" : "h-auto"
      }`}
    >
      {/* Сердечко у верхньому правому куті */}
      <label className="absolute top-2 right-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelect}
          className="sr-only peer"
        />
        <span className="w-8 h-8 flex items-center justify-center rounded-full border border-white/70 bg-transparent text-white/70 text-lg transition-all duration-200 peer-checked:bg-red-500 peer-checked:text-white">
          ❤️
        </span>
      </label>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-44 object-cover"
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
      </div>
    </div>
  );
};
