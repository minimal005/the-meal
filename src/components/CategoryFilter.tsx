type Props = {
  categories: string[] | undefined;
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
    <div className="mb-4">
      <label className="font-bold mr-2">Фільтр за категорією:</label>
      <select
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(e.target.value || null)}
        className="border p-2"
      >
        <option value="">Усі категорії</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
