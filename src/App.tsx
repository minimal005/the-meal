import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Recipe } from "./pages/Recipe";
import { Favorites } from "./pages/Favorites";
import { useState } from "react";
import { Meal } from "./types/meal";
import { Layout } from "./components/Layout";

export default function App() {
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Home
              selectedMeals={selectedMeals}
              setSelectedMeals={setSelectedMeals}
            />
          }
        />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route
          path="/favorites"
          element={
            <Favorites
              selectedMeals={selectedMeals}
              setSelectedMeals={setSelectedMeals}
            />
          }
        />
      </Route>
    </Routes>
  );
}
