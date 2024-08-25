import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './*.html',
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};

export default config;