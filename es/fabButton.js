import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import classNames from 'classnames';

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
  _inherits(FabButton, _React$PureComponent);

  function FabButton(props) {
    _classCallCheck(this, FabButton);

    var _this = _possibleConstructorReturn(this, (FabButton.__proto__ || Object.getPrototypeOf(FabButton)).call(this, props));

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

  _createClass(FabButton, [{
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
          restProps = _objectWithoutProperties(_props2, ['className', 'children', 'icon', 'position', 'prefixCls']);

      var styleClass = classNames(prefixCls, _defineProperty({}, prefixCls + '-open', this.state.visible), prefixCls + '-' + position, className);

      this.items = React.Children.map(childrenProp, function (child, index) {
        if (!React.isValidElement(child)) {
          return false;
        }
        var styles = _this2.itemsStyle[index] ? _this2.itemsStyle[index] : {};

        return React.createElement(
          'span',
          { style: styles, className: prefixCls + '-item', key: 'item' + index },
          React.cloneElement(child, child.props)
        );
      });

      var otherProps = getOtherProperties(restProps, ['angle', 'delay', 'distance', 'reverse', 'type']);

      return React.createElement(
        'div',
        _extends({ className: styleClass }, otherProps),
        React.createElement(
          'button',
          { ref: this.getRef, className: prefixCls + '-btn', onClick: this.toggle },
          React.createElement('span', { className: prefixCls + '-close' }),
          React.createElement(
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
}(React.PureComponent);

FabButton.defaultProps = {
  angle: 90,
  distance: 20,
  position: 'bottom-right',
  prefixCls: 'bee-fab-button',
  type: 'horizontal',
  reverse: false
};


export default FabButton;