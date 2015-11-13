import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';
import Coverflow from '../../src/Coverflow';

ReactDOM.render(
  <Coverflow
    width={960}
    height={480}
    displayQuantityOfSide={2}
    navigation={false}
    enableHeading={false}
    >
    <img src='images/album-1.png' alt='Album one' url="https://facebook.github.io/react/"/>
    <img src='images/album-2.png' alt='Album two' url="http://passer.cc"/>
    <img src='images/album-3.png' alt='Album three' url="https://doce.cc/"/>
    <img src='images/album-4.png' alt='Album four' url="http://tw.yahoo.com"/>
    <img src='images/album-5.png' alt='Album five' url="http://www.bbc.co.uk"/>
    <img src='images/album-6.png' alt='Album six' url="https://medium.com"/>
    <img src='images/album-7.png' alt='Album seven' url="http://www.google.com"/>
    <img src='images/album-1.png' alt='Album one' url="https://facebook.github.io/react/"/>
    <img src='images/album-2.png' alt='Album two' url="http://passer.cc"/>
    <img src='images/album-3.png' alt='Album three' url="https://doce.cc/"/>
    <img src='images/album-4.png' alt='Album four' url="http://tw.yahoo.com"/>
    <img src='images/album-5.png' alt='Album five' url="http://www.bbc.co.uk"/>
    <img src='images/album-6.png' alt='Album six' url="https://medium.com"/>
    <img src='images/album-7.png' alt='Album seven' url="http://www.google.com"/>
    <img src='images/album-1.png' alt='Album one' url="https://facebook.github.io/react/"/>
    <img src='images/album-2.png' alt='Album two' url="http://passer.cc"/>
    <img src='images/album-3.png' alt='Album three' url="https://doce.cc/"/>
    <img src='images/album-4.png' alt='Album four' url="http://tw.yahoo.com"/>
    <img src='images/album-5.png' alt='Album five' url="http://www.bbc.co.uk"/>
    <img src='images/album-6.png' alt='Album six' url="https://medium.com"/>
    <img src='images/album-7.png' alt='Album seven' url="http://www.google.com"/>
    <img src='images/album-1.png' alt='Album one' url="https://facebook.github.io/react/"/>
    <img src='images/album-2.png' alt='Album two' url="http://passer.cc"/>
    <img src='images/album-3.png' alt='Album three' url="https://doce.cc/"/>
    <img src='images/album-4.png' alt='Album four' url="http://tw.yahoo.com"/>
    <img src='images/album-5.png' alt='Album five' url="http://www.bbc.co.uk"/>
    <img src='images/album-6.png' alt='Album six' url="https://medium.com"/>
    <img src='images/album-7.png' alt='Album seven' url="http://www.google.com"/>

  </Coverflow>,

  document.querySelector('.example_1')
);

ReactDOM.render(
  <Coverflow
    displayQuantityOfSide={2}
    navigation={true}
    enableHeading={true}
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
    <img src='images/album-1.png' alt='Album one' url="https://facebook.github.io/react/"/>
    <img src='images/album-2.png' alt='Album two' url="http://passer.cc"/>
    <img src='images/album-3.png' alt='Album three' url="https://doce.cc/"/>
    <img src='images/album-4.png' alt='Album four' url="http://tw.yahoo.com"/>
  </Coverflow>
  ,
  document.querySelector('.example_2')
);
