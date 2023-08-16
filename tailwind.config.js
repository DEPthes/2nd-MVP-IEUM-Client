import tokens from './plugins/tokens';

const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_300 = { ...Array.from(Array(301)).map((_, i) => `${i}px`) };
const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) };
const rem0_5 = { ...Array.from(Array(60)).map((_, i) => `${i / 10}rem`) };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: 'jit', // tailwind 에서 calc 함수를 사용하기 위함
  theme: {
    extend: {
      colors: {
        primary: '#675149',
        secondary: '#FFFBF4',
        tertiary: '#FFFCF7',
        positive: '#048848',
        negative: '#E11900',
        hover: '#2D2421',
        letter: '#987A6F',
        letter_paper: '#F0E4D1',
        letter_bg: '#F6F0E7',
        letter_hover: '#786056',
        text_primary: '#000000',
        text_secondary: '#6B6B6B',
        text_tertiary: '#FFFFFF',
        border_focus: '#675149',
      },
      borderWidth: px0_10,
      fontSize: rem0_5,
      lineHeight: px0_100,
      width: px0_1000,
      height: px0_1000,
      maxWidth: px0_1000,
      maxHeight: px0_1000,
      minWidth: px0_1000,
      minHeight: px0_1000,
      spacing: px0_300,
      borderRadius: px0_100,
      top: px0_1000,
      left: px0_1000,
      right: px0_1000,
    },
    zIndex: {
      header: 80,
      dropdown: 90,
      backdrop_1: 100,
      backdrop_2: 101,
      modal: 102,
    },

    screens: {
      tablet: '600px',
      desktop: '1136px',
    },
  },

  plugins: [tokens],
};
