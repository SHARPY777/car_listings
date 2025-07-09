'use client';
import React from 'react';
import { Check, X, Pencil } from 'lucide-react';

const ListingRow = React.memo(function ListingRow({ item, onApprove, onReject, onEdit }) {
  return (
    <tr
      key={item.id}
      className="text-center border-b border-white/10 hover:bg-white/5 transition"
    >
      <td className="p-3">{item.id}</td>
      <td className="p-3">{item.title}</td>
      <td className="p-2">{item.brand}</td>
      <td className="p-2">{item.model}</td>
      <td className="p-2">{item.year}</td>
      <td className="p-2">${item.price}</td>
      <td className="p-2">{item.location}</td>
      <td className="p-3 capitalize">{item.status}</td>
      <td className="p-3 flex justify-center gap-3">
        <button
          onClick={() => onApprove(item.id)}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-full text-white transition text-xs font-medium"
          title="Approve"
        >
          <Check size={14} /> Approve
        </button>
        <button
          onClick={() => onReject(item.id)}
          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-full text-white transition text-xs font-medium"
          title="Reject"
        >
          <X size={14} /> Reject
        </button>
        <button
          onClick={() => onEdit(item.id)}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-full text-white transition text-xs font-medium"
          title="Edit"
        >
          <Pencil size={14} /> Edit
        </button>
      </td>
    </tr>
  );
});

export default ListingRow;
