// WCAG Color Contrast Utility Functions

/**
 * Convert hex color to RGB
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/**
 * Convert RGB to hex
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

/**
 * Convert RGB to HSL
 */
export const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
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
    l: Math.round(l * 100)
  };
};

/**
 * Convert HSL to RGB
 */
export const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

/**
 * Calculate relative luminance of a color (WCAG formula)
 */
export const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Calculate contrast ratio between two colors (WCAG formula)
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Check if color combination meets WCAG standards
 */
export const meetsWCAGStandards = (
  foreground: string, 
  background: string, 
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): { passes: boolean; ratio: number; required: number } => {
  const ratio = getContrastRatio(foreground, background);
  
  const requirements = {
    'AA': { normal: 4.5, large: 3 },
    'AAA': { normal: 7, large: 4.5 }
  };
  
  const required = requirements[level][size];
  
  return {
    passes: ratio >= required,
    ratio,
    required
  };
};

/**
 * Generate accessible secondary color based on primary color
 */
export const generateAccessibleSecondary = (
  primaryColor: string,
  targetBackground: string = '#ffffff',
  preference: 'lighter' | 'darker' | 'auto' = 'auto'
): { 
  secondary: string; 
  contrastRatio: number; 
  meetsAA: boolean; 
  meetsAAA: boolean;
  alternatives: string[];
} => {
  const primaryRgb = hexToRgb(primaryColor);
  if (!primaryRgb) {
    return {
      secondary: primaryColor,
      contrastRatio: 1,
      meetsAA: false,
      meetsAAA: false,
      alternatives: []
    };
  }

  const primaryHsl = rgbToHsl(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  const backgroundRgb = hexToRgb(targetBackground);
  const backgroundLuminance = backgroundRgb ? getLuminance(backgroundRgb.r, backgroundRgb.g, backgroundRgb.b) : 1;
  
  // Determine if we should go lighter or darker
  let shouldGoLighter = preference === 'lighter';
  if (preference === 'auto') {
    shouldGoLighter = backgroundLuminance > 0.5;
  } else if (preference === 'darker') {
    shouldGoLighter = false;
  }

  const alternatives: string[] = [];
  let bestColor = primaryColor;
  let bestRatio = getContrastRatio(primaryColor, targetBackground);

  // Try different lightness values
  const lightnessAdjustments = shouldGoLighter 
    ? [10, 20, 30, 40, 50, -10, -20, -30, -40] 
    : [-10, -20, -30, -40, -50, 10, 20, 30, 40];

  for (const adjustment of lightnessAdjustments) {
    const newLightness = Math.max(0, Math.min(100, primaryHsl.l + adjustment));
    const newRgb = hslToRgb(primaryHsl.h, primaryHsl.s, newLightness);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    const ratio = getContrastRatio(newHex, targetBackground);

    alternatives.push(newHex);

    if (ratio > bestRatio) {
      bestColor = newHex;
      bestRatio = ratio;
    }

    // If we found a color that meets AAA standards, use it
    if (ratio >= 7) {
      bestColor = newHex;
      bestRatio = ratio;
      break;
    }
  }

  // Try saturation adjustments if we still don't have good contrast
  if (bestRatio < 4.5) {
    const saturationAdjustments = [-20, -40, -60, 20];
    
    for (const satAdjustment of saturationAdjustments) {
      for (const lightAdjustment of lightnessAdjustments.slice(0, 5)) {
        const newSaturation = Math.max(0, Math.min(100, primaryHsl.s + satAdjustment));
        const newLightness = Math.max(0, Math.min(100, primaryHsl.l + lightAdjustment));
        const newRgb = hslToRgb(primaryHsl.h, newSaturation, newLightness);
        const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        const ratio = getContrastRatio(newHex, targetBackground);

        if (ratio > bestRatio) {
          bestColor = newHex;
          bestRatio = ratio;
          alternatives.push(newHex);
        }

        if (ratio >= 7) break;
      }
      if (bestRatio >= 7) break;
    }
  }

  return {
    secondary: bestColor,
    contrastRatio: bestRatio,
    meetsAA: bestRatio >= 4.5,
    meetsAAA: bestRatio >= 7,
    alternatives: [...new Set(alternatives)].slice(0, 8)
  };
};

/**
 * Generate a complete accessible color palette
 */
export const generateAccessiblePalette = (primaryColor: string): {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  light: string;
  dark: string;
} => {
  const primaryRgb = hexToRgb(primaryColor);
  if (!primaryRgb) {
    return {
      primary: primaryColor,
      secondary: '#6B7280',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
      light: '#F9FAFB',
      dark: '#1F2937'
    };
  }

  const primaryHsl = rgbToHsl(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  
  // Generate secondary color
  const secondaryResult = generateAccessibleSecondary(primaryColor, '#ffffff', 'auto');
  
  // Generate other colors based on primary hue but with different saturations and lightness
  const successRgb = hslToRgb(140, 60, 45); // Green
  const warningRgb = hslToRgb(45, 90, 50); // Orange
  const errorRgb = hslToRgb(0, 75, 55); // Red
  const infoRgb = hslToRgb(210, 80, 50); // Blue

  return {
    primary: primaryColor,
    secondary: secondaryResult.secondary,
    success: rgbToHex(successRgb.r, successRgb.g, successRgb.b),
    warning: rgbToHex(warningRgb.r, warningRgb.g, warningRgb.b),
    error: rgbToHex(errorRgb.r, errorRgb.g, errorRgb.b),
    info: rgbToHex(infoRgb.r, infoRgb.g, infoRgb.b),
    light: '#F9FAFB',
    dark: '#1F2937'
  };
};