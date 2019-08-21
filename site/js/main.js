/* eslint-disable */
import React, { Component } from 'react';
import { render } from 'react-dom';
import { StyleRoot } from 'radium';
import Coverflow from '../../src/Coverflow';

const fn = () => {
  console.log('Album one');
};

render(
  <Coverflow
    width={960}
    height={480}
    displayQuantityOfSide={2}
    navigation={false}
    enableHeading={false}
    vertical
  >
    <div onClick={() => fn()} onKeyDown={() => fn()} role="menuitem" tabIndex="0">
      <img src="images/album-1.png" alt="Album one" style={{ display: 'block', width: '100%' }} />
    </div>
    <img src="images/album-2.png" alt="Album two" data-action="http://passer.cc" />
    <img src="images/album-3.png" alt="Album three" data-action="https://doce.cc/" />
    <img src="images/album-4.png" alt="Album four" data-action="http://tw.yahoo.com" />
    <img src="images/album-5.png" alt="Album five" data-action="http://www.bbc.co.uk" />
    <img src="images/album-6.png" alt="Album six" data-action="https://medium.com" />
    <img src="images/album-7.png" alt="Album seven" data-action="http://www.google.com" />
    <img src="images/album-1.png" alt="Album one" data-action="https://facebook.github.io/react/" />
    <img src="images/album-2.png" alt="Album two" data-action="http://passer.cc" />
    <img src="images/album-3.png" alt="Album three" data-action="https://doce.cc/" />
    <img src="images/album-4.png" alt="Album four" data-action="http://tw.yahoo.com" />
    <img src="images/album-5.png" alt="Album five" data-action="http://www.bbc.co.uk" />
    <img src="images/album-6.png" alt="Album six" data-action="https://medium.com" />
    <img src="images/album-7.png" alt="Album seven" data-action="http://www.google.com" />
    <img src="images/album-1.png" alt="Album one" data-action="https://facebook.github.io/react/" />
    <img src="images/album-2.png" alt="Album two" data-action="http://passer.cc" />
    <img src="images/album-3.png" alt="Album three" data-action="https://doce.cc/" />
    <img src="images/album-4.png" alt="Album four" data-action="http://tw.yahoo.com" />
    <img src="images/album-5.png" alt="Album five" data-action="http://www.bbc.co.uk" />
    <img src="images/album-6.png" alt="Album six" data-action="https://medium.com" />
    <img src="images/album-7.png" alt="Album seven" data-action="http://www.google.com" />
    <img src="images/album-1.png" alt="Album one" data-action="https://facebook.github.io/react/" />
    <img src="images/album-2.png" alt="Album two" data-action="http://passer.cc" />
    <img src="images/album-3.png" alt="Album three" data-action="https://doce.cc/" />
    <img src="images/album-4.png" alt="Album four" data-action="http://tw.yahoo.com" />
    <img src="images/album-5.png" alt="Album five" data-action="http://www.bbc.co.uk" />
    <img src="images/album-6.png" alt="Album six" data-action="https://medium.com" />
    <img src="images/album-7.png" alt="Album seven" data-action="http://www.google.com" />
  </Coverflow>,

  document.querySelector('.example_1'),
);

render(
  <StyleRoot>
    <Coverflow
      displayQuantityOfSide={2}
      navigation
      enableHeading
      infiniteScroll
      media={{
        '@media screen and (min-width: 900px)': {
          width: '960px',
          height: '600px',
        },
        '@media screen and (max-width: 900px)': {
          width: '600px',
          height: '300px',
        },
      }}
    >
      <img
        src="images/album-1.png"
        alt="Album one"
        data-action="https://facebook.github.io/react/"
      />
      <img src="images/album-2.png" alt="Album two" data-action="http://passer.cc" />
      <img src="images/album-3.png" alt="Album three" data-action="https://doce.cc/" />
      <img src="images/album-4.png" alt="Album four" data-action="http://tw.yahoo.com" />
    </Coverflow>
  </StyleRoot>,
  document.querySelector('.example_2'),
);

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
    };
  }

  _handleClick = () => {
    console.log('go');
    const num = ~~(Math.random() * 10);
    this.setState({
      active: num,
    });
  };

  render() {
    return (
      <div>
        <div style={{ width: '960px', marginLeft: 'auto', marginRight: 'auto' }}>
          <button
            style={{
              borderWidth: '0',
              backgroundColor: '#333',
              color: 'white',
              padding: '10px',
              float: 'right',
              borderRadius: '5px',
              marginBottom: '20px',
            }}
            onClick={() => this._handleClick()}
          >
            Click to Randomize
          </button>
        </div>
        <Coverflow
          width={960}
          height={480}
          displayQuantityOfSide={2}
          navigation
          enableHeading={false}
          active={this.state.active}
        >
          <div onClick={() => fn()} onKeyDown={() => fn()} role="menuitem" tabIndex="0">
            <img
              src="images/album-1.png"
              alt="Album one"
              style={{ display: 'block', width: '100%' }}
            />
          </div>
          <img src="images/album-2.png" alt="Album two" data-action="http://passer.cc" />
          <img src="images/album-3.png" alt="Album three" data-action="https://doce.cc/" />
          <img src="images/album-4.png" alt="Album four" data-action="http://tw.yahoo.com" />
          <img src="images/album-5.png" alt="Album five" data-action="http://www.bbc.co.uk" />
          <img src="images/album-6.png" alt="Album six" data-action="https://medium.com" />
          <img src="images/album-7.png" alt="Album seven" data-action="http://www.google.com" />
          <img
            src="images/album-1.png"
            alt="Album one"
            data-action="https://facebook.github.io/react/"
          />
          <img src="images/album-2.png" alt="Album two" data-action="http://passer.cc" />
          <img src="images/album-3.png" alt="Album three" data-action="https://doce.cc/" />
          <img src="images/album-4.png" alt="Album four" data-action="http://tw.yahoo.com" />
        </Coverflow>
      </div>
    );
  }
}

render(<Container />, document.querySelector('.example_4'));
