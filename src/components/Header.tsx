import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md border border-gray-300 dark:border-gray-600 w-full">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/favicon.png" alt="Logo" className="h-10" />
        </Link>

        <nav className="space-x-6 text-lg font-medium">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/favorites" className="hover:underline">
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
};
