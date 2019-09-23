import { useState } from 'react';

export default function useText() {
  const [password, setPassword] = useState('');

  const handleChange = (name) => (event) => {
    setPassword(event.target.value);
  };

  return { password, handleChange };
}
