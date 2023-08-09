import plugin from 'tailwindcss/plugin';

// tailwind css 플러그인
// tailwind.config.js의 extends 보다 많은 항목을 공통 클래스로 사용하기 위함

const tokens = plugin(({ addUtilities }) => {
  addUtilities({
    '.font-heading--3xl': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '700',
      'line-height': '140%',
      'font-size': '5rem',
    },
    '.font-heading--2xl': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '700',
      'line-height': '140%',
      'font-size': '3.8rem',
    },
    '.font-heading--xl': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '700',
      'line-height': '140%',
      'font-size': '2.8rem',
    },
    '.font-heading--lg': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '700',
      'line-height': '140%',
      'font-size': '2.1rem',
    },
    '.font-heading--md': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '700',
      'line-height': '140%',
      'font-size': '1.6rem',
    },
    '.font-heading--sm': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '700',
      'line-height': '140%',
      'font-size': '1.2rem',
    },

    '.font-label--2xl': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '600',
      'line-height': '150%',
      'font-size': '3.8rem',
    },
    '.font-label--xl': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '600',
      'line-height': '150%',
      'font-size': '2.8rem',
    },
    '.font-label--lg': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '600',
      'line-height': '150%',
      'font-size': '2.1rem',
    },
    '.font-label--md': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '600',
      'line-height': '150%',
      'font-size': '1.6rem',
    },
    '.font-label--sm': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '600',
      'line-height': '140%',
      'font-size': '1.2rem',
    },

    '.font-paragraph--xl': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '400',
      'line-height': '160%',
      'font-size': '2.8rem',
    },
    '.font-paragraph--lg': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '400',
      'line-height': '160%',
      'font-size': '2.1rem',
    },
    '.font-paragraph--md': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '400',
      'line-height': '160%',
      'font-size': '1.6rem',
    },
    '.font-paragraph--sm': {
      'font-family': "'SUITE', sans-serif",
      'font-weight': '400',
      'line-height': '160%',
      'font-size': '1.2rem',
    },
  });
});

export default tokens;
