import { createTheme } from '@mantine/core';

export const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: 'Verdana, sans-serif',
  
  // Define default component properties
  components: {
    // This will apply to EVERY Paper component in the app
    Paper: {
      defaultProps: {
        withBorder: true,
        p: 'xl',
        radius: 'md',
        shadow: 'md',
        // This is the magic. We set the default background here.
        bg: 'dark.6' 
      },
    },
    // This will apply to EVERY Card component in the app
    Card: {
        defaultProps: {
            withBorder: true,
            p: 'lg',
            radius: 'md',
            shadow: 'sm',
            bg: 'dark.6'
        }
    },
    // This forces ALL Text components to be a readable color
    Text: {
        defaultProps: {
            c: 'gray.2'
        }
    },
    // This forces ALL Title components to be pure white
    Title: {
        defaultProps: {
            c: 'white'
        }
    },
  },
});