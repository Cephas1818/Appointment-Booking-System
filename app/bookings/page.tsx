const BookingsPage = () => {
  const bookings = [
    { id: 1, client: 'Alice', service: 'Cut', date: '2025-01-01', status: 'CONFIRMED' },
    { id: 2, client: 'Bob', service: 'Color', date: '2025-01-02', status: 'PENDING' },
  ];
  return (
    <div className="p-4">
      <table className="min-w-full text-white">
        <thead>
          <tr className="bg-neutral-900">
            <th className="p-2 text-left">Client</th>
            <th className="p-2 text-left">Service</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-b border-neutral-800">
              <td className="p-2">{b.client}</td>
              <td className="p-2">{b.service}</td>
              <td className="p-2">{b.date}</td>
              <td className="p-2">{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsPage;
