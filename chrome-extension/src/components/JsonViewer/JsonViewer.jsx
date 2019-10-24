import React from 'react';
import ReactJson from 'react-json-view';
import viewerTheme from './theme';

const JsonViewer = ({ content }) => (
  <ReactJson
    theme={viewerTheme}
    collapseStringsAfterLength={20}
    displayObjectSize={false}
    displayDataTypes={false}
    enableClipboard={false}
    src={content}
  />
);

export default JsonViewer;
