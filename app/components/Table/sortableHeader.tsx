"use client";

interface SortableHeaderProps<T extends string> {
  title: string;
  field: T;
  currentSortBy: T;
  currentSortDirection: string;
  onSort: (field: T) => void;
}

export default function SortableHeader<T extends string>({
  title,
  field,
  currentSortBy,
  currentSortDirection,
  onSort,
}: SortableHeaderProps<T>) {
  const handleSortClick = () => {
    onSort(field);
  };

  return (
    <th
      className="cursor-pointer px-4 py-2 text-left font-medium"
      onClick={handleSortClick}
    >
      {title} {currentSortBy === field && (currentSortDirection === "asc" ? "▲" : "▼")}
    </th>
  );
}