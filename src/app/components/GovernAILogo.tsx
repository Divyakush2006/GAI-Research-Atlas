import { ImageWithFallback } from './figma/ImageWithFallback';
import governAILogo from '@/imports/image.png';

interface GovernAILogoProps {
  className?: string;
}

export function GovernAILogo({ className = 'h-7 w-auto' }: GovernAILogoProps) {
  return (
    <ImageWithFallback
      src={governAILogo}
      alt="GovernAI logo"
      className={`${className} object-contain`}
    />
  );
}
