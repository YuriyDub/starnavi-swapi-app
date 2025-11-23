import { useState, type ImgHTMLAttributes } from 'react';

const DEFAULT_PLACEHOLDER = '/image.png';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc?: string;
}

export const Image: React.FC<ImageProps> = ({
  placeholderSrc = DEFAULT_PLACEHOLDER,
  src,
  alt,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (imgSrc !== placeholderSrc) {
      setImgSrc(placeholderSrc);
    }
  };

  return <img src={imgSrc} alt={alt} onError={handleError} {...rest} />;
};
