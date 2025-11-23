import { useParams } from 'react-router';
import { ErrorMessage } from '../../../shared/ui';
import useHeroDetails from '../lib/useHeroDetails';
import GraphView from './GraphView';

export const HeroDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { nodes, edges, loading, error, person: hero } = useHeroDetails(id);

  if (loading) return <div className="p-6">Loading details...</div>;
  if (error) return <ErrorMessage message={error.message} />;

  if (!hero) return <div className="p-6">No hero selected</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{hero.name} — Graph View</h2>
      <div className="flex gap-4 items-start">
        <div className="flex-1 min-w-[480px]">
          <GraphView nodes={nodes} edges={edges} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default HeroDetails;
