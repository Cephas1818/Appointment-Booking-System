import ChatWidget from '../components/tachmonite/ChatWidget';

interface Params {
  slug: string;
}

const BusinessSpace = ({ params }: { params: Params }) => {
  const { slug } = params;
  return (
    <div className="p-4">
      <div className="bg-neutral-900 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Business: {slug}</h1>
        <p className="text-gray-400">Our awesome services go here.</p>
      </div>
      <ChatWidget businessSlug={slug} />
    </div>
  );
};

export default BusinessSpace;
