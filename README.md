React Coverflow
===
[![npm version](https://badge.fury.io/js/react-coverflow.svg)](http://badge.fury.io/js/react-coverflow)

[![NPM](https://nodei.co/npm/react-coverflow.png)](https://nodei.co/npm/react-coverflow/)

---

![](https://raw.githubusercontent.com/andyyou/react-coverflow/gh-pages/images/preview.png)

React Coverflow is a React component for building cover flow style carousel in a convenient way.

Features of `react-coverflow`

* Flexbox styles of CSS 3.
* Support scroll in the component.
* Support navigation buttons optional
* Using css-module
* Support mobile

## Getting started

Install `react-coverflow` using npm.

```
$ npm install react-coverflow
```

The required stylesheet using `css-module` and include in package(js file), so you don't need include other stylesheet.

## Usage

```
var React = require('react');
var Coverflow = require('react-coverflow');

React.render(
  <Coverflow width="960" height="500"
    displayQuantityOfSide={2}
    navigation={false}
    >
    <img src='image/path' alt='title or description' url="http://andyyou.github.io/react-coverflow/" />
    <img src='image/path' alt='title or description' url="http://andyyou.github.io/react-coverflow/"/>
    <img src='image/path' alt='title or description' url="http://andyyou.github.io/react-coverflow/"/>
  </Coverflow>,

  document.querySelector('.content')
);
```

#### Options

* displayQuantityOfSide: The number of display image from center to the one side end.
* navigation: Enable navigation buttons (prev, next).

## Contributors

* [andyyou](https://github.com/andyyou)
* [Calvert Yang](https://github.com/CalvertYang)

Use [Github issues](https://github.com/andyyou/react-coverflow/issues) for requests

`react-coverflow` is a community project and wouldn't be what it is without contributions! We encourage and support contributions. The `react-coverflow` source code is released under the MIT License.

Feel free to fork and improve/enhance `react-coverflow` any way you want. If you feel that `react-coverflow` will benefit from your changes, please open a pull request.

## Development

If you want to custom the component there are some commands that can help you.

```
# Compile component to dist/
$ npm run build-npm

# Build source of site
$ npm run build-site

# Clean
$ npm run clean

# Development Server
$ npm run dev
```

## Release History
* 2015-10-07 v0.1.3 Support even number of images, Fix bugs
* 2015-09-22 v0.1.0

## Todo

* Support Responsive
* Imporve performance in Mobile(Touch events part)
* Write test case
