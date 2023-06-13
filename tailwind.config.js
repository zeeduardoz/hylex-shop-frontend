module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        header:
          "linear-gradient(to top, var(--gradient) 0%, var(--gradient) 100%), url('/bg.png')"
      }),
      colors: {
        foreground: 'var(--foreground)',
        primary: 'var(--background-primary)',
        secondary: 'var(--background-secondary)',
        'hr-color': 'var(--hr-color)',

        'color-light': 'var(--text-color-light)',
        'color-medium': 'var(--text-color-medium)',
        'color-dark': 'var(--text-color-dark)',

        'color-success': 'var(--btn-color-success)',
        'color-info': 'var(--btn-color-info)',
        'color-warning': 'var(--btn-color-warning)',
        'color-danger': 'var(--btn-color-danger)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/custom-forms')]
}
