import BookingsClient from './BookingsClient';
import ClientOnly from '../ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import { redirect } from 'next/navigation';

const BookingsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect('/');
  }

  const bookings = await getReservations({ authorId: currentUser.id });

  return (
    <ClientOnly>
      <BookingsClient bookings={bookings} />
    </ClientOnly>
  );
};

export default BookingsPage;
