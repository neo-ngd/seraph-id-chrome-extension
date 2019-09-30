import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, CardHeader, CardContent, Collapse, IconButton, Box } from '@material-ui/core';
import { Close, ExpandMore } from '@material-ui/icons';
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
    color: theme.palette.text.primary,
    fontSize: '28px',
    padding: 0,
    marginRight: theme.spacing(1),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {},
  title: {
    fontSize: '14px',
  },
  subheader: {
    fontSize: '8px',
    paddingTop: theme.spacing(0.5),
    color: theme.palette.text.hint,
  },
  removeIcon: {
    color: theme.palette.text.secondary,
    padding: 0,
    fontSize: '12px',
  },
  root: {
    padding: '16px 0 8px',
    marginRight: theme.spacing(1),
  },
  action: {
    marginTop: theme.spacing(1) + theme.spacing(0.5),
    paddingRight: theme.spacing(1),
  }
}));

export default function RecipeReviewCard({ id, schema, content }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleRemoveClick = () => {
  }

  const renderActionIcons = () => (
    <Box>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        disableRipple
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMore color="inherit" fontSize="inherit" />
      </IconButton>

      <IconButton
        className={classes.removeIcon}
        disableRipple
        onClick={handleRemoveClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <Close color="inherit" fontSize="inherit" />
      </IconButton>
    </Box>
  )


  return (
    <Card className={classes.card}>
      <CardHeader
        action={renderActionIcons()}
        classes={{
          root: classes.root,
          title: classes.title,
          subheader: classes.subheader,
          action: classes.action,
        }}
        title={schema}
        subheader={id}
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ReactJson
            displayObjectSize={false}
            displayDataTypes={false}
            enableClipboard={false}
            src={content}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
