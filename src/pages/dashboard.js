import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ListingTable from '../components/ListingTable';
import FeedbackToast from '../components/FeedbackToast';

import axios from 'axios';
import { FaCarSide } from 'react-icons/fa';

export default function Dashboard({ listings }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      router.push('/');
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1e1e1e] via-yellow-500 to-[#1e1e1e] text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <FaCarSide className="text-3xl text-orange-400" />
          CarOneX Admin Dashboard
        </h1>
        <div className='flex gap-x-4 flex-row'>
        <button
        onClick={() => router.push('/audit')}
        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white font-semibold"
      >
        Audit
      </button>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium transition"
        >
          Logout
        </button>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl">
        <ListingTable initialListings={listings} />
      </div>
     
      <FeedbackToast />
    </div>
  );
}

export async function getServerSideProps(context) {
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = context.req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  try {
    const res = await axios.get(`${baseUrl}/api/listings`);
    return {
      props: {
        listings: res.data.listings,
        
      },
    };
  } catch (error) {
    console.error('Error fetching listings:', error.message);
    return {
      props: {
        listings: [],
      },
    };
  }
}
