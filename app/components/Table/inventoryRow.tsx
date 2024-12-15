"use client";

import { IResource } from "@/app/utils/interfaces/resources/resources";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface InventoryRowProps {
  item: IResource;
  index: number;
}

export default function InventoryRow({ item, index }: InventoryRowProps) {
  return (
    <tr
      className={`hover:bg-gray-200 ${
        index % 2 === 0 ? "bg-gray-100" : "bg-white"
      }`}
    >
      <td className="px-4 py-2 text-gray-900">{item.name}</td>
      <td className="px-4 py-2 text-gray-900">{item.description}</td>
      <td className="px-4 py-2 text-gray-900">
        {item.available ? "Sí" : "No"}
      </td>
      <td className="px-4 py-2 text-gray-900">{item.size}</td>
      <td className="px-4 py-2 text-gray-900">{item.category}</td>
      <td className="px-4 py-2 text-right">
        <Link
          href={`/resources/${item.id}`}
          className="text-primaryColor hover:text-gray-700"
        >
          <FaArrowRight className="inline-block" />
        </Link>
      </td>
    </tr>
  );
}