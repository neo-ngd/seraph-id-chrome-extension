import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }) => ({
  button: {
    borderRadius: '20px',
    height: '46px',
    background: 'linear-gradient(90deg, #00BF0B 0%, #B5E200 100%)',
    boxShadow: 'none',
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    width: '100%',
  },
  arrowRight: {
    fontSize: 24,
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#FFF',
  },
}));
