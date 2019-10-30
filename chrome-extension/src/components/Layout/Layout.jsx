// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@material-ui/core';

/**
 * <Layout />
 * Base layout component.
 * It adds the flexbox container and handle the loading state.
 * @param children
 * @param justifyStart
 * @param padding
 * @param isLoading
 * @return {*}
 * @constructor
 */
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
        <Box
          style={{
            margin: 'auto',
          }}
        >
          <CircularProgress style={{ color: '#00e599' }} />
        </Box>
      ) : (
        children
      )}
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  justifyStart: PropTypes.bool,
  padding: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Layout;
