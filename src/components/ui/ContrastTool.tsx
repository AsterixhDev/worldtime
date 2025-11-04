import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

import { generateAccessibleSecondary, meetsWCAGStandards, generateAccessiblePalette } from '../../utils/colorContrast';

interface ContrastToolProps {
  primaryColor: string;
  onSecondaryColorChange: (color: string) => void;
  className?: string;
}

const ContrastTool: React.FC<ContrastToolProps> = ({
  primaryColor,
  onSecondaryColorChange,
  className = '',
}) => {
  const [backgroundType, setBackgroundType] = useState<'light' | 'dark'>('light');
  const [customBackground, setCustomBackground] = useState('#ffffff');
  const [generatedColors, setGeneratedColors] = useState<ReturnType<typeof generateAccessibleSecondary> | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState('');

  const backgroundColors = {
    light: '#ffffff',
    dark: '#1f2937'
  };

  const targetBackground = backgroundColors[backgroundType];

  useEffect(() => {
    const result = generateAccessibleSecondary(primaryColor, targetBackground, 'auto');
    setGeneratedColors(result);
    setSelectedSecondary(result.secondary);
    onSecondaryColorChange(result.secondary);
  }, [primaryColor, targetBackground, onSecondaryColorChange]);

  const handleBackgroundTypeChange = (type: 'light' | 'dark') => {
    setBackgroundType(type);
  };

  const handleSecondarySelect = (color: string) => {
    setSelectedSecondary(color);
    onSecondaryColorChange(color);
  };

  const generateFullPalette = () => {
    return generateAccessiblePalette(primaryColor);
  };

  const palette = generateFullPalette();
  const primaryContrast = meetsWCAGStandards(primaryColor, targetBackground);
  const secondaryContrast = meetsWCAGStandards(selectedSecondary, targetBackground);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Eye" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">WCAG Contrast Tool</h3>
          <p className="text-sm text-muted-foreground">
            Generate accessible secondary colors automatically
          </p>
        </div>
      </div>

      {/* Background Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Target Background</label>
        <div className="flex space-x-2">
          <Button
            variant={backgroundType === 'light' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleBackgroundTypeChange('light')}
            iconName="Sun"
            iconPosition="left"
            iconSize={16}
          >
            Light
          </Button>
          <Button
            variant={backgroundType === 'dark' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleBackgroundTypeChange('dark')}
            iconName="Moon"
            iconPosition="left"
            iconSize={16}
          >
            Dark
          </Button>
        </div>
      </div>

      {/* Color Analysis */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Contrast Analysis</h4>
        
        {/* Primary Color Analysis */}
        <div className="p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded border border-border"
                style={{ backgroundColor: primaryColor }}
              />
              <div>
                <p className="text-sm font-medium text-foreground">Primary Color</p>
                <p className="text-xs text-muted-foreground font-mono">{primaryColor}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {primaryContrast.ratio.toFixed(2)}:1
              </p>
              <div className="flex space-x-1">
                <span className={`text-xs px-2 py-1 rounded ${
                  primaryContrast.passes ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {primaryContrast.passes ? 'AA ✓' : 'AA ✗'}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  primaryContrast.ratio >= 7 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {primaryContrast.ratio >= 7 ? 'AAA ✓' : 'AAA ✗'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Preview */}
          <div 
            className="p-3 rounded border"
            style={{ 
              backgroundColor: targetBackground,
              color: primaryColor 
            }}
          >
            <p className="text-sm font-medium">Sample text in primary color</p>
            <p className="text-xs opacity-80">This shows how the primary color looks on the target background</p>
          </div>
        </div>

        {/* Generated Secondary Color */}
        {generatedColors && (
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded border border-border"
                  style={{ backgroundColor: selectedSecondary }}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">Generated Secondary</p>
                  <p className="text-xs text-muted-foreground font-mono">{selectedSecondary}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {secondaryContrast.ratio.toFixed(2)}:1
                </p>
                <div className="flex space-x-1">
                  <span className={`text-xs px-2 py-1 rounded ${
                    generatedColors.meetsAA ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {generatedColors.meetsAA ? 'AA ✓' : 'AA ✗'}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    generatedColors.meetsAAA ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {generatedColors.meetsAAA ? 'AAA ✓' : 'AAA ✗'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Preview */}
            <div 
              className="p-3 rounded border"
              style={{ 
                backgroundColor: targetBackground,
                color: selectedSecondary 
              }}
            >
              <p className="text-sm font-medium">Sample text in secondary color</p>
              <p className="text-xs opacity-80">This shows how the secondary color looks on the target background</p>
            </div>
          </div>
        )}
      </div>

      {/* Alternative Colors */}
      {generatedColors?.alternatives && generatedColors.alternatives.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Alternative Secondary Colors</h4>
          <div className="grid grid-cols-4 gap-2">
            {generatedColors.alternatives.map((color, index) => {
              const contrast = meetsWCAGStandards(color, targetBackground);
              return (
                <button
                  key={index}
                  onClick={() => handleSecondarySelect(color)}
                  className={`p-2 border rounded-lg transition-all hover:scale-105 ${
                    selectedSecondary === color 
                      ? 'border-primary ring-2 ring-primary/20' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div 
                    className="w-full h-8 rounded mb-1 border border-border"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs font-mono text-muted-foreground truncate">{color}</p>
                  <div className="flex justify-center mt-1">
                    <span className={`text-xs px-1 py-0.5 rounded ${
                      contrast.passes ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {contrast.ratio.toFixed(1)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Full Palette Preview */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Generated Palette Preview</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(palette).map(([name, color]) => (
            <div key={name} className="text-center">
              <div 
                className="w-full h-12 rounded-lg border border-border mb-2"
                style={{ backgroundColor: color }}
              />
              <p className="text-xs font-medium text-foreground capitalize">{name}</p>
              <p className="text-xs text-muted-foreground font-mono">{color}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Tips */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">WCAG Guidelines:</p>
            <ul className="text-xs space-y-1">
              <li>• <strong>AA Level:</strong> 4.5:1 contrast ratio for normal text, 3:1 for large text</li>
              <li>• <strong>AAA Level:</strong> 7:1 contrast ratio for normal text, 4.5:1 for large text</li>
              <li>• Colors are automatically adjusted to meet accessibility standards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContrastTool;