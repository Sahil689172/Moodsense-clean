module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    }),
    require('postcss-normalize'),
    require('tailwindcss'),
    require('autoprefixer'),
  ]
};

// This PostCSS configuration file is set up to use Tailwind CSS and Autoprefixer.
// It specifies that Tailwind CSS should process the styles and Autoprefixer should add vendor prefixes to CSS rules.