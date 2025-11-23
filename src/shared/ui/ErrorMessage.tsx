import type { FC } from 'react';

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="animate-ping flex gap-3 absolute right-1/2 top-1/2 translate-x-[50%] translate-y-[-50%] text-2xl text-red-700">
      ): {message}
    </div>
  );
};
