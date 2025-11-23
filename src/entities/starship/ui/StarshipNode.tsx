import { type NodeProps } from 'reactflow';
import BaseNode from '../../../shared/ui/BaseNode';

type StarshipData = {
  id?: number;
  name?: string;
  model?: string;
  starship_class?: string;
  manufacturer?: string;
};

export const StarshipNode = ({ data }: NodeProps<StarshipData>) => {
  return (
    <BaseNode
      title={data.name}
      primaryField={{ name: 'Model', value: data.model }}
      fields={[
        { name: 'Class', value: data.starship_class },
        { name: 'Manufacturer', value: data.manufacturer },
      ]}
			target
    />
  );
};

export default StarshipNode;
