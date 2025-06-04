codex/implement-google-login-with-nextauth.js
import getCurrentUser from '../actions/getCurrentUser';
import BookingsClient from '../BookingsClient';
import ClientOnly from '../ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import { redirect } from 'next/navigation';

const BookingsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect('/login');
  }

  const bookings = await getReservations({ authorId: currentUser.id });

  return (
    <ClientOnly>
      <BookingsClient bookings={bookings} />
    </ClientOnly>
  );
};

export default BookingsPage;

import BookingsClient from './BookingsClient';
import ClientOnly from '../ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
 master
import { redirect } from 'next/navigation';

const BookingsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
codex/implement-google-login-with-nextauth.js
    redirect('/login');
  }
  const bookings = [
    { id: 1, client: 'Alice', service: 'Cut', date: '2025-01-01', status: 'CONFIRMED' },
    { id: 2, client: 'Bob', service: 'Color', date: '2025-01-02', status: 'PENDING' },
  ];
import BookingsClient from '../BookingsClient';
import ClientOnly from '../ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import { redirect } from 'next/navigation';

const BookingsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect('/login');
  }

  const bookings = await getReservations({ authorId: currentUser.id });

  return (
    <ClientOnly>
      <BookingsClient bookings={bookings} />
    </ClientOnly>
  );
};

export default BookingsPage;

    redirect('/');
  }

  const bookings = await getReservations({ authorId: currentUser.id });

master
  return (
    <ClientOnly>
      <BookingsClient bookings={bookings} />
    </ClientOnly>
  );
};

export default BookingsPage;
