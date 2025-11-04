import React, { useState } from 'react';
import { ColorSchemePickerProps, ColorSchemeOption } from '../types';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import ColorPicker from 'components/ui/ColorPicker';
import ContrastTool from 'components/ui/ContrastTool';
import Modal from 'components/ui/Modal';

const colorSchemeOptions: ColorSchemeOption[] = [
  {
    id: 'blue',
    name: 'Ocean Blue',
    primary: '#2563EB',
    accent: '#F59E0B',
    preview: {
      background: '#F8FAFC',
      text: '#1E293B',
      border: '#E2E8F0',
    },
  },
  {
    id: 'green',
    name: 'Forest Green',
    primary: '#10B981',
    accent: '#8B5CF6',
    preview: {
      background: '#F0FDF4',
      text: '#14532D',
      border: '#BBF7D0',
    },
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    primary: '#8B5CF6',
    accent: '#F59E0B',
    preview: {
      background: '#FAF5FF',
      text: '#581C87',
      border: '#DDD6FE',
    },
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    primary: '#EA580C',
    accent: '#06B6D4',
    preview: {
      background: '#FFF7ED',
      text: '#9A3412',
      border: '#FDBA74',
    },
  },
];

const ColorSchemePicker = ({ selectedScheme, onSchemeChange }: ColorSchemePickerProps) => {
  const [customPrimaryColor, setCustomPrimaryColor] = useState('#2563EB');
  const [customSecondaryColor, setCustomSecondaryColor] = useState('#6B7280');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [showContrastTool, setShowContrastTool] = useState(false);

  const handleCustomPrimaryChange = (color: string) => {
    setCustomPrimaryColor(color);
    // Apply the custom color immediately
    const root = document.documentElement;
    root.style.setProperty('--color-primary', color);
  };

  const handleCustomSecondaryChange = (color: string) => {
    setCustomSecondaryColor(color);
    // Apply the custom secondary color
    const root = document.documentElement;
    root.style.setProperty('--color-secondary', color);
  };

  const handlePresetSelect = (schemeId: 'blue' | 'green' | 'purple' | 'orange') => {
    setIsCustomMode(false);
    onSchemeChange(schemeId);
  };

  const handleCustomModeToggle = () => {
    if (!isCustomMode) {
      setIsCustomMode(true);
      handleCustomPrimaryChange(customPrimaryColor);
    } else {
      setIsCustomMode(false);
      // Reset to selected preset
      onSchemeChange(selectedScheme);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Palette" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Color Scheme</h3>
              <p className="text-sm text-muted-foreground">
                Choose preset or create custom colors
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={isCustomMode ? 'default' : 'outline'}
              size="sm"
              onClick={handleCustomModeToggle}
              iconName="Paintbrush"
              iconPosition="left"
              iconSize={16}
            >
              Custom
            </Button>
            
            {isCustomMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowContrastTool(true)}
                iconName="Eye"
                iconPosition="left"
                iconSize={16}
              >
                Contrast Tool
              </Button>
            )}
          </div>
        </div>

        {!isCustomMode ? (
          // Preset Color Schemes
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {colorSchemeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handlePresetSelect(option.id)}
                className={`p-4 border-2 rounded-lg transition-all text-left hover:shadow-elevation-md ${
                  selectedScheme === option.id && !isCustomMode
                    ? 'border-primary bg-primary/5' :'border-border bg-surface hover:border-primary/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">{option.name}</h4>
                  {selectedScheme === option.id && !isCustomMode && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <div
                      className="w-6 h-6 rounded-full border border-border"
                      style={{ backgroundColor: option.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border border-border"
                      style={{ backgroundColor: option.accent }}
                    />
                  </div>

                  <div
                    className="p-3 rounded-md border"
                    style={{
                      backgroundColor: option.preview.background,
                      borderColor: option.preview.border,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="text-xs font-medium" style={{ color: option.preview.text }}>
                          🇺🇸 United States
                        </div>
                      </div>
                      <div className="text-xs font-mono" style={{ color: option.primary }}>
                        12:34 PM
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Custom Color Picker Mode
          <div className="space-y-6">
            <div className={`p-6 border-2 rounded-lg ${
              isCustomMode ? 'border-primary bg-primary/5' : 'border-border bg-surface'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-foreground">Custom Colors</h4>
                <Icon name="Sparkles" size={16} className="text-primary" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ColorPicker
                    value={customPrimaryColor}
                    onChange={handleCustomPrimaryChange}
                    label="Primary Color"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <ColorPicker
                    value={customSecondaryColor}
                    onChange={handleCustomSecondaryChange}
                    label="Secondary Color"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Custom Color Preview */}
              <div className="mt-6">
                <h5 className="text-sm font-medium text-foreground mb-3">Preview</h5>
                <div className="p-4 bg-white rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="text-sm font-medium"
                        style={{ color: customPrimaryColor }}
                      >
                        🇺🇸 United States
                      </div>
                    </div>
                    <div 
                      className="text-sm font-mono"
                      style={{ color: customSecondaryColor }}
                    >
                      12:34 PM
                    </div>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <div
                      className="w-8 h-8 rounded border border-border"
                      style={{ backgroundColor: customPrimaryColor }}
                    />
                    <div
                      className="w-8 h-8 rounded border border-border"
                      style={{ backgroundColor: customSecondaryColor }}
                    />
                  </div>
                </div>
              </div>

              {/* Accessibility Info */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Accessibility Tip:</p>
                    <p className="text-xs mt-1">
                      Use the Contrast Tool to ensure your colors meet WCAG accessibility standards
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contrast Tool Modal */}
      <Modal
        isOpen={showContrastTool}
        onClose={() => setShowContrastTool(false)}
        title="WCAG Contrast Tool"
        size="lg"
      >
        <ContrastTool
          primaryColor={customPrimaryColor}
          onSecondaryColorChange={handleCustomSecondaryChange}
        />
      </Modal>
    </>
  );
};

export default ColorSchemePicker;