import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Shuffle from './Shuffle';

const styles = theme => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    flexGrow: 1,
    fontSize: 72,
    color: theme.palette.primary.contrastText
  },
  animate: {
    animation: 'shiny infinite 1s alternate'
  },
  '@keyframes shiny': {
    '0%': {
      textShadow: '0 0 20px'
    },
    '100%': {
      fontSize: 80,
      textShadow: '0 0 20px black'
    }
  }
});

const Logo = ({ classes }) => (
  <Paper className={classes.paper} square>
    <Shuffle className={classes.animate} title={'<Pulse/>'} shuffleDelay={100} restartDelay={4000} />
  </Paper>
);

Logo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Logo);
