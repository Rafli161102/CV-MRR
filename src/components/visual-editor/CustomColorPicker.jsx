/**
 * ============================================================================
 * CustomColorPicker Component - HSL Slider (No Native Input)
 * ============================================================================
 * Komponen color picker kustom dengan 3 slider HSL (Hue, Saturation, Lightness).
 * Desain tajam dan flat ala panel kontrol mekanik/militer.
 * ============================================================================
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { EndfieldCard } from '@/components/ui';

export default function CustomColorPicker({ 
  initialColor = '#ff4500', 
  onColorChange,
  className = '' 
}) {
  // Parse initial color to HSL
  const parseColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Convert HSL to Hex
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const initialHSL = parseColor(initialColor);
  const [hue, setHue] = useState(initialHSL.h);
  const [saturation, setSaturation] = useState(initialHSL.s);
  const [lightness, setLightness] = useState(initialHSL.l);

  // Calculate current color
  const currentColor = hslToHex(hue, saturation, lightness);

  // Update parent when color changes
  useEffect(() => {
    if (onColorChange) {
      onColorChange(currentColor, { h: hue, s: saturation, l: lightness });
    }
  }, [currentColor, hue, saturation, lightness, onColorChange]);

  // Slider Component
  const Slider = ({ 
    label, 
    value, 
    min, 
    max, 
    onChange, 
    gradient = null,
    unit = ''
  }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="font-mono text-xs text-endfieldAccent tracking-wider">
          // {label}
        </label>
        <span className="font-mono text-xs text-endfieldTextMuted">
          {value}{unit}
        </span>
      </div>
      
      {/* Slider Track */}
      <div className="relative h-6 bg-endfieldSurface border border-endfieldBorder">
        {/* Gradient Background */}
        {gradient && (
          <div 
            className="absolute inset-0 opacity-30"
            style={{ background: gradient }}
          />
        )}
        
        {/* Slider Input (Hidden but functional) */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {/* Custom Thumb/Indicator */}
        <div 
          className="absolute top-0 bottom-0 w-3 bg-endfieldAccent border border-endfieldBorder"
          style={{ 
            left: `calc(${(value - min) / (max - min) * 100}% - 6px)`,
            boxShadow: '0 0 10px rgba(255, 69, 0, 0.5)'
          }}
        />
        
        {/* Tick Marks */}
        <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="w-[1px] h-2 bg-endfieldBorder self-center"
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Preset colors (Tactical palette)
  const presets = [
    '#ff4500', // Tactical Orange
    '#f59e0b', // Amber
    '#10b981', // Matrix Green
    '#06b6d4', // Ice Blue
    '#3b82f6', // Electric Blue
    '#8b5cf6', // Violet
    '#ef4444', // Alert Red
    '#ffffff', // White
  ];

  return (
    <EndfieldCard className={`${className}`}>
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-endfieldBorder">
        <span className="font-mono text-xs text-endfieldAccent tracking-widest">
          // COLOR_PICKER_HSL
        </span>
      </div>

      {/* Color Preview */}
      <div className="mb-6 flex items-center gap-4">
        <div 
          className="w-16 h-16 border-2 border-endfieldBorder clip-beveled-sm"
          style={{ 
            backgroundColor: currentColor,
            boxShadow: `0 0 20px ${currentColor}40`
          }}
        />
        <div className="flex-1">
          <div className="font-mono text-xs text-endfieldTextMuted mb-1">HEX_VALUE</div>
          <div className="font-mono text-lg text-endfieldText tracking-wider">
            {currentColor.toUpperCase()}
          </div>
          <div className="font-mono text-xs text-endfieldTextMuted mt-1">
            HSL({hue}, {saturation}%, {lightness}%)
          </div>
        </div>
      </div>

      {/* HSL Sliders */}
      <Slider
        label="HUE"
        value={hue}
        min={0}
        max={360}
        unit="°"
        onChange={setHue}
        gradient={`linear-gradient(to right, 
          hsl(0, ${saturation}%, ${lightness}%), 
          hsl(60, ${saturation}%, ${lightness}%), 
          hsl(120, ${saturation}%, ${lightness}%), 
          hsl(180, ${saturation}%, ${lightness}%), 
          hsl(240, ${saturation}%, ${lightness}%), 
          hsl(300, ${saturation}%, ${lightness}%), 
          hsl(360, ${saturation}%, ${lightness}%)
        )`}
      />

      <Slider
        label="SATURATION"
        value={saturation}
        min={0}
        max={100}
        unit="%"
        onChange={setSaturation}
        gradient={`linear-gradient(to right, 
          hsl(${hue}, 0%, ${lightness}%), 
          hsl(${hue}, 100%, ${lightness}%)
        )`}
      />

      <Slider
        label="LIGHTNESS"
        value={lightness}
        min={0}
        max={100}
        unit="%"
        onChange={setLightness}
        gradient={`linear-gradient(to right, 
          hsl(${hue}, ${saturation}%, 0%), 
          hsl(${hue}, ${saturation}%, 50%), 
          hsl(${hue}, ${saturation}%, 100%)
        )`}
      />

      {/* Preset Colors */}
      <div className="mt-6 pt-6 border-t border-endfieldBorder">
        <div className="font-mono text-xs text-endfieldAccent mb-3 tracking-wider">
          // TACTICAL_PRESETS
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((color) => (
            <button
              key={color}
              onClick={() => {
                const hsl = parseColor(color);
                setHue(hsl.h);
                setSaturation(hsl.s);
                setLightness(hsl.l);
              }}
              className={`
                w-8 h-8 border-2 clip-beveled-sm
                ${currentColor === color ? 'border-endfieldAccent' : 'border-endfieldBorder'}
                hover:border-endfieldAccent transition-colors
              `}
              style={{ 
                backgroundColor: color,
                boxShadow: currentColor === color ? `0 0 10px ${color}60` : 'none'
              }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>
    </EndfieldCard>
  );
}
