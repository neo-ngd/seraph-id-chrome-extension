import React from 'react';
import ReactJson from 'react-json-view';
import viewerTheme from './theme';

const JsonViewer = ({ content }) => (
  <ReactJson
    theme="bright:inverted"
    collapseStringsAfterLength={20}
    displayObjectSize={false}
    displayDataTypes={false}
    enableClipboard={false}
    src={content}
    style={{ fontSize: '12px' }}
  />
);

export default JsonViewer;
