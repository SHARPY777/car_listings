'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AuditTable from '@/components/AuditTable'; 

export default function AuditPage() {
  const [listings, setListings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get('/api/listings');
        setListings(res.data.listings || []);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-yellow-600 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Audit Log</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            Back to Dashboard
          </button>
        </div>
        <AuditTable listings={listings} />
      </div>
    </div>
  );
}
