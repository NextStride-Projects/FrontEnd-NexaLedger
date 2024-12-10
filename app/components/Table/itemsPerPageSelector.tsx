"use client";

interface ItemsPerPageSelectorProps {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  setCurrentPage: (page: number) => void;
}

export default function ItemsPerPageSelector({
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
}: ItemsPerPageSelectorProps) {
  return (
    <label className="text-sm text-gray-700">
      Elementos por página:
      <select
        value={itemsPerPage}
        onChange={(e) => {
          setItemsPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
        className="ml-2 p-2 border rounded"
      >
        <option value={1}>1</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>
    </label>
  );
}