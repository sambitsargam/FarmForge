import React from 'react';
import { HelpCircle } from 'lucide-react';
import Tooltip from './Tooltip';

interface InfoTooltipProps {
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  content,
  position = 'top',
}) => {
  return (
    <Tooltip content={content} position={position}>
      <span className="inline-flex items-center ml-1 text-gray-400 hover:text-gray-500">
        <HelpCircle size={16} />
      </span>
    </Tooltip>
  );
};

export default InfoTooltip;