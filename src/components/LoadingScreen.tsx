'use client';

import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(var(--bg-primary))] transition-colors duration-500">
      {/* Центральный контейнер с логотипом */}
      <div className="relative">
        {/* Декоративные фоновые элементы для OPSTAR PROFIT */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Вращающиеся кольца */}
          <div className="absolute w-32 h-32 border-4 border-blue-500/20 rounded-full animate-spin" />
          <div className="absolute w-24 h-24 border-4 border-blue-600/30 rounded-full animate-spin animation-delay-150" />
          <div className="absolute w-16 h-16 border-4 border-blue-700/40 rounded-full animate-spin animation-delay-300" />
        </div>
        
        {/* Основной контент */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Логотип OPSTAR PROFIT */}
          <div className="mb-8">
            {/* Plain <img>: avoids next/image hydration mismatch with styled-jsx in this client overlay. */}
            <img
              src="/opstar-brand-logo.webp"
              alt="OPSTAR PROFIT"
              width={128}
              height={128}
              className="h-24 w-24 animate-pulse md:h-32 md:w-32"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          
          {/* Заголовок */}
          <h1 className="text-2xl md:text-3xl font-black text-[rgb(var(--text-primary))] tracking-tighter mb-4 text-center">
            OPSTAR PROFIT
          </h1>
          
          {/* Подзаголовок */}
          <p className="text-sm md:text-base text-[rgb(var(--text-secondary))] font-medium text-center max-w-xs">
            Professional Training & Consulting
          </p>
          
          {/* Индикатор загрузки */}
          <div className="mt-8 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-400" />
          </div>
        </div>
        
        {/* Брендовые элементы */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="text-xs text-[rgb(var(--text-secondary))] font-medium tracking-widest uppercase">
            Andres Kase © 2026
          </p>
        </div>
      </div>
      
      {/* Дополнительные декоративные элементы */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Левое свечение */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full animate-pulse" />
        
        {/* Правое свечение */}
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-500/10 blur-[60px] rounded-full animate-pulse animation-delay-1000" />
        
        {/* Верхнее свечение */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 blur-[100px] animate-pulse animation-delay-500" />
      </div>
    </div>
  );
}
