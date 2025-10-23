import React from 'react';

const Logo = ({ className }) => (
    <svg
        className={className}
        width="80"
        height="80"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Monitor Base */}
        <rect
            x="8"
            y="8"
            width="24"
            height="18"
            rx="2"
            fill="currentColor"
            opacity="0.8"
        />
        
        {/* Monitor Stand */}
        <rect
            x="17"
            y="26"
            width="6"
            height="3"
            fill="currentColor"
            opacity="0.6"
        />
        
        {/* Binary Code Display */}
        <text
            x="20"
            y="18"
            textAnchor="middle"
            fill="white"
            fontSize="4"
            fontFamily="monospace"
            opacity="0.9"
        >
            <tspan x="20" dy="-6">1010</tspan>
            <tspan x="20" dy="4">0101</tspan>
            <tspan x="20" dy="4">1010</tspan>
        </text>
        
        {/* Optional: Glow effect around monitor */}
        <rect
            x="6"
            y="6"
            width="28"
            height="20"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.3"
        />
    </svg>
);

export default Logo;