

export const colors = {
  // Enhanced Gold Palette
  gold: {
    primary: '#FFD700',
    secondary: '#FFA500',
    accent: '#FFB347',
    light: '#FFF4B0',
    dark: '#B8860B',
    metallic: '#DAA520',
    shimmer: '#FFE5B4',
  },
  
  // Cosmic Background Palette
  cosmic: {
    primary: '#0A0A0A',
    secondary: '#1A1A1A',
    tertiary: '#2A2A2A',
    surface: '#1F1F1F',
    card: '#252525',
    border: '#333',
    borderLight: '#444',
  },
  
  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#E0E0E0',
    tertiary: '#CCCCCC',
    muted: '#888',
    gold: '#FFD700',
    goldLight: '#FFF4B0',
  },
  
  // Accent Colors
  accent: {
    success: '#4ECDC4',
    warning: '#FF6B6B',
    info: '#87CEEB',
    love: '#FF8ED4',
    mentor: '#A8E6CF',
  },
  
  // Additional colors
  status: {
    online: '#4ECDC4',
    offline: '#FF6B6B',
    pending: '#FFB347',
    error: '#FF6B6B',
  },
  
  // Additional color variants
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
  },
  
  // Additional color variants
  semantic: {
    success: '#4ECDC4',
    warning: '#FFB347',
    error: '#FF6B6B',
    info: '#87CEEB',
  },
};

export const shadows = {
  // Enhanced Shadow System
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  medium: {
   
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  
  // Gold Glow Effects
  goldGlow: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  
  // Cosmic Glow
  cosmicGlow: {
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  // Additional shadow variants
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  
  // Additional shadow variants
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  prominent: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 20,
  },
  
  // Additional shadow variants
  inner: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
};

export const gradients = {
  // Gold Gradients
  goldPrimary: ['#FFD700', '#FFA500', '#B8860B'],
  goldShimmer: ['#FFF4B0', '#FFD700', '#DAA520'],
  cosmicGold: ['#0A0A0A', '#1A1A1A', '#2A2A2A'],
  
  // Button Gradients
  buttonPrimary: ['#FFD700', '#FFA500'],
  buttonSecondary: ['#2A2A2A', '#1A1A1A'],
  
  // Additional gradients
  goldAccent: ['#FFB347', '#FFD700'],
  cosmicSurface: ['#1F1F1F', '#252525'],
  
  // Additional gradient variants
  goldMuted: ['#B8860B', '#DAA520'],
  cosmicAccent: ['#2A2A2A', '#1A1A1A'],
  
  // Additional gradient variants
  goldShimmerExtended: ['#FFF4B0', '#FFD700', '#DAA520'],
  cosmicGoldExtended: ['#0A0A0A', '#1A1A1A', '#2A2A2A'],
};

export const animations = {
  // Timing Functions
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
    verySlow: 800,
  },
  
  // Easing Functions
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Scale Values
  scale: {
    small: 0.95,
    normal: 1.0,
    large: 1.05,
    xl: 1.1,
  },
  
  // Additional animation values
  duration: {
    quick: 150,
    fast: 300,
    normal: 500,
    slow: 800,
    verySlow: 1200,
  },
  
  // Additional animation variants
  spring: {
    tension: 50,
    friction: 8,
    stiffness: 100,
    damping: 10,
  },
  
  // Additional animation variants
  bounce: {
    tension: 100,
    friction: 5,
    stiffness: 200,
    damping: 15,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  
  // Additional spacing values
  tiny: 2,
  micro: 1,
  huge: 64,
  massive: 96,
  
  // Additional spacing variants
  section: 32,
  content: 16,
  compact: 8,
  
  // Additional spacing variants
  margin: 16,
  padding: 16,
  gap: 8,
};

export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xl: 24,
  round: 50,
  xsmall: 4,
  
  // Additional border radius values
  tiny: 2,
  huge: 32,
  full: 9999,
  
  // Additional border radius variants
  pill: 25,
  card: 16,
  input: 8,
  
  // Additional border radius variants
  button: 8,
  modal: 16,
  alert: 12,
};

export const typography = {
  // Enhanced Typography Scale
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.25,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.25,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  xsmall: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 14,
  },
  
  // Additional typography variants
  label: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  
  // Additional typography variants
  display: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 56,
    letterSpacing: 1,
  },
  
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.25,
  },
  
  // Additional typography variants
  overline: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
};



export default {
  colors,
  shadows,
  gradients,
  animations,
  spacing,
  borderRadius,
  typography,
};
