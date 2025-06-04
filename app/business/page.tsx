import ClientOnly from '../ClientOnly';
import { redirect } from 'next/navigation';

import getCurrentUser from '@/app/actions/getCurrentUser';
import BusinessClient from './BusinessClient';
import getListings from '../actions/getListings';
import { redirect } from 'next/navigation';

const Business = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
codex/implement-google-login-with-nextauth.js
    redirect('/login');
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
master
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    redirect('/');
  }

  return (
    <ClientOnly>
      <BusinessClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Business;
