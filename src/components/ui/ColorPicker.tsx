import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Convert hex to HSL on value change
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l;

      l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
          default: h = 0;
        }
        h /= 6;
      }

      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
      };
    };

    if (value && value.match(/^#[0-9A-F]{6}$/i)) {
      const hsl = hexToHsl(value);
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const updateColor = (newHue: number, newSat: number, newLight: number) => {
    const newColor = hslToHex(newHue, newSat, newLight);
    setInputValue(newColor);
    onChange(newColor);
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(e.target.value);
    setHue(newHue);
    updateColor(newHue, saturation, lightness);
  };

  const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSat = parseInt(e.target.value);
    setSaturation(newSat);
    updateColor(hue, newSat, lightness);
  };

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLight = parseInt(e.target.value);
    setLightness(newLight);
    updateColor(hue, saturation, newLight);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Validate hex color
    if (newValue.match(/^#[0-9A-F]{6}$/i)) {
      onChange(newValue);
    }
  };

  const presetColors = [
    '#2563EB', '#10B981', '#8B5CF6', '#EA580C',
    '#EF4444', '#F59E0B', '#06B6D4', '#84CC16',
    '#EC4899', '#6366F1', '#F97316', '#14B8A6',
  ];

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      
      <div className="flex items-center space-x-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 border border-border rounded-lg hover:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div
            className="w-6 h-6 rounded border border-border"
            style={{ backgroundColor: value }}
          />
          <span className="text-sm text-foreground font-mono">{value}</span>
          <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
        </button>
        
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          placeholder="#000000"
          className="px-3 py-2 border border-border rounded-lg text-sm font-mono bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {isOpen && (
        <div
          ref={pickerRef}
          className="absolute top-full left-0 mt-2 bg-surface border border-border rounded-lg shadow-xl p-4 z-50 w-80"
        >
          {/* HSL Sliders */}
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Hue: {hue}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={handleHueChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), 
                    hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), 
                    hsl(360, 100%, 50%))`
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Saturation: {saturation}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={saturation}
                onChange={handleSaturationChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(${hue}, 0%, ${lightness}%), 
                    hsl(${hue}, 100%, ${lightness}%))`
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Lightness: {lightness}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={lightness}
                onChange={handleLightnessChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(${hue}, ${saturation}%, 0%), 
                    hsl(${hue}, ${saturation}%, 50%), 
                    hsl(${hue}, ${saturation}%, 100%))`
                }}
              />
            </div>
          </div>

          {/* Color Preview */}
          <div className="mb-4 p-4 rounded-lg border border-border text-center">
            <div
              className="w-full h-16 rounded-lg border border-border mb-2"
              style={{ backgroundColor: hslToHex(hue, saturation, lightness) }}
            />
            <p className="text-sm font-mono text-foreground">
              {hslToHex(hue, saturation, lightness)}
            </p>
          </div>

          {/* Preset Colors */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Quick Colors</p>
            <div className="grid grid-cols-6 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onChange(color)}
                  className="w-8 h-8 rounded border border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;