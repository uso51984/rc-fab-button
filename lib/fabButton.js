'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getOtherProperties(target, source) {
  var obj = {};
  for (var key in target) {
    if (target.hasOwnProperty(key)) {
      if (source.indexOf(key) === -1) {
        obj[key] = target[key];
      }
    }
  }
  return obj;
}

var FabButton = function (_React$PureComponent) {
  (0, _inherits3['default'])(FabButton, _React$PureComponent);

  function FabButton(props) {
    (0, _classCallCheck3['default'])(this, FabButton);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (FabButton.__proto__ || Object.getPrototypeOf(FabButton)).call(this, props));

    _this.state = {
      visible: false
    };

    _this.toggle = function () {
      if (_this.state.visible) {
        _this.close();
      } else {
        _this.open();
      }

      _this.setState({
        visible: !_this.state.visible
      });
    };

    _this.getRef = function (node) {
      _this.btnNode = node;
    };

    _this.itemsStyle = [];
    return _this;
  }

  (0, _createClass3['default'])(FabButton, [{
    key: 'open',
    value: function open() {
      var _props = this.props,
          delay = _props.delay,
          distance = _props.distance,
          position = _props.position,
          reverse = _props.reverse;

      var op = reverse ? '-' : '';
      this.itemWidth = this.btnNode.offsetWidth;
      switch (this.props.type) {
        case 'horizontal':
          for (var i = 0; i < this.items.length; i++) {
            var x = op + (this.itemWidth + distance) * (i + 1) + 'px';
            this.itemsStyle[i] = {
              opacity: 1,
              left: x
            };
          }
          break;
        case 'vertical':
          for (var _i = 0; _i < this.items.length; _i++) {
            var _x = op + (this.itemWidth + distance) * (_i + 1) + 'px';
            this.itemsStyle[_i] = {
              opacity: 1,
              top: _x
            };
          }
          break;
        case 'circle':
          var radius = this.itemWidth + distance;
          var dir = {
            center: -90,
            'top-left': -180,
            'bottom-left': 90,
            'top-right': -90,
            'bottom-right': 0
          };
          var rotation = dir[position];
          for (var _i2 = 0; _i2 < this.items.length; _i2++) {
            this.anim(_i2, rotation, radius, delay);
          }
          break;
        default:
          break;
      }
    }
  }, {
    key: 'anim',
    value: function anim(i, rotation, radius, delay) {
      // -180/左上(lt)、 90/左下(lb)、-90/右上(rt)、0/右下(rb)
      var angle = (this.props.angle * i - rotation) / 180 * Math.PI;
      var x = Math.sin(angle) * radius;
      var y = Math.cos(angle) * radius;
      x = parseFloat(x.toFixed(3));
      y = parseFloat(y.toFixed(3));
      if (delay) {
        this.itemsStyle[i] = { 'transition-delay': delay * i + 'ms' };
      }
      var xy = 'scale(.9) translate(' + x + 'px,' + y + 'px)';
      this.itemsStyle[i] = {
        opacity: 1,
        top: 0,
        transform: xy
      };
    }
  }, {
    key: 'close',
    value: function close() {
      for (var i = 0; i < this.items.length; i++) {
        this.itemsStyle[i] = {
          left: '0px',
          opacity: 0,
          top: '0px',
          transform: 'translate(0,0)'
        };
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          className = _props2.className,
          childrenProp = _props2.children,
          icon = _props2.icon,
          position = _props2.position,
          prefixCls = _props2.prefixCls,
          restProps = (0, _objectWithoutProperties3['default'])(_props2, ['className', 'children', 'icon', 'position', 'prefixCls']);

      var styleClass = (0, _classnames2['default'])(prefixCls, (0, _defineProperty3['default'])({}, prefixCls + '-open', this.state.visible), prefixCls + '-' + position, className);

      this.items = _react2['default'].Children.map(childrenProp, function (child, index) {
        if (!_react2['default'].isValidElement(child)) {
          return false;
        }
        var styles = _this2.itemsStyle[index] ? _this2.itemsStyle[index] : {};

        return _react2['default'].createElement(
          'span',
          { style: styles, className: prefixCls + '-item', key: 'item' + index },
          _react2['default'].cloneElement(child, child.props)
        );
      });

      var otherProps = getOtherProperties(restProps, ['angle', 'delay', 'distance', 'reverse', 'type']);

      return _react2['default'].createElement(
        'div',
        (0, _extends3['default'])({ className: styleClass }, otherProps),
        _react2['default'].createElement(
          'button',
          { ref: this.getRef, className: prefixCls + '-btn', onClick: this.toggle },
          _react2['default'].createElement('span', { className: prefixCls + '-close' }),
          _react2['default'].createElement(
            'span',
            { className: prefixCls + '-inner' },
            icon
          )
        ),
        this.items
      );
    }
  }]);
  return FabButton;
}(_react2['default'].PureComponent);

FabButton.defaultProps = {
  angle: 90,
  distance: 20,
  position: 'bottom-right',
  prefixCls: 'bee-fab-button',
  type: 'horizontal',
  reverse: false
};
exports['default'] = FabButton;
module.exports = exports['default'];