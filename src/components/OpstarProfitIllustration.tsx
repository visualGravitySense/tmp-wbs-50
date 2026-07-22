interface IllustrationItem {
  title: string
  position: {
    x: number
    y: number
  }
}

interface OpstarProfitIllustrationProps {
  illustrationData: {
    centralText: string
    illustrationItems: IllustrationItem[]
    backgroundColor?: string
    centralCircleColor?: string
  }
  className?: string
}

export default function OpstarProfitIllustration({ 
  illustrationData, 
  className = '' 
}: OpstarProfitIllustrationProps) {
  const {
    centralText = 'OPSTAR PROFIT',
    illustrationItems = [],
    backgroundColor = 'from-blue-50 to-white',
    centralCircleColor = 'from-blue-400 to-blue-600'
  } = illustrationData

  return (
    <div className={`relative w-full max-w-5xl mx-auto ${className}`}>
      <div className={`relative aspect-video bg-gradient-to-br ${backgroundColor} rounded-2xl p-8`}>
        {/* Central Circle */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br ${centralCircleColor} rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-4 border-white`}>
          <div className="text-lg font-bold">{centralText}</div>
        </div>

        {/* Surrounding Boxes */}
        {illustrationItems.map((item, index) => (
          <div
            key={index}
            className="absolute bg-white/90 backdrop-blur-sm border-2 border-blue-200 rounded-xl p-4 shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:shadow-xl transition-shadow duration-300"
            style={{
              left: `${item.position.x}%`,
              top: `${item.position.y}%`,
              minWidth: '140px'
            }}
          >
            <div className="text-center">
              <div className="font-bold text-blue-800 text-sm mb-2 leading-tight">
                {item.title}
              </div>
            </div>
          </div>
        ))}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {illustrationItems.map((item, index) => {
            const centerX = 50
            const centerY = 50
            const endX = item.position.x
            const endY = item.position.y
            
            return (
              <g key={index}>
                {/* Dashed line */}
                <line
                  x1={`${centerX}%`}
                  y1={`${centerY}%`}
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="6,4"
                  opacity="0.7"
                />
                {/* Arrow */}
                <polygon
                  points={`${endX}%,${endY}% ${endX - 3}%,${endY - 2}% ${endX - 3}%,${endY + 2}%`}
                  fill="#60A5FA"
                  opacity="0.8"
                  transform={`rotate(${Math.atan2(endY - centerY, endX - centerX) * 180 / Math.PI} ${endX}% ${endY}%)`}
                />
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
