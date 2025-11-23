import { type NodeProps } from 'reactflow';
import BaseNode from '../../../shared/ui/BaseNode';

type HeroData = {
  name: string;
  birth_year?: string;
  gender?: string;
  height?: string;
  mass?: string;
};

// HeroNode component to display hero information in a node
export const HeroNode = ({ data }: NodeProps<HeroData>) => {
  return (
    <BaseNode
      title={data.name}
      primaryField={{ name: 'Birth year', value: data.birth_year }}
      fields={[
        { name: 'Gender', value: data.gender },
        { name: 'Height', value: data.height },
        { name: 'Mass', value: data.mass },
      ]}
			source
    />
  );
};

export default HeroNode;
