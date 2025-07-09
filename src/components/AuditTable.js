export default function AuditTable({ listings }) {
  const sortedListings = [...listings]
    .filter(item => item.actionBy && item.actionAt)
    .sort((a, b) => new Date(b.actionAt) - new Date(a.actionAt));

  if (sortedListings.length === 0) {
    return <p className="text-white">No audit actions recorded yet.</p>;
  }

  return (
    <div className="mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white/10 text-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Action By</th>
              <th className="px-4 py-2 text-left">Action At</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedListings.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.actionBy || '-'}</td>
                <td className="px-4 py-2">
                  {item.actionAt ? new Date(item.actionAt).toLocaleString() : '-'}
                </td>
                <td className="px-4 py-2 capitalize">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
