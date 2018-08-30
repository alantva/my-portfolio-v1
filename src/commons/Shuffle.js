import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Shuffle extends Component {
  state = {
    isScrambling: false,
    originalArray: [],
    shuffledArray: []
  }

  static defaultProps = { restartDelay: 0 };

  static propTypes = {
    title: PropTypes.string.isRequired,
    shuffleDelay: PropTypes.number.isRequired,
    restartDelay: PropTypes.number
  }

  shuffle = () =>
    new Promise(resolve => {
      const { title } = this.props;
      const originalArray = title.split('');
      const tempArray = [...originalArray];
      const shuffledArray = [];
      while(tempArray.length) {
        const [removedValue] = tempArray.splice(Math.floor(Math.random() * tempArray.length), 1);
        shuffledArray.push(removedValue);
      }
      this.setState({ isScrambling: false, originalArray, shuffledArray }, () => resolve());
    }).catch(err => console.error(err));

  swapValues = (wantedIndex, currentIndex) =>
    new Promise(resolve => {
      const { shuffleDelay } = this.props;
      const { originalArray, shuffledArray } = this.state;
      const actual = currentIndex;
      const before = actual - 1;
      const wantedValue = originalArray[wantedIndex];
      const currentValue = shuffledArray[actual];
      const tempValue = shuffledArray[before];
      if (wantedValue !== currentValue) return resolve();
      shuffledArray[before] = currentValue;
      shuffledArray[actual] = tempValue;
      this.setState({ shuffledArray, isScrambling: true }, () => setTimeout(resolve, shuffleDelay));
    }).catch(err => console.error(err));

  unscrumble = async () => {
    const { restartDelay } = this.props;
    const { originalArray } = this.state;
    for (let i = 0; i < originalArray.length - 1; i++) {
      for (let j = originalArray.length - 1; j > i; j--) await this.swapValues(i, j);
    }
    this.setState({ isScrambling: false }, () => restartDelay && setTimeout(() => this.initShuffle(), restartDelay));
  }

  initShuffle = () => this.shuffle().then(() => this.unscrumble());

  componentDidMount = () => this.initShuffle();

  render = () => (<div className={this.props.className}>{this.state.shuffledArray.join('')}</div>);
};

export default Shuffle;
