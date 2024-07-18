

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgb(var(${variableName}))`;
    }
  };
}

module.exports = {
  mode: "jit",
  purge: {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {

      width: {
        '300': '300px',
        '350': '350px',
        '334':'334px',
        '400': '400px',
        '450': '450px',
        '500': '500px',
        '600' : '600px',
        '650' : '650px',
        '700':  '700px',
        '750':  '750px',
        '800': '800px',
        '900': '900px',
        '1000': '1000px',
        '1100':'1100px',
        '1300':'1300px',
        '1400': '1400px',
        '1500': '1500px',
        '85': '400px',
        '97' : '385px',
        '98' : '386px',
        '99':  '399px',
        '100': '410px',
        '101': '420px',
       },


      screens: {

        '9px': '9px',

        '10px':'10px',

        '15px':'15px',

        'xs': '244px',

        'xs+': '344px',

        'xs++': '450px',

        'xs+++': '535px',

        'sm': '640px',
      // => @media (min-width: 640px) { ... }

        'md': '768px',

        'md+': '820px',

        'md++': '964px',
         
         'xmd': '868',
      // => @media (min-width: 768px) { ... }

       'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

       'lg+': '1120px',

       'xl': '1280px',

       'xl+': '1298px',

       'xl++': '1380px',
      // => @media (min-width: 1280px) { ... }
       '2xl': '1500px', 

        "3xl": "2100px",
      },

      fontWeight: {     
             hairline: 100,  
             'extra-light': 100,    
              thin: 200,   
              light: 300,  
              normal: 400,   
              medium: 520,  
              md: 520,
              semibold: 600,  
              bold: 700,    
              extrabold: 800,  
              'extra-bold': 900,    
              black: 900,
              },

      zIndex: {
        "-1": "-1",
      },

      fontFamily: {
        body: ["Open Sans", "system-ui", "sans-serif"],
        heading: ["Open Sans", "system-ui", "sans-serif"],
        mono: ['IBM Plex Mono', 'Menlo', 'monospace'],
        custom: ['"My Custom Font"', 'cursive'],
        roboto: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        source: ['Source Sans Pro', 'Helvetica', 'Arial', 'sans-serif'],
        playfair: ['Playfair Display', 'Georgia', 'serif'],
      },
      
      fontSize: {
        
        '5px': '0.313rem',
        '6px': '0.375rem',
        '7px': '0.438rem',
        '8px': '0.5rem',
        '9px': '0.563rem',
        "10px": "0.625rem",
        "11px": "0.688rem",
        "12px": "0.75rem",
        "13px": "0.813rem",
        "14px": "0.875rem",
        "15px": "0.938rem",
        
      },

      backgroundImage: {
        
        'hero-pattern': "url('/shops-frame.jpg')",
        'pink-footer': "url('/footer.jpg')",
        'india': "url('/india.jpg')",
        'drop-down': "url('/drop-down1.jpg')",
        'dark-bg': "url('/dark-bg.jpg')",
        'collage': "url('/collage.jpeg')",
        'ai' : "url('/ai.jpg')",

       },

       backgroundColor: theme => ({

        ...theme('colors'),
 
        'btn': '#e01d56',
 
        'plus': '#dfb054',
 
        'other': '#e3342f',
       }),


      colors: {
        'magenta': '#e01d56',
        'gold': '#dfb054',
        'mix': '#e3342f',
        light: withOpacity("--color-light"),
        dark: withOpacity("--color-dark"),
        accent: withOpacity("--color-accent"),
        "accent-hover": withOpacity("--color-accent-hover"),
        "accent-300": withOpacity("--color-accent-300"),
        "accent-400": withOpacity("--color-accent-400"),
        "accent-500": withOpacity("--color-accent-500"),
        "accent-600": withOpacity("--color-accent-600"),
        "accent-700": withOpacity("--color-accent-700"),
        "border-50": withOpacity("--color-border-50"),
        "border-100": withOpacity("--color-border-100"),
        "border-200": withOpacity("--color-border-200"),
        "border-base": withOpacity("--color-border-base"),
        "border-400": withOpacity("--color-border-400"),
        "gray-50": withOpacity("--color-gray-50"),
        "gray-100": withOpacity("--color-gray-100"),
        "gray-200": withOpacity("--color-gray-200"),
        "gray-300": withOpacity("--color-gray-300"),
        "gray-400": withOpacity("--color-gray-400"),
        "gray-500": withOpacity("--color-gray-500"),
        "gray-600": withOpacity("--color-gray-600"),
        "gray-700": withOpacity("--color-gray-700"),
        "gray-800": withOpacity("--color-gray-800"),
        "gray-900": withOpacity("--color-gray-900"),
        
        social: {
          facebook: "#3b5998",
          "facebook-hover": "#35508a",
          twitter: "#1da1f2",
          instagram: "#e1306c",
          youtube: "#ff0000",
          google: "#e9a82b",
          "google-hover": "#dfb054",
        },
      },

      textColor: {
        'product-price': '#e01d56',
        'discount': '#dfb054',
        body: withOpacity("--text-base"),
        "body-dark": withOpacity("--text-base-dark"),
        muted: withOpacity("--text-muted"),
        "muted-light": withOpacity("--text-muted-light"),
        heading: withOpacity("--text-heading"),
        "sub-heading": withOpacity("--text-sub-heading"),
        bolder: withOpacity("--text-text-bolder"),
      },

      minHeight: {
        580: "580px",
        140: "35rem", // 560px
        40: "10rem", // 140px
        6: "2.5rem",
      },

      height: {
        4.5: "1.125rem",
        13: "3.125rem",
        22: "5.25rem",
        30: "6.25rem",
        40: "10rem",
        50: "12.5rem",
        65: "16.25rem",
        66: "16.5rem",
        67: "16.75rem",
        68: "17rem",
        69: "17.25rem",
        60: "15rem",
        70: "17.5rem",
        71: "17.75rem",
        72: "18rem",
        73: "18.25rem",
        74: "18.5rem",
        75: "18.75rem",
        76: "19rem",
        80: "20rem",
        100:'30rem',
        110:'36.5rem',
        200:'42rem',
        210: '45rem',
        220:'48rem',

        double: "200%",
      },

      maxHeight: {
        "70vh": "70vh",
        "85vh": "85vh",
        140: "35rem", // 560px
      },

      maxWidth: {
        1920: "1920px",
      },

      minWidth: {
        150: "150px",
      },

      borderRadius: {
        DEFAULT: "5px",
      },

      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',

       '3': '3px',
        '4': '4px',

       '6': '6px',

       '8': '8px',
       '10': '10px',
       '12': '12px',
        '14': '14px',
        '16': '16px',
        '18': '18px',
        '20': '20px',

      },

      inset: {
        22: "5.25rem",
        23: "5.375rem",
        24: "5.5rem",
        25: "5.625rem",
        26: "5.75rem",
        30: "6.25rem",
        31: "6.375rem",
        37: "7.375rem",
        41: "8.125rem",
        42: "8.25rem",
        43: "8.375rem",
        44: "8.5rem",
        45: "8.625rem",
        46: "8.75rem",
        55: "10.25rem",
        56: "10.5rem",
        57: "10.75rem",
        58: "11rem",
        59: "11.25rem",
        61: "9.75rem",
      },

      strokeWidth: {
        2.5: "2.5",
      },

      boxShadow: {
        200: "rgba(0, 0, 0, 0.16) 0px 3px 6px",
        300: "rgba(0, 0, 0, 0.16) 0px 0px 6px",
        350: "rgba(0, 0, 0, 0.16) 0px 3px 6px",
        400: "rgba(0, 0, 0, 0.1) 0px 0px 8px 0",
        500: "rgba(0, 0, 0, 0.17) 0px 0px 12px",
        700: "rgba(0, 0, 0, 0.08) 0px 2px 16px",
        900: "rgba(0, 0, 0, 0.05) 0px 21px 36px",
        // red boxShadow
        red: "rgba(255, 0, 0, 0.16) 0px 3px 6px",
      },

    },
  },
  
  plugins: [require("tailwindcss-rtl"),
            require('tailwind-scrollbar-hide')
          ],
};
