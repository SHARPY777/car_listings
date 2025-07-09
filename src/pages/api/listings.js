import { listings as initialListings } from './data';

let currentListings = [...initialListings];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ listings: currentListings });
  }

  if (req.method === 'POST') {
    const { id, action, updatedTitle, brand, model, year, price, location, performedBy } = req.body;

    currentListings = currentListings.map((item) => {
      if (item.id === id) {
        const updated = {
          ...item,
          ...(action === 'edit' && { title: updatedTitle, brand, model, year, price, location }),
          ...(action === 'approve' || action === 'reject' ? { status: action } : {}),
          actionBy: performedBy || 'admin',
          actionAt: new Date().toISOString(),
        };
        return updated;
      }
      return item;
    });

    return res.status(200).json({ message: 'Update successful', listings: currentListings });
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
