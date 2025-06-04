import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '../ClientOnly';

import getCurrentUser from '@/app/actions/getCurrentUser';
import BusinessClient from './BusinessClient';
import getListings from '../actions/getListings';
import { redirect } from 'next/navigation';

const Business = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/login');
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No Business" subtitle="Have no services" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <BusinessClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Business;
