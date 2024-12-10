"use client";

interface SortableHeaderProps {
  title: string;
  field: "name" | "size";
  currentSortBy: string;
  currentSortDirection: string;
  onSort: (field: "name" | "size") => void;
}

export default function SortableHeader({
  title,
  field,
  currentSortBy,
  currentSortDirection,
  onSort,
}: SortableHeaderProps) {
  return (
    <th
      className="cursor-pointer px-4 py-2 text-left font-medium"
      onClick={() => onSort(field)}
    >
      {title}{" "}
      {currentSortBy === field && (currentSortDirection === "asc" ? "▲" : "▼")}
    </th>
  );
}