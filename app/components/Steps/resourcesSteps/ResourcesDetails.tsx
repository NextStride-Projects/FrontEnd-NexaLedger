import { IResource } from "@/app/utils/interfaces/resources/resources";

interface ResourceDetailsProps {
  resource: IResource | null;
}

export default function ResourceDetails({ resource }: ResourceDetailsProps) {
  if (!resource) {
    return <p className="text-gray-500">No resource data available.</p>;
  }

  console.log(resource);

  return (
    <div>
      <img src={resource.image || "/placeholder.jpg"} alt={resource.name} className="w-32 h-32 object-cover rounded-lg border" />
      <h2 className="text-xl font-semibold">{resource.name}</h2>
      <p>{resource.description}</p>
      <p>Category: {resource.category}</p>
      <p>Available: {resource.available ? "Yes" : "No"}</p>
      <p>Sale Availability: {resource.saleAvailability ? "Yes" : "No"}</p>
      <p>Price: ${resource.price}</p>
      <p>Size: {resource.size}</p>
      <p>Acquired At: {resource.acquiredAt ? new Date(resource.acquiredAt).toLocaleDateString() : "N/A"}</p>
      <p>Last Movement Date: {resource.latesMovementDate ? new Date(resource.latesMovementDate).toLocaleDateString() : "N/A"}</p>
    </div>
  );
}