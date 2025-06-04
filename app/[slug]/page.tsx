import ChatWidget from '../components/tachmonite/ChatWidget';
import prisma from '../libs/prismadb';

interface Params {
  slug: string;
}

const BusinessSpace = async ({ params }: { params: Params }) => {
  const { slug } = params;
  const business = await prisma.business.findUnique({
    where: { slug },
    include: { services: true },
  });

  if (!business) {
    return <div className="p-4 text-white">Business not found</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="bg-neutral-900 rounded-xl p-6 text-white flex items-center gap-4">
        {business.avatarUrl && (
          <img src={business.avatarUrl} alt={business.name} className="w-16 h-16 rounded-full" />
        )}
        <div>
          <h1 className="text-2xl font-bold mb-1">{business.name}</h1>
          {business.tagline && <p className="text-sm text-gray-400">{business.tagline}</p>}
        </div>
      </div>
      <div className="bg-neutral-900 rounded-xl p-4 text-white">
        <h2 className="text-lg font-semibold mb-2">Services</h2>
        <ul className="space-y-1">
          {business.services.map((s) => (
            <li key={s.id} className="flex justify-between">
              <span>{s.name}</span>
              <span>${s.price}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-neutral-900 rounded-xl p-4 text-white">
        <h2 className="text-lg font-semibold mb-2">Book a service</h2>
        <form className="space-y-2">
          <input type="date" className="w-full bg-neutral-800 p-1 rounded" />
          <input type="time" className="w-full bg-neutral-800 p-1 rounded" />
          <button type="submit" className="bg-yellow-400 text-black px-3 py-1 rounded">Submit</button>
        </form>
      </div>
      <ChatWidget businessSlug={slug} />
    </div>
  );
};

export default BusinessSpace;
