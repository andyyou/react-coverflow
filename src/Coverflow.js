/* eslint-disable */
/**
 * React Coverflow
 *
 * Author: andyyou & asalem1
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Radium, { StyleRoot } from 'radium';
// import { hot } from "react-hot-loader";
import styles from './stylesheets/coverflow.scss';

const TOUCH = {
  move: false,
  lastX: 0,
  sign: 0,
  lastMove: 0
};

const TRANSITIONS = [
  'transitionend',
  'oTransitionEnd',
  'otransitionend',
  'MSTransitionEnd',
  'webkitTransitionEnd'
];

const HandleAnimationState = function() {
  this._removePointerEvents();
};

class Coverflow extends Component {
  /**
   * Life cycle events
   */

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
    media: PropTypes.any,
    itemMedia: PropTypes.any,
    infiniteScroll: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    translateXLeftOffset: PropTypes.number,
    translateXRightOffset: PropTypes.number,
    translateY: PropTypes.string,
    rotateYLeft: PropTypes.string,
    rotateYRight: PropTypes.string,
    figureWidthPercent: PropTypes.number,
    figureWidthPercentLeft: PropTypes.number,
    figureWidthPercentRight: PropTypes.number
  };

  static defaultProps = {
    navigation: false,
    enableHeading: true,
    enableScroll: true,
    clickable: true,
    currentFigureScale: 1.5,
    otherFigureScale: 0.8,
    active: 0,
    media: {},
    itemMedia: {},
    infiniteScroll: false,
    width: 'auto',
    height: 'auto',
    translateXLeftOffset: 0,
    translateXRightOffset: 0,
    translateY: '0px',
    rotateYLeft: '0deg',
    rotateYRight: '-0deg',
    figureWidthPercent: 100,
    figureWidthPercentLeft: 0,
    figureWidthPercentRight: 0
  };

  state = {
    current: ~~(React.Children.count(this.props.children) / 2),
    move: 0,
    width: this.props.width,
    height: this.props.height
  };

  componentDidMount() {
    this.updateDimensions();
    const length = React.Children.count(this.props.children);

    TRANSITIONS.forEach(event => {
      for (let i = 0; i < length; i++) {
        const figureID = `figure_${i}`;
        this.refs[figureID].addEventListener(
          event,
          HandleAnimationState.bind(this)
        );
      }
    });

    const eventListener = window && window.addEventListener;

    if (eventListener) {
      window.addEventListener('resize', this.updateDimensions.bind(this));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.updateDimensions(nextProps.active);
    }
  }

  componentWillUnmount() {
    const length = React.Children.count(this.props.children);

    TRANSITIONS.forEach(event => {
      for (let i = 0; i < length; i++) {
        const figureID = `figure_${i}`;
        this.refs[figureID].removeEventListener(
          event,
          HandleAnimationState.bind(this)
        );
      }
    });

    // const removeListener = window && window.removeEventListener;

    // if(removeListener) {
    //   window.removeEventListener('resize', this.updateDimensions.bind(this));
    // }
  }

  updateDimensions(active) {
    const { displayQuantityOfSide } = this.props;
    const length = React.Children.count(this.props.children);
    const center = this._center();
    let state = {
      width: ReactDOM.findDOMNode(this).offsetWidth,
      height: ReactDOM.findDOMNode(this).offsetHeight
    };
    const baseWidth = state.width / (displayQuantityOfSide * 2 + 1);
    let activeImg = typeof active === 'number' ? active : this.props.active;
    if (typeof active === 'number' && ~~active < length) {
      activeImg = ~~active;
      let move = 0;
      move = baseWidth * (center - activeImg);

      state = Object.assign({}, state, {
        current: active,
        move
      });
    }
    this.setState(state);
  }

  render() {
    const { enableScroll, navigation, infiniteScroll, media } = this.props;
    const { width, height, current } = this.state;
    const renderPrevBtn = infiniteScroll ? true : current > 0;
    const renderNextBtn = infiniteScroll
      ? true
      : current < this.props.children.length - 1;

    return (
      <StyleRoot>
        <div
          className={styles.container}
          style={
            Object.keys(media).length !== 0
              ? media
              : { width: `${width}px`, height: `${height}px` }
          }
          onWheel={enableScroll ? this._handleWheel.bind(this) : null}
          onTouchStart={this._handleTouchStart.bind(this)}
          onTouchMove={this._handleTouchMove.bind(this)}
          onKeyDown={this._keyDown.bind(this)}
          tabIndex="-1">
          <div className={styles.coverflow}>
            <div className={styles.preloader} />
            <div className={styles.stage} ref="stage">
              {this._renderFigureNodes()}
            </div>
            {navigation && (
              <div className={styles.actions}>
                {renderPrevBtn && (
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => this._handlePrevFigure()}>
                    Previous
                  </button>
                )}
                {renderNextBtn && (
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => this._handleNextFigure()}>
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </StyleRoot>
    );
  }

  /**
   * Private methods
   */
  _center() {
    const length = React.Children.count(this.props.children);
    return ~~(length / 2);
  }

  _keyDown(e) {
    if (e.keyCode === 37) {
      this._handlePrevFigure();
    } else if (e.keyCode === 39) {
      this._handleNextFigure();
    }
  }

  _handleFigureStyle(index, current) {
    let activeClass = false;
    const { displayQuantityOfSide } = this.props;
    const { width } = this.state;
    const style = {};
    const baseWidth = width / (displayQuantityOfSide * 2 + 1);
    const length = React.Children.count(this.props.children);
    const offset = length % 2 === 0 ? -width / 10 : 0;
    // Handle opacity
    const depth = displayQuantityOfSide - Math.abs(current - index);
    let opacity = depth === 1 ? 0.95 : 0.5;
    opacity = depth === 2 ? 0.92 : opacity;
    opacity = depth === 3 ? 0.9 : opacity;
    opacity = current === index ? 1 : opacity;
    // Handle translateX
    if (index === current) {
      activeClass = true;
      style.width = `${baseWidth +
        baseWidth * this.props.figureWidthPercent}px`;
      style.transform = `translateX(${this.state.move + offset}px) scale(${
        this.props.currentFigureScale
      }`;
      style.zIndex = `${10}`;
      // style.zIndex = `${10 - depth}`;
      style.opacity = opacity;
    } else if (index < current) {
      // Left side
      style.width = `${baseWidth}px`;
      style.transform = `translateX(${this.state.move +
        offset +
        this.props.translateXLeftOffset}px) translateY(${
        this.props.translateY
      }) rotateY(${this.props.rotateYLeft}) scale(${
        this.props.otherFigureScale
      }`;
      style.zIndex = `${10 - depth}`;
      // style.opacity = opacity;
    } else if (index > current) {
      // Right side
      style.width = `${baseWidth}px`;
      style.transform = ` translateX(${this.state.move +
        offset +
        this.props.translateXRightOffset}px) translateY(${
        this.props.translateY
      }) rotateY(${this.props.rotateYRight}) scale(${
        this.props.otherFigureScale
      })`;
      style.zIndex = `${10 - depth}`;
      // style.opacity = opacity;
    }
    return { activeClass, style };
  }

  _handleFigureClick = (index, action, e) => {
    if (!this.props.clickable) {
      e.preventDefault();
      return;
    }

    this.refs.stage.style.pointerEvents = 'none';
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
      const baseWidth = width / (displayQuantityOfSide * 2 + 1);
      const distance = this._center() - index;
      const move = distance * baseWidth;
      this.setState({ current: index, move });
    }
  };

  _renderFigureNodes = () => {
    const { enableHeading, itemMedia } = this.props;
    const { current } = this.state;
    const figureNodes = React.Children.map(
      this.props.children,
      (child, index) => {
        const figureElement = React.cloneElement(child, {
          className: styles.cover
        });
        let style = this._handleFigureStyle(index, current).style;
        if (Object.keys(itemMedia).length) {
          Object.keys(itemMedia).forEach(
            key => (style = { ...style, [key]: itemMedia[key] })
          );
        }
        const activeClass = this._handleFigureStyle(index, current).activeClass;

        return (
          <div
            className={`${styles.figure} ${activeClass ? 'active' : ''}`}
            key={index}
            onClick={e =>
              this._handleFigureClick(
                index,
                figureElement.props['data-action'],
                e
              )
            }
            style={style}
            ref={`figure_${index}`}>
            {figureElement}
            {enableHeading && (
              <div className={styles.text}>{figureElement.props.alt}</div>
            )}
          </div>
        );
      }
    );
    return figureNodes;
  };

  _removePointerEvents() {
    this.refs.stage.style.pointerEvents = 'auto';
  }

  _hasPrevFigure = () => this.state.current - 1 >= 0;

  _hasNextFigure = () => this.state.current + 1 < this.props.children.length;

  _handlePrevFigure = () => {
    const { displayQuantityOfSide, infiniteScroll } = this.props;
    const { width } = this.state;
    const { current } = this.state;
    const baseWidth = width / (displayQuantityOfSide * 2 + 1);
    const distance =
      this._center() -
      (current - 1 < 0 ? this.props.children.length - 1 : current - 1);
    const move = distance * baseWidth;

    if (current - 1 >= 0) {
      this.setState({ current: current - 1, move });
      TOUCH.lastMove = move;
    }
    if (current - 1 < 0 && infiniteScroll) {
      this.setState({ current: this.props.children.length - 1, move });
      TOUCH.lastMove = move;
    }
  };

  _handleNextFigure = () => {
    const { displayQuantityOfSide, infiniteScroll } = this.props;
    const { width } = this.state;
    const { current } = this.state;
    const baseWidth = width / (displayQuantityOfSide * 2 + 1);
    const distance =
      this._center() -
      (current + 1 >= this.props.children.length ? 0 : current + 1);
    const move = distance * baseWidth;

    if (current + 1 < this.props.children.length) {
      this.setState({ current: current + 1, move });
      TOUCH.lastMove = move;
    }
    if (current + 1 >= this.props.children.length && infiniteScroll) {
      this.setState({ current: 0, move });
      TOUCH.lastMove = move;
    }
  };

  _handleWheel(e) {
    const delta =
      Math.abs(e.deltaY) === 125
        ? e.deltaY * -120
        : e.deltaY < 0
          ? -600000
          : 600000;
    const count = Math.ceil(Math.abs(delta) / 120);

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

    const clientX = e.nativeEvent.touches[0].clientX;
    const lastX = TOUCH.lastX;
    const baseWidth = width / (displayQuantityOfSide * 2 + 1);
    const move = clientX - lastX;
    const totalMove = TOUCH.lastMove - move;
    const sign = Math.abs(move) / move;

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
}

Coverflow.displayName = 'Coverflow';
// hot used for development purposes only
// const HotCoverflow = hot(module)(Coverflow);
export default Radium(Coverflow);
