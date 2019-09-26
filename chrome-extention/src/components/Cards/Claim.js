import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import ReactJson from 'react-json-view';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: 'solid 1px rgba(255, 255, 255, 0.1)'
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {},
}));

export default function RecipeReviewCard({ id, schema, content }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }


  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon color={'#FFFFFF'} fontSize="large" />
          </IconButton>
        }
        title={schema}
        subheader={id}
        subheaderTypographyProps={{
          color: '#00BF0B',
          fontSize: "10px"
        }}
        titleTypographyProps={{
          fontSize: "14px"
        }}
      />

      <CardActions disableSpacing></CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ReactJson
            displayObjectSize={false}
            displayDataTypes={false}
            src={content}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
