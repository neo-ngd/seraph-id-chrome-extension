import React from 'react';
import { Box } from '@material-ui/core';

function Layout({ children, justifyStart, padding }) {
  return (
    <Box
      justifyContent={justifyStart ? 'flex-start' : 'space-between'}
      display="flex"
      flexDirection="column"
      height="100%"
      flex={'0 0 100%'}
      padding={padding}
      overflow-y="auto"
    >
      {children}
    </Box>
  );
}

export default Layout;
