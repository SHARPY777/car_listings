'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useFeedback } from '@/context/FeedBackContext';
import axios from 'axios';

export default function EditPage() {
  const router = useRouter();
  const { query } = useRouter();
  const id = query.id;
  const { showMessage } = useFeedback();
  const [listing, setListing] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get('/api/listings');
        const found = res.data.listings.find((item) => item.id === parseInt(id));
        if (found) {
          setListing(found);
          setNewTitle(found.title);
          setBrand(found.brand);
          setModel(found.model);
          setYear(found.year);
          setPrice(found.price);
          setLocation(found.location);
        } else {
          alert('Listing not found');
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('Error fetching listing:', err);
        showMessage('Error loading listing');
      }
    };
    if (id) fetchListing();
  }, [id]);

  if (!listing) return <div className="p-8 text-white">Loading...</div>;

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/listings', {
        id: listing.id,
        action: 'edit',
        updatedTitle: newTitle,
        brand,
        model,
        year,
        price,
        location,
      });
      showMessage('Listing updated successfully');
      router.push('/dashboard');
    } catch (err) {
      console.error('Update failed:', err);
      showMessage('Update failed');
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1e1e1e] via-yellow-500 to-[#1e1e1e]">
  <form
    onSubmit={handleUpdate}
    className="bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl shadow-2xl w-full max-w-xl"
  >
    <h1 className="text-2xl font-bold mb-6 text-center">Edit Listing</h1>

    {/* Title */}
    <label className="block mb-1 font-semibold">Title</label>
    <input
      className="w-full mb-4 p-3 bg-white/20 border border-white/30 rounded text-white placeholder-gray-200"
      type="text"
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      placeholder="Enter updated title"
      required
    />

    {/* Row: Brand + Location */}
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block mb-1 font-semibold">Brand</label>
        <input
          className="w-full p-3 bg-white/20 border border-white/30 rounded text-white placeholder-gray-200"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Location</label>
        <input
          className="w-full p-3 bg-white/20 border border-white/30 rounded text-white placeholder-gray-200"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
      </div>
    </div>

    {/* Row: Model + Year */}
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block mb-1 font-semibold">Model</label>
        <input
          className="w-full p-3 bg-white/20 border border-white/30 rounded text-white placeholder-gray-200"
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Year</label>
        <input
          className="w-full p-3 bg-white/20 border border-white/30 rounded text-white placeholder-gray-200"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          required
        />
      </div>
    </div>

    {/* Row: Price */}
    <div className="mb-6">
      <label className="block mb-1 font-semibold">Price ($)</label>
      <input
        className="w-full p-3 bg-white/20 border border-white/30 rounded text-white placeholder-gray-200"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
    </div>

    {/* Buttons */}
    <button
      type="submit"
      className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded text-white font-semibold mb-4"
    >
      Update
    </button>

    <button
      type="button"
      onClick={() => router.push('/dashboard')}
      className="w-full bg-red-500 hover:bg-red-600 py-2 rounded text-white font-semibold"
    >
      Cancel
    </button>
  </form>
</div>

  );
}
