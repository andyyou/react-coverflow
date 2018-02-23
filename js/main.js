import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Coverflow from '../../src/Coverflow';
import { StyleRoot } from 'radium';

var fn = () => {
  console.log('Album one');
};

ReactDOM.render(

  <Coverflow
    width={960}
    height={480}
    displayQuantityOfSide={2}
    navigation={true}
    enableHeading={false}
    clickable={true}
    currentFigureScale={1.5}
    otherFigureScale={0.8}
  >
    <img src='images/album-1.png' alt='Album one' data-action="fn()" />
    <img src='images/album-2.png' alt='Album two' data-action="http://passer.cc"/>
    <img src='images/album-3.png' alt='Album three' data-action="https://doce.cc/"/>
    <img src='images/album-4.png' alt='Album four' data-action="http://tw.yahoo.com"/>
    <img src='images/album-5.png' alt='Album five' data-action="http://www.bbc.co.uk"/>
    <img src='images/album-6.png' alt='Album six' data-action="https://medium.com"/>
    <img src='images/album-7.png' alt='Album seven' data-action="http://www.google.com"/>
    <img src='images/album-1.png' alt='Album one' data-action="https://facebook.github.io/react/"/>
    <img src='images/album-2.png' alt='Album two' data-action="http://passer.cc"/>
    <img src='images/album-3.png' alt='Album three' data-action="https://doce.cc/"/>
    <img src='images/album-4.png' alt='Album four' data-action="http://tw.yahoo.com"/>
    <img src='images/album-5.png' alt='Album five' data-action="http://www.bbc.co.uk"/>
    <img src='images/album-6.png' alt='Album six' data-action="https://medium.com"/>
    <img src='images/album-7.png' alt='Album seven' data-action="http://www.google.com"/>
    <img src='images/album-1.png' alt='Album one' data-action="https://facebook.github.io/react/"/>
    <img src='images/album-2.png' alt='Album two' data-action="http://passer.cc"/>
    <img src='images/album-3.png' alt='Album three' data-action="https://doce.cc/"/>
    <img src='images/album-4.png' alt='Album four' data-action="http://tw.yahoo.com"/>
    <img src='images/album-5.png' alt='Album five' data-action="http://www.bbc.co.uk"/>
    <img src='images/album-6.png' alt='Album six' data-action="https://medium.com"/>
    <img src='images/album-7.png' alt='Album seven' data-action="http://www.google.com"/>
    <img src='images/album-1.png' alt='Album one' data-action="https://facebook.github.io/react/"/>
    <img src='images/album-2.png' alt='Album two' data-action="http://passer.cc"/>
    <img src='images/album-3.png' alt='Album three' data-action="https://doce.cc/"/>
    <img src='images/album-4.png' alt='Album four' data-action="http://tw.yahoo.com"/>
    <img src='images/album-5.png' alt='Album five' data-action="http://www.bbc.co.uk"/>
    <img src='images/album-6.png' alt='Album six' data-action="https://medium.com"/>
    <img src='images/album-7.png' alt='Album seven' data-action="http://www.google.com"/>

  </Coverflow>,

  document.querySelector('.example_1')
);

ReactDOM.render(
  <StyleRoot>
    <Coverflow
      displayQuantityOfSide={2}
      navigation={true}
      enableHeading={true}
      active={3}
      media={{
        '@media (max-width: 900px)': {
          width: '600px',
          height: '300px'
        },
        '@media (min-width: 900px)': {
          width: '960px',
          height: '600px'
        }
      }}
    >
      <img src='images/album-1.png' alt='Album one' data-action="https://facebook.github.io/react/"/>
      <img src='images/album-2.png' alt='Album two' data-action="http://passer.cc"/>
      <img src='images/album-3.png' alt='Album three' data-action="https://doce.cc/"/>
      <img src='images/album-4.png' alt='Album four' data-action="http://tw.yahoo.com"/>
    </Coverflow>
  </StyleRoot>
  ,
  document.querySelector('.example_2')
);

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0
    };
  }

  _handleClick = () => {
    console.log('go');
    var num = Math.floor((Math.random() * 10) + 1);
    this.setState({
      active: num
    });
  }

  render() {
    return (
      <div>
        <div style={{width: '960px', marginLeft: 'auto', marginRight: 'auto'}}>
          <button
            style={{
              borderWidth: '0',
              backgroundColor: '#333',
              color: 'white',
              padding: '10px',
              float: 'right',
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px'
            }}
            onClick={() => this._handleClick()}>
            Click to Radom
          </button>
        </div>
        <Coverflow
          width={960}
          height={480}
          displayQuantityOfSide={2}
          navigation={true}
          enableHeading={false}
          active={this.state.active}
        >
          <img src='images/album-1.png' alt='Album one' data-action="fn()" />
          <img src='images/album-2.png' alt='Album two' data-action="http://passer.cc"/>
          <img src='images/album-3.png' alt='Album three' data-action="https://doce.cc/"/>
          <img src='images/album-4.png' alt='Album four' data-action="http://tw.yahoo.com"/>
          <img src='images/album-5.png' alt='Album five' data-action="http://www.bbc.co.uk"/>
          <img src='images/album-6.png' alt='Album six' data-action="https://medium.com"/>
          <img src='images/album-7.png' alt='Album seven' data-action="http://www.google.com"/>
          <img src='images/album-1.png' alt='Album one' data-action="https://facebook.github.io/react/"/>
          <img src='images/album-2.png' alt='Album two' data-action="http://passer.cc"/>
          <img src='images/album-3.png' alt='Album three' data-action="https://doce.cc/"/>
          <img src='images/album-4.png' alt='Album four' data-action="http://tw.yahoo.com"/>
        </Coverflow>
      </div>
    );
  }
};

ReactDOM.render(
  <Container></Container>,
  document.querySelector('.example_4')
);
