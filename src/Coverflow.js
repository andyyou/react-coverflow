/* eslint-disable */
/**
 * React Coverflow
 *
 * Author: andyyou & asalem1
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import styles from './stylesheets/coverflow';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let TOUCH = {
  move: false,
  lastX: 0,
  sign: 0,
  lastMove: 0,
};

let TRANSITIONS = [
  'transitionend',
  'oTransitionEnd',
  'otransitionend',
  'MSTransitionEnd',
  'webkitTransitionEnd',
];

let HandleAnimationState = function() {
  this._removePointerEvents();
};

class Coverflow extends Component {
  /**
   * Life cycle events
   */
  constructor(props) {
    super(props);
    this.state = {
      current: this._center(),
      move: 0,
      width: this.props.width || 'auto',
      height: this.props.height || 'auto',
    };
  }
  
  static propTypes = {
    children: PropTypes.node.isRequired,
    displayQuantityOfSide: PropTypes.number.isRequired,
    navigation: PropTypes.bool,
    enableHeading: PropTypes.bool,
    enableScroll: PropTypes.bool,
    clickable: PropTypes.bool,
    currentFigureScale: PropTypes.number,
    otherFigureScale: PropTypes.number,
    active: PropTypes.number,
    media: PropTypes.object,
    infiniteScroll: PropTypes.bool,
  };

  static defaultProps = {
    navigation: false,
    enableHeading: true,
    enableScroll: true,
    clickable: true,
    currentFigureScale: 1.5,
    otherFigureScale: .8,
    media: {},
    infiniteScroll: false,
  };

  componentDidMount() {
    this.updateDimensions();
    let length = React.Children.count(this.props.children);

    TRANSITIONS.forEach(event => {
      for (let i = 0; i < length; i++) {
        let figureID = `figure_${i}`;
        this.refs[figureID].addEventListener(event, HandleAnimationState.bind(this));
      }
    });
    
    // const eventListener = window && window.addEventListener;
    
    // if(eventListener) {
    //   window.addEventListener('resize', this.updateDimensions.bind(this));
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.updateDimensions(nextProps.active);
    }
  }

  componentWillUnmount() {
    let length = React.Children.count(this.props.children);

    TRANSITIONS.forEach(event => {
      for (let i = 0; i < length; i++) {
        let figureID = `figure_${i}`;
        this.refs[figureID].removeEventListener(event, HandleAnimationState.bind(this));
      }
    });

    // const removeListener = window && window.removeEventListener;

    // if(removeListener) {
    //   window.removeEventListener('resize', this.updateDimensions.bind(this));
    // } 
  }

  updateDimensions(active) {
    const { displayQuantityOfSide } = this.props;
    let length = React.Children.count(this.props.children);
    let center = this._center();
    let state = {
      width: ReactDOM.findDOMNode(this).offsetWidth,
      height: ReactDOM.findDOMNode(this).offsetHeight,
    };
    let baseWidth = state.width / (displayQuantityOfSide * 2 + 1);
    let activeImg = (typeof active === 'number') ? active : this.props.active;
    if (typeof active === 'number' && ~~active < length) {
      activeImg = ~~active;
      let move = 0;
      move = baseWidth * (center - activeImg);

      state = Object.assign({}, state, {
        current: active,
        move,
      });
    }
    this.setState(state);
  }

  render() {
    const { enableScroll, navigation, infiniteScroll } = this.props;
    const { width, height, current } = this.state;
    let renderPrevBtn = infiniteScroll ? true : current > 0;
    let renderNextBtn = infiniteScroll ? true : current < this.props.children.length - 1;
    return (
      <div
        className={styles.container}
        style={[{width: `${width}px`, height: `${height}px`}, this.props.media]}
        onWheel={enableScroll ? this._handleWheel.bind(this) : null}
        onTouchStart={this._handleTouchStart.bind(this)}
        onTouchMove={this._handleTouchMove.bind(this)}
        onKeyDown={this._keyDown.bind(this)}
        tabIndex="-1"
      >
        <div className={styles.coverflow}>
          <div className={styles.preloader}></div>
          <div className={styles.stage} ref="stage">
            {this._renderFigureNodes()}
          </div>
          {
            navigation &&
              <div className={styles.actions}>
                {renderPrevBtn &&
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => this._handlePrevFigure() }
                  >
                    Previous
                  </button>
                }
                {renderNextBtn &&
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => this._handleNextFigure() }
                  >
                    Next
                  </button>
                }
              </div>
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

  _keyDown(e) {
    if (e.keyCode === 37) {
      this._handlePrevFigure();
    } else if (e.keyCode === 39) {
      this._handleNextFigure();
    }
  }

  _handleFigureStyle(index, current) {
    const { displayQuantityOfSide } = this.props;
    const { width } = this.state;
    let style = {};
    let baseWidth = width / (displayQuantityOfSide * 2 + 1);
    let length = React.Children.count(this.props.children);
    let offset = length % 2 === 0 ? -width/10 : 0;
    // Handle opacity
    let depth = displayQuantityOfSide - Math.abs(current - index);
    let opacity = depth === 1 ? 0.95 : 0.5;
    opacity = depth === 2 ? 0.92 : opacity;
    opacity = depth === 3 ? 0.9 : opacity;
    opacity = current === index ? 1 : opacity;
    // Handle translateX
    if (index === current) {
      style['width'] = `${baseWidth}px`;
      style['transform'] = `translateX(${this.state.move + offset}px)  scale(${this.props.currentFigureScale}`;
      style['zIndex'] = `${10 - depth}`;
      style['opacity'] = opacity;
    } else if (index < current) {
      // Left side
      style['width'] = `${baseWidth}px`;
      style['transform'] = `translateX(${this.state.move + offset}px) rotateY(40deg) scale(${this.props.otherFigureScale}`;
      style['zIndex'] = `${10 - depth}`;
      style['opacity'] = opacity;
    } else if (index > current) {
      // Right side
      style['width'] = `${baseWidth}px`;
      style['transform'] = ` translateX(${this.state.move + offset}px) rotateY(-40deg) scale(${this.props.otherFigureScale})`;
      style['zIndex'] = `${10 - depth}`;
      style['opacity'] = opacity;
    }
    return style;
  }

  _handleFigureClick = (index, action, e) => {
    if (!this.props.clickable) {
      e.preventDefault();
      return;
    }

    this.refs.stage.style['pointerEvents'] = 'none';
    if (this.state.current === index) {
      // If on the active figure
      if (typeof action === 'string') {
        // If action is a URL (string), follow the link
        window.open(action, '_blank');
      }

      this._removePointerEvents();
    } else {
      // Move to the selected figure
      e.preventDefault();
      const { displayQuantityOfSide } = this.props;
      const { width } = this.state;
      let baseWidth = width / (displayQuantityOfSide * 2 + 1);
      let distance = this._center() - index;
      let move = distance * baseWidth;
      this.setState({ current: index, move });
    }
  }

  _renderFigureNodes = () => {
    const { enableHeading } = this.props;
    const { current } = this.state;
    let figureNodes = React.Children.map(this.props.children, (child, index) => {
      let figureElement = React.cloneElement(child, {className: styles.cover});
      let style = this._handleFigureStyle(index, current);
      return (
        <figure
          className={styles.figure}
          key={index}
          onClick={() => this._handleFigureClick(index, figureElement.props['data-action']) }
          style={style}
          ref={`figure_${index}`}
        >
          {figureElement}
          {
            enableHeading &&
            <div className={styles.text}>{figureElement.props.alt}</div>
          }
        </figure>
      );
    });
    return figureNodes;
  }

  _removePointerEvents() {
    this.refs.stage.style['pointerEvents'] = 'auto';
  }

  _hasPrevFigure = () => {
    return this.state.current - 1 >= 0;
  }

  _hasNextFigure = () => {
    return this.state.current + 1 < this.props.children.length;
  }

  _handlePrevFigure = () => {
    const { displayQuantityOfSide, infiniteScroll } = this.props;
    const { width } = this.state;
    let { current } = this.state;
    let baseWidth = width / (displayQuantityOfSide * 2 + 1);
    let distance = this._center() - (current - 1 < 0 ? this.props.children.length - 1: current - 1);
    let move = distance * baseWidth;

    if (current - 1 >= 0) {
      this.setState({ current: current - 1, move });
      TOUCH.lastMove = move;
    }
    if (current - 1 < 0 && infiniteScroll) {
      this.setState({ current: this.props.children.length - 1, move });
      TOUCH.lastMove = move;
    }
  }

  _handleNextFigure = () => {
    const { displayQuantityOfSide, infiniteScroll } = this.props;
    const { width } = this.state;
    let { current } = this.state;
    let baseWidth = width / (displayQuantityOfSide * 2 + 1);
    let distance = this._center() - (current + 1 >= this.props.children.length ? 0 : current + 1);
    let move = distance * baseWidth;

    if (current + 1 < this.props.children.length) {
      this.setState({ current: current + 1, move });
      TOUCH.lastMove = move;
    }
    if (current + 1 >= this.props.children.length && infiniteScroll) {
      this.setState({ current: 0, move });
      TOUCH.lastMove = move;
    }
  }

  _handleWheel(e) {
    let delta = Math.abs(e.deltaY) === 125 ? e.deltaY * (-120) : e.deltaY < 0 ? -600000 : 600000;
    let count = Math.ceil(Math.abs(delta) / 120);

    if (count > 0) {
      const sign = Math.abs(delta) / delta;
      let func = null;

      if (sign > 0 && this._hasPrevFigure()) {
        e.preventDefault();
        func = this._handlePrevFigure();
      } else if (sign < 0 && this._hasNextFigure()) {
        e.preventDefault();
        func = this._handleNextFigure();
      }

      if (typeof func === 'function') {
        for (let i = 0; i < count; i++) func();
      }
    }
  }

  _handleTouchStart(e) {
    TOUCH.lastX = e.nativeEvent.touches[0].clientX;
    TOUCH.lastMove = this.state.move;
  }

  _handleTouchMove(e) {
    e.preventDefault();
    const { displayQuantityOfSide } = this.props;
    const { width } = this.state;

    let clientX = e.nativeEvent.touches[0].clientX;
    let lastX = TOUCH.lastX;
    let baseWidth = width / (displayQuantityOfSide * 2 + 1);
    let move = clientX - lastX;
    let totalMove = TOUCH.lastMove - move;
    let sign = Math.abs(move) / move;

    if (Math.abs(totalMove) >= baseWidth) {
      let fn = null;
      if (sign > 0) {
        fn = this._handlePrevFigure();
      } else if (sign < 0) {
        fn = this._handleNextFigure();
      }
      if (typeof fn === 'function') {
        fn();
      }
    }
  }
};


Coverflow.displayName = 'Coverflow';

export default Radium(Coverflow);
