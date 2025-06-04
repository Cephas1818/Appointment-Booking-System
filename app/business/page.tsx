import ClientOnly from '../ClientOnly';
import { redirect } from 'next/navigation';

import getCurrentUser from '@/app/actions/getCurrentUser';
import BusinessClient from './BusinessClient';
import getListings from '../actions/getListings';

const Business = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/');
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
