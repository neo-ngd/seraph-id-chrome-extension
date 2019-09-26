import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    display: 'flex',
    backgroundColor: '#FFF',
    borderRadius: '3px',
    height: '40px',
    color: theme.palette.text.light,
    fontSize: 14,
    paddingLeft: theme.spacing(1)
  },
}));

export default function PasswordInput({ value, handleChange, minLength }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <InputBase
      id="outlined-adornment-password"
      className={clsx(classes.textField)}
      type={showPassword ? 'text' : 'password'}
      placeholder="Password"
      value={value}
      onChange={handleChange('password')}
    />
  );
}
