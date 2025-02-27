type Props = {
  categories?: string[];
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
};

export const CategoryFilter: React.FC<Props> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  if (!categories) return null;

  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
      <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        Filter by category:
      </label>
      <select
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(e.target.value || null)}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full sm:w-auto"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
