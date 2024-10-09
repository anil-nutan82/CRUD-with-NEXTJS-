import { useState } from 'react';

export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <ul className="mt-4 space-y-2">
      {products.map((product) => (
        <li key={product.id} className="p-4 border rounded shadow">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p>{product.description}</p>
          <p className="text-gray-500">₹{product.price}</p>
          <div className="flex space-x-2">
            <button
              className="bg-yellow-500 text-white p-2 rounded"
              onClick={() => onEdit(product)} // Trigger edit action
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => onDelete(product.id)} // Trigger delete action
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
