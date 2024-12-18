'use client';
import Icon from '@icon-park/react/es/all';
const IconPark = ({ icon, size, className }: { icon: string; size: number; className: string }) => {
  return <Icon type={icon} size={size} className={className} />;
};
export default IconPark;
