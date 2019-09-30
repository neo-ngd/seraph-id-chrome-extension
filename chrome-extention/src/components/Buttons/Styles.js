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
    marginRight: '12px',
  },
  rejectButton: {
    background: 'linear-gradient(90deg, #90908D 0%, #F2F2F2 100%)',
  },
  arrowRight: {
    fontSize: 24,
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#FFF',
  },
  smallButton: {
    height: '22px',
    fontSize: '10px',
    marginBottom: spacing(1),
    padding: '0 8px',
  },
  smallArrowRight: {
    fontSize: '12px',
    top: '3px',
  }
}));
