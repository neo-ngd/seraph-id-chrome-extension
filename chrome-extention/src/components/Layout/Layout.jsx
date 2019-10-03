import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

function Layout({ children, justifyStart, padding, isLoading }) {
  return (
    <Box
      justifyContent={justifyStart ? 'flex-start' : 'space-between'}
      display="flex"
      flexDirection="column"
      height="100%"
      flex={'0 0 100%'}
      padding={padding}
      overflow="hidden"
      maxWidth="100%"
    >
      {isLoading ? (
        <Box style={{
          margin: 'auto',
        }}>
          <CircularProgress style={{ color: 'white' }} />
        </Box>
      ) : children }
    </Box>
  );
}

export default Layout;
