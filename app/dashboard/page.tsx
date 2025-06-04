import BookingSummaryCard from '../components/tachmonite/BookingSummaryCard';
import AgentStatusCard from '../components/tachmonite/AgentStatusCard';
import AnalyticsWidget from '../components/tachmonite/AnalyticsWidget';

import getCurrentUser from '../actions/getCurrentUser';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect('/login');
  }
  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <BookingSummaryCard count={5} />
        <AnalyticsWidget metric="Revenue" value={4200} />
        <AnalyticsWidget metric="Bookings" value={12} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AgentStatusCard name="Finance Bot" status="IDLE" nextRun="Tomorrow" />
        <AgentStatusCard name="Marketing Bot" status="RUNNING" nextRun="In 2h" />
        <AgentStatusCard name="Support Bot" status="IDLE" nextRun="In 1h" />
      </div>
    </div>
  );
};

export default Dashboard;
