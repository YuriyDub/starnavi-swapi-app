import { type NodeProps } from 'reactflow';
import BaseNode from '../../../shared/ui/BaseNode';

type FilmData = {
  title: string;
  director?: string;
  release_date?: string;
  episode_id?: number;
};

// Film node component for React Flow
export const FilmNode = ({ data }: NodeProps<FilmData>) => {
  return (
    <BaseNode
      title={data.title}
      primaryField={{ name: 'Director', value: data.director }}
      fields={[{ name: 'Release date', value: data.release_date }]}
      target
      source
    />
  );
};

export default FilmNode;
