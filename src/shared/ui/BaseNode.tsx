import { Handle, Position } from 'reactflow';
import { useCardEffect } from '../lib';

type Field = {
  name: string;
  value?: string;
};

type BaseNodeProps = {
  title?: string;
  primaryField?: Field;
  fields?: Field[];
  className?: string;
  source?: boolean;
  target?: boolean;
};

export const BaseNode = ({
  className = '',
  fields,
  primaryField,
  title,
  source,
  target,
}: BaseNodeProps) => {
  const handlers = useCardEffect();

  return (
    <div
      className={`max-w-50 flex flex-col perspective-midrange relative hover:z-50 cursor-pointer text-xs ${className}`}>
      <div
        {...handlers}
        className={`group relative rounded-md shadow-2xl shadow-black bg-gray-600 p-4 text-yellow-200 transition-transform ease-out cursor-pointer hover:transform-[rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.05)]`}>
        {target && <Handle type="target" position={Position.Top} id="target" />}
        {primaryField && (
          <div>
            <h4 className="text-sm font-bold mb-2">{title}</h4>
            <p className="flex rounded-sm border border-current mb-3 px-1 py-px text-[9px] uppercase">
              {primaryField?.name ?? ''}:
              <span className="-my-px mx-1 inline-block w-4 border-l border-r border-current bg-[repeating-linear-gradient(-45deg,currentColor,currentColor_1px,transparent_1px,transparent_2px)]" />{' '}
              {primaryField?.value ?? '—'}
            </p>
          </div>
        )}
        <div className="text-xs font-light border-l pl-1 text-sky-100">
          {fields?.map((field) => (
            <div key={field.name}>
              {field.name}: {field.value ?? '—'}
            </div>
          ))}
        </div>
        {source && <Handle type="source" position={Position.Bottom} id="source" />}
      </div>
    </div>
  );
};

export default BaseNode;
