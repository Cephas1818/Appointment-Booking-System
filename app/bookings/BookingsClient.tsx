'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { SafeReservation } from '../types';

interface BookingsClientProps {
  bookings: SafeReservation[];
}

const statusColors: Record<string, string> = {
  CONFIRMED: 'bg-green-600',
  PENDING: 'bg-yellow-500',
  CANCELLED: 'bg-red-600',
};

const BookingsClient: React.FC<BookingsClientProps> = ({ bookings }) => {
  const router = useRouter();
  const [processingId, setProcessingId] = useState('');
  const [editId, setEditId] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('');

  const onCancel = (id: string) => {
    setProcessingId(id);
    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Cancelled');
        router.refresh();
      })
      .catch(() => toast.error('Error'))
      .finally(() => setProcessingId(''));
  };

  const onReschedule = (id: string) => {
    setProcessingId(id);
    axios
      .patch(`/api/reservations/${id}`, {
        startDate: formDate,
        startTime: formTime,
      })
      .then(() => {
        toast.success('Rescheduled');
        router.refresh();
        setEditId('');
      })
      .catch(() => toast.error('Error'))
      .finally(() => setProcessingId(''));
  };

  return (
    <div className="overflow-x-auto text-white">
      <table className="min-w-full">
        <thead>
          <tr className="bg-neutral-900">
            <th className="p-2 text-left">Client</th>
            <th className="p-2 text-left">Service</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-b border-neutral-800">
              <td className="p-2">{b.user.name}</td>
              <td className="p-2">{b.listing.title}</td>
              <td className="p-2">{new Date(b.startDate).toLocaleDateString()}</td>
              <td className="p-2">{new Date(b.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded text-xs ${statusColors[b.status] || 'bg-gray-600'}`}>{b.status}</span>
              </td>
              <td className="p-2 space-x-2">
                {editId === b.id ? (
                  <>
                    <input
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="bg-neutral-800 rounded p-1 text-sm"
                    />
                    <input
                      type="time"
                      value={formTime}
                      onChange={(e) => setFormTime(e.target.value)}
                      className="bg-neutral-800 rounded p-1 text-sm"
                    />
                    <button
                      disabled={processingId === b.id}
                      onClick={() => onReschedule(b.id)}
                      className="bg-yellow-400 text-black px-2 py-1 rounded text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId('')}
                      className="bg-neutral-700 px-2 py-1 rounded text-xs"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditId(b.id);
                        setFormDate(b.startDate.slice(0, 10));
                        setFormTime(new Date(b.startTime).toISOString().slice(11,16));
                      }}
                      className="bg-neutral-700 px-2 py-1 rounded text-xs"
                    >
                      Reschedule
                    </button>
                    <button
                      disabled={processingId === b.id}
                      onClick={() => onCancel(b.id)}
                      className="bg-red-600 px-2 py-1 rounded text-xs"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsClient;
