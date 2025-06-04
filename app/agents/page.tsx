import AgentStatusCard from '../components/tachmonite/AgentStatusCard';

const AgentsPage = () => {
  const agents = [
    { id: 1, name: 'Finance Bot', status: 'IDLE', nextRun: 'Tomorrow' },
    { id: 2, name: 'Marketing Bot', status: 'RUNNING', nextRun: 'In 2h' },
    { id: 3, name: 'Support Bot', status: 'IDLE', nextRun: 'In 1h' },
  ];
  return (
    <div className="p-4">
      <h1 className="text-xl text-white mb-4">Agents Scheduler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {agents.map((a) => (
          <AgentStatusCard key={a.id} name={a.name} status={a.status} nextRun={a.nextRun} />
        ))}
      </div>
    </div>
  );
};

export default AgentsPage;
