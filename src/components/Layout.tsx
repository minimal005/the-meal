import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="text-red-500 font-bold text-3xl">Тестовий текст</div>
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};
