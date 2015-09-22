/**
 * React Coverflow
 *
 * Author: andyyou
 */
import React from 'react';
import styles from './stylesheets/coverflow';

class Coverflow extends React.Component {
  /**
   * Life cycle events
   */
  constructor(props) {
    super(props);
    this.state = {
      current: this._center()
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.current !== this.state.current;
  }

  render() {
    const {width, height} = this.props;

    return (
      <div className={styles.container} 
           style={{width: `${width}px`, height: `${height}px`}}
           onWheel={this._handleWheel.bind(this)}
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
    var length = React.Children.count(this.props.children);
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
    let distance = center - current;
    let move = distance * baseWidth;

    if (index === current) {
      style['width'] = `${baseWidth}px`;
      style['transform'] = `translateX(${move}px) scale(1.2)`;
      style['zIndex'] = '10';
      style['opacity'] = opacity;
    } else if (index < current) {
      // Left side
      style['width'] = `${baseWidth}px`;
      style['transform'] = `translateX(${move}px) rotateY(40deg)`;
      style['zIndex'] = '9';
      style['opacity'] = opacity;
    } else if (index > current) {
      // Right side
      style['width'] = `${baseWidth}px`;
      style['transform'] = ` translateX(${move}px) rotateY(-40deg)`;
      style['zIndex'] = '9';
      style['opacity'] = opacity;
    }
    return style;
  }

  _handleFigureClick(index, url, e) {
    e.preventDefault();
    if (this.state.current === index) {
      window.open(url, '_blank');
    } else {
      
      this.setState({current: index});
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
          >
          {figureElement}
          <div className={styles.text}>{figureElement.props.alt}</div>
        </figure>
      );
    });
    return figureNodes;
  }

  _handlePrevFigure() {
    var current = this.state.current;
    if (current - 1 >= 0) {
      this.setState({ current: current - 1 });
    }
  }

  _handleNextFigure() {
    var current = this.state.current;
    if (current + 1 < this.props.children.length) {
      this.setState({ current: current + 1 });
    }
  }

  _handleWheel(e) {
    e.preventDefault();

    var delta = e.deltaY * (-120);
    var count = Math.ceil(Math.abs(delta) / 120);

    if (count > 0) {
      var sign = Math.abs(delta) / delta;
      var func = null;

      if (sign > 0) {
        func = this._handlePrevFigure.bind(this);
      } else if (sign < 0) {
        func = this._handleNextFigure.bind(this);
      }

      if (typeof func === 'function') {
        for (var i = 0; i < count; i++) func();
      }
    }
  }
};

export default Coverflow;