import { useEffect, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import FilmNode from '../../../entities/film/ui/FilmNode';
import HeroNode from '../../../entities/person/ui/HeroNode';
import StarshipNode from '../../../entities/starship/ui/StarshipNode';
import { ErrorMessage } from '../../../shared/ui';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

type GraphViewProps = {
  nodes: Node[];
  edges: Edge[];
  loading?: boolean;
  error?: Error | null;
};

export const GraphView = ({ nodes, edges, loading = false, error = null }: GraphViewProps) => {
  const nodeTypes = useMemo(() => ({ hero: HeroNode, film: FilmNode, starship: StarshipNode }), []);

  // Manage internal state so nodes are draggable and position updates persist
  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(nodes ?? []);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(edges ?? []);

  // Sync incoming nodes/edges when parent data changes (e.g., different hero)
  useEffect(() => setFlowNodes(nodes ?? []), [nodes, setFlowNodes]);
  useEffect(() => setFlowEdges(edges ?? []), [edges, setFlowEdges]);

  if (loading) return <div className="p-6">Loading graph...</div>;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="w-full h-[90vh] border border-gray-300 rounded-md border-dashed p-2 mb-10">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={(params) => setFlowEdges((eds) => addEdge(params, eds))}
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
};

export default GraphView;
