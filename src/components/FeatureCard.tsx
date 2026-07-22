import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon: string;
  svgIcon?: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const getIconColor = (iconType: string) => {
    switch (iconType) {
      case 'blue':
        return {
          bg: 'bg-blue-500/12',
          stroke: 'stroke-blue-500',
          shadow: 'shadow-[0_2px_0_rgba(255,255,255,0.95)_inset,0_-1px_0_rgba(0,0,0,0.06)_inset,0_8px_20px_rgba(0,113,227,0.15),0_2px_6px_rgba(0,0,0,0.04)]'
        };
      case 'orange':
        return {
          bg: 'bg-orange-500/12',
          stroke: 'stroke-orange-600',
          shadow: 'shadow-[0_2px_0_rgba(255,255,255,0.95)_inset,0_-1px_0_rgba(0,0,0,0.06)_inset,0_8px_20px_rgba(255,140,0,0.15),0_2px_6px_rgba(0,0,0,0.04)]'
        };
      case 'purple':
        return {
          bg: 'bg-purple-500/12',
          stroke: 'stroke-purple-600',
          shadow: 'shadow-[0_2px_0_rgba(255,255,255,0.95)_inset,0_-1px_0_rgba(0,0,0,0.06)_inset,0_8px_20px_rgba(139,92,246,0.15),0_2px_6px_rgba(0,0,0,0.04)]'
        };
      case 'green':
        return {
          bg: 'bg-green-500/12',
          stroke: 'stroke-green-600',
          shadow: 'shadow-[0_2px_0_rgba(255,255,255,0.95)_inset,0_-1px_0_rgba(0,0,0,0.06)_inset,0_8px_20px_rgba(16,185,129,0.15),0_2px_6px_rgba(0,0,0,0.04)]'
        };
      default:
        return {
          bg: 'bg-blue-500/12',
          stroke: 'stroke-blue-500',
          shadow: 'shadow-[0_2px_0_rgba(255,255,255,0.95)_inset,0_-1px_0_rgba(0,0,0,0.06)_inset,0_8px_20px_rgba(0,113,227,0.15),0_2px_6px_rgba(0,0,0,0.04)]'
        };
    }
  };

  const iconColors = getIconColor(feature.icon);

  return (
    <div className="group bg-white/55 backdrop-blur-xl saturate-160 rounded-2xl p-8 text-left relative cursor-pointer border border-white/80 shadow-[0_2px_0_rgba(255,255,255,0.8)_inset,0_4px_20px_rgba(80,100,160,0.07),0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_2px_0_rgba(255,255,255,0.8)_inset,0_12px_28px_rgba(80,100,160,0.12),0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="absolute top-3.5 right-3.5 w-5.5 h-5.5 rounded-full bg-white/50 border border-white/70 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] flex items-center justify-center transition-all duration-200 group-hover:bg-blue-500/15 group-hover:border-blue-500/30">
        <svg className="w-2.25 h-2.25 stroke-gray-600 transition-all duration-200 group-hover:stroke-blue-500" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 4L4 7L7 4" />
        </svg>
      </div>
      <div className={`w-18 h-18 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden backdrop-blur-2xl saturate-180 border border-white/90 shadow-[0_2px_0_rgba(255,255,255,0.95)_inset,0_-1px_0_rgba(0,0,0,0.06)_inset,0_8px_20px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] transition-all duration-200 group-hover:-translate-y-1 group-hover:scale-105 group-hover:-rotate-3 ${iconColors.bg} ${iconColors.shadow}`}>
        {feature.svgIcon ? (
          <svg 
            className={`w-7.5 h-7.5 ${iconColors.stroke}`} 
            fill="none" 
            strokeWidth="1.6" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            viewBox="0 0 20 20"
            dangerouslySetInnerHTML={{ __html: feature.svgIcon }}
          />
        ) : (
          <svg className="w-7.5 h-7.5 stroke-blue-500" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 20 20">
            <rect x="3" y="11" width="3" height="6" rx="1" fill="#0071e3" opacity="0.8"/>
            <rect x="8.5" y="7" width="3" height="10" rx="1" fill="#0071e3"/>
            <rect x="14" y="4" width="3" height="13" rx="1" fill="#0071e3" opacity="0.9"/>
          </svg>
        )}
      </div>
      <div className="text-base font-bold text-gray-900 tracking-tight mb-1.5 relative z-10">{feature.title}</div>
      <div className="text-sm text-gray-600 leading-relaxed relative z-10">{feature.description}</div>
    </div>
  );
};

export default FeatureCard;
