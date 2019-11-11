// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React from 'react';
import ReactJson from 'react-json-view';

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
