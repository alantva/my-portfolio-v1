import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import Logo from '../commons/Logo';

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
});

const styles = {
  appRoot: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
};

class App extends Component {
  state = {
    sizes: {
      width: -1,
      height: -1
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  handleResize() {
    this.setState({
      sizes: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  render() {
    const { classes } = this.props;
    const { sizes } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.appRoot} style={sizes}>
          <Logo />
        </div>
      </MuiThemeProvider>
    );
  }
};

export default withStyles(styles)(App);
