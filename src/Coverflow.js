/**
 * React Coverflow
 *
 * Author: andyyou
 */
import React from 'react';
import styles from './stylesheets/coverflow';

React.initializeTouchEvents(true);

var TOUCH = {move: false, 
  lastX: 0,
  sign: 0,
  lastMove: 0
};
var TRANSITIONS = [
  'transitionend',
  'oTransitionEnd',
  'otransitionend',
  'MSTransitionEnd',
  'webkitTransitionEnd'
];
var HandleAnimationState = function() {
  this._removePointerEvents();
};

class Coverflow extends React.Component {
  /**
   * Life cycle events
   */
  constructor(props) {
    super(props);

    this.state = {
      current: this._center(),
      move: 0
    };
  }

  componentDidMount() {
    let length = React.Children.count(this.props.children);
    
    TRANSITIONS.forEach(event => {
      for (let i = 0; i < length; i++) {
        var figureID = `figure_${i}`;
        this.refs[figureID].getDOMNode().addEventListener(event, HandleAnimationState.bind(this));
      }
    });
  }

  componentWillUnmount() {
    let length = React.Children.count(this.props.children);
    
    TRANSITIONS.forEach(event => {
      for (let i = 0; i < length; i++) {
        var figureID = `figure_${i}`;
        this.refs[figureID].getDOMNode().removeEventListener(event, HandleAnimationState.bind(this));
      }
    });
  }

  render() {
    const {width, height} = this.props;

    return (
      <div className={styles.container} 
           style={{width: `${width}px`, height: `${height}px`}}
           onWheel={this._handleWheel.bind(this)}
           onTouchStart={this._handleTouchStart.bind(this)}
           onTouchMove={this._handleTouchMove.bind(this)}
           >
        <div className={styles.coverflow}>
          <div className={styles.preloader}></div>
          <div className={styles.stage} ref="stage">
              {this._renderFigureNodes()}
          </div>
          {
            this.props.navigation &&
            (
              <div className={styles.actions}>
                <button type="button" className={styles.button} onClick={ this._handlePrevFigure.bind(this) }>Previous</button>
                <button type="button" className={styles.button} onClick={ this._handleNextFigure.bind(this) }>Next</button>
              </div>
            )
          }
        </div>
        
      </div>
    );
  }

  /**
   * Private methods
   */
  _center() {
    let length = React.Children.count(this.props.children);
    return Math.floor(length / 2);
  }

  _handleFigureStyle(index, current) {
    const {width, displayQuantityOfSide} = this.props;
    let style = {}; 
    let center = this._center();
    let baseWidth = width / (displayQuantityOfSide * 2 + 1);
    
    // Handle opacity
    let depth = displayQuantityOfSide - Math.abs(current - index);
    let opacity = depth === 1 ? 0.95 : 0.5;
    opacity = depth === 2 ? 0.92 : opacity;
    opacity = depth === 3 ? 0.9 : opacity;
    opacity = current === index ? 1 : opacity;
    
    // Handle translateX
    if (index === current) {
      style['width'] = `${baseWidth}px`;
      style['transform'] = `translateX(${this.state.move}px) scale(1.2)`;
      style['zIndex'] = `${10 - depth}`;
      style['opacity'] = opacity;
    } else if (index < current) {
      // Left side
      style['width'] = `${baseWidth}px`;
      style['transform'] = `translateX(${this.state.move}px) rotateY(40deg)`;
      style['zIndex'] = `${10 - depth}`;
      style['opacity'] = opacity;
    } else if (index > current) {
      // Right side
      style['width'] = `${baseWidth}px`;
      style['transform'] = ` translateX(${this.state.move}px) rotateY(-40deg)`;
      style['zIndex'] = `${10 - depth}`;
      style['opacity'] = opacity;
    }
    return style;
  }

  _handleFigureClick(index, url, e) {
    e.preventDefault();
    this.refs.stage.getDOMNode().style['pointerEvents'] = 'none';
   
    if (this.state.current === index) {
      // TODO: support lightbox.
      window.open(url, '_blank');
    } else {
      const {width, displayQuantityOfSide} = this.props;
      let baseWidth = width / (displayQuantityOfSide * 2 + 1);
      let distance = this._center() - index;
      let move = distance * baseWidth;
      this.setState({current: index, move: move});
    }
  }

  _renderFigureNodes() {
    let figureNodes = React.Children.map(this.props.children, (child, index) => {
      let figureElement = React.cloneElement(child, {className: styles.cover});
      let style = this._handleFigureStyle(index, this.state.current);
      return (
        <figure className={styles.figure} 
          key={index}
          style={style}
          onClick={ this._handleFigureClick.bind(this, index, figureElement.props.url) }
          ref={`figure_${index}`}
          >
          {figureElement}
          <div className={styles.text}>{figureElement.props.alt}</div>
        </figure>
      );
    });
    return figureNodes;
  }

  _removePointerEvents() {
    this.refs.stage.getDOMNode().style['pointerEvents'] = 'auto';
  }

  _handlePrevFigure() {
    const {width, displayQuantityOfSide} = this.props;
    let current = this.state.current;
    let baseWidth = width / (displayQuantityOfSide * 2 + 1);
    let distance = this._center() - (current - 1);
    let move = distance * baseWidth;

    if (current - 1 >= 0) {
      this.setState({ current: current - 1, move: move });
      TOUCH.lastMove = move;
    }
  }

  _handleNextFigure() {
    const {width, displayQuantityOfSide} = this.props;
    let current = this.state.current;
    let baseWidth = width / (displayQuantityOfSide * 2 + 1);
    let distance = this._center() - (current + 1);
    let move = distance * baseWidth;

    if (current + 1 < this.props.children.length) {
      this.setState({ current: current + 1, move: move });
      TOUCH.lastMove = move;
    }
  }

  _handleWheel(e) {
    e.preventDefault();

    let delta = e.deltaY * (-120);
    let count = Math.ceil(Math.abs(delta) / 120);

    if (count > 0) {
      const sign = Math.abs(delta) / delta;
      let func = null;

      if (sign > 0) {
        func = this._handlePrevFigure.bind(this);
      } else if (sign < 0) {
        func = this._handleNextFigure.bind(this);
      }

      if (typeof func === 'function') {
        for (let i = 0; i < count; i++) func();
      }
    }
  }

  _handleTouchStart(e) {
    console.log('start: ', e.nativeEvent.touches);
    TOUCH.lastX = e.nativeEvent.touches[0].clientX;
    TOUCH.lastMove = this.state.move;
  }

  _handleTouchMove(e) {
    e.preventDefault();
    const {width, displayQuantityOfSide} = this.props;

    let clientX = e.nativeEvent.touches[0].clientX;
    let lastX = TOUCH.lastX;
    let baseWidth = width / (displayQuantityOfSide * 2 + 1);
    let move = clientX - lastX;
    let totalMove = TOUCH.lastMove - move;
    let sign = Math.abs(move) / move;
    
    if (Math.abs(totalMove) >= baseWidth) {
      let func = null;
      if (sign > 0) {
        func = this._handlePrevFigure.bind(this);
      } else if (sign < 0) {
        func = this._handleNextFigure.bind(this);
      }
      if (typeof func === 'function') {
        func();
      }
    }
  }
};

export default Coverflow;