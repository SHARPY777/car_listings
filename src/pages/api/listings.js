import { listings as initialListings } from './data';

let currentListings = [...initialListings]; 

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ listings: currentListings });
  }

  if (req.method === 'POST') {
    const { id, action, updatedTitle, brand, model, year, price, location } = req.body;

    currentListings = currentListings.map((item) => {
      if (item.id === id) {
        if (action === 'edit') {
          return {
            ...item,
            title: updatedTitle,
            brand,
            model,
            year,
            price,
            location,
          };
        }

        if (action === 'approve' || action === 'reject') {
          return { ...item, status: action };
        }
      }

      return item;
    });

    return res.status(200).json({ message: 'Update successful', listings: currentListings });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
