import React from 'react'

interface IUltimosMovimientos {
  id: number;
  date: Date;
  responsible: string;
  reason: string;
  status: string;
}

const LatestMovements = ({ movements }: { movements: IUltimosMovimientos[] }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Latest Movements</h1>
      {movements.length === 0 ? (
        <p>No movements available.</p>
      ) : (
        <div className="space-y-6">
          {movements.map((movement) => (
            <div key={movement.id} className="grid grid-cols-2 gap-4 border-b border-gray-300 pb-4">
              <div>
                <p>
                  <strong>Date:</strong> {new Date(movement.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Responsible:</strong> {movement.responsible}
                </p>
              </div>
              <div>
                <p>
                  <strong>Reason:</strong> {movement.reason}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={movement.status === "Completed" ? "text-green-600" : "text-red-600"}>
                    {movement.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestMovements;