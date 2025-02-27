import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="bg-primary-950 text-primary-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};
