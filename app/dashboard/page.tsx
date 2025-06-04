import { redirect } from 'next/navigation';
import BookingSummaryCard from '../components/tachmonite/BookingSummaryCard';
import AgentStatusCard from '../components/tachmonite/AgentStatusCard';
import AnalyticsWidget from '../components/tachmonite/AnalyticsWidget';
import ClientOnly from '../ClientOnly';
import prisma from '../libs/prismadb';
import getCurrentUser from '../actions/getCurrentUser';

const Dashboard = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect('/');
  }

  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const [bookingsToday, totalBookings, totalClients, revenueAgg, agents] = await Promise.all([
    prisma.reservation.count({
      where: { startDate: { gte: startOfDay, lte: endOfDay } },
    }),
    prisma.reservation.count(),
    prisma.user.count(),
    prisma.reservation.aggregate({ _sum: { totalPrice: true } }),
    prisma.agent.findMany(),
  ]);

  const revenue = revenueAgg._sum.totalPrice ?? 0;

  return (
    <ClientOnly>
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <BookingSummaryCard count={bookingsToday} />
          <AnalyticsWidget metric="Revenue" value={revenue} />
          <AnalyticsWidget metric="Bookings" value={totalBookings} />
          <AnalyticsWidget metric="Clients" value={totalClients} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {agents.map((a) => (
            <AgentStatusCard
              key={a.id}
              name={a.name}
              status={a.status}
              nextRun={a.nextRun ? a.nextRun.toDateString() : undefined}
            />
          ))}
        </div>
      </div>
    </ClientOnly>
  );
};

export default Dashboard;
