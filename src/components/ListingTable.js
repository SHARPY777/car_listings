'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useFeedback } from '@/context/FeedBackContext';
import { Check, X, Pencil } from 'lucide-react';

export default function ListingTable({ initialListings = [] }) {
  const [listings, setListings] = useState(initialListings);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 7;
  const { showMessage } = useFeedback();
  const router = useRouter();

  const fetchListings = async () => {
    try {
      const res = await axios.get('/api/listings');
      setListings(res.data.listings);
    } catch (error) {
      console.error('Failed to fetch listings:', error.message);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.post('/api/listings', { id, action });
      await fetchListings();
      showMessage(`Listing ${action}d successfully`);
    } catch (error) {
      console.error(`Failed to ${action} listing:`, error.message);
      showMessage(`Failed to ${action} listing`);
    }
  };

  const filteredListings =
    filter === 'all'
      ? listings
      : listings.filter((item) => item.status === filter);

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filteredListings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );
  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
     <div className="flex justify-between items-center mb-4">
  <h2 className="text-xl font-bold text-white">Car Listings</h2>

  <select
    className="bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition placeholder-white"
    value={filter}
    onChange={(e) => {
      setFilter(e.target.value);
      setCurrentPage(1);
    }}
  >
    <option className="bg-black text-white" value="all">All</option>
    <option className="bg-black text-white" value="pending">Pending</option>
    <option className="bg-black text-white" value="approve">Approved</option>
    <option className="bg-black text-white" value="reject">Rejected</option>
  </select>
</div>


     <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
  <thead>
  <tr className="bg-gray-200 text-gray-700 text-center">
    <th className="p-2">ID</th>
    <th className="p-2">Title</th>
    <th className="p-2">Brand</th>
    <th className="p-2">Model</th>
    <th className="p-2">Year</th>
    <th className="p-2">Price</th>
    <th className="p-2">Location</th>
    <th className="p-2">Status</th>
    <th className="p-2">Actions</th>
  </tr>
</thead>

  <tbody className="bg-white/10 text-white text-sm">
    {currentListings.length === 0 ? (
      <tr>
        <td colSpan="4" className="p-6 text-center text-gray-300">
          No listings found
        </td>
      </tr>
    ) : (
      currentListings.map((item) => (
        <tr
          key={item.id}
          className="text-center border-b border-white/10 hover:bg-white/5 transition"
        >
          <td className="p-3">{item.id}</td>
          <td className="p-3">{item.title}</td>
          
      <td className="p-2 ">{item.brand}</td>
      <td className="p-2 ">{item.model}</td>
      <td className="p-2 ">{item.year}</td>
      <td className="p-2 ">${item.price}</td>
      <td className="p-2 ">{item.location}</td>
          <td className="p-3 capitalize">{item.status}</td>
          <td className="p-3 flex justify-center gap-3">
            <button
              onClick={() => handleAction(item.id, 'approve')}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-full text-white transition text-xs font-medium"
              title="Approve"
            >
              <Check size={14} /> Approve
            </button>
            <button
              onClick={() => handleAction(item.id, 'reject')}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-full text-white transition text-xs font-medium"
              title="Reject"
            >
              <X size={14} /> Reject
            </button>
            <button
              onClick={() => router.push(`/edit/${item.id}`)}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-full text-white transition text-xs font-medium"
              title="Edit"
            >
              <Pencil size={14} /> Edit
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

      <div className="flex justify-between mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? 'bg-gray-300  text-black'
              : 'bg-blue-500 text-black hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        <span className="self-center">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages || totalPages === 0
              ? 'bg-gray-300  text-black'
              : 'bg-blue-500 text-black hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
