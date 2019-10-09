import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@material-ui/core';

const Layout = ({ children, justifyStart, padding, isLoading }) => {
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
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  justifyStart: PropTypes.bool,
  padding: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Layout;
