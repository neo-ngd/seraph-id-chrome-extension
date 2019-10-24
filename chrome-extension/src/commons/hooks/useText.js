// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import { useState } from 'react';

/**
 * useText hook
 * Return the password and the handler to change it.
 * @return {{password: *, handleChange: *}}
 */
export default function useText() {
  const [password, setPassword] = useState('');

  const handleChange = (name) => (event) => {
    setPassword(event.target.value);
  };

  return { password, handleChange };
}
