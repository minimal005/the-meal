import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-gray-700 text-white shadow-md w-full">
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
