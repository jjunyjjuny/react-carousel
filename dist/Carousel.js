"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Counter = exports.Controller = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _hi = require("react-icons/hi");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_X = -100;
var DEFAULT_TRANSITION = "all .5s";

var _carouselModule = function _carouselModule() {
  var _collectionOfCarouselMover = {};

  var Carousel = function Carousel(_ref) {
    var items = _ref.children,
        itemCountPerPanel = _ref.itemCountPerPanel,
        carouselId = _ref.carouselId,
        customMode = _ref.customMode,
        _ref$gap = _ref.gap,
        gap = _ref$gap === void 0 ? "0.5rem" : _ref$gap,
        loop = _ref.loop,
        autoPlay = _ref.autoPlay,
        interval = _ref.interval,
        dot = _ref.dot;

    var virtualPanelList = _cretaeVirtualPanelList(items, itemCountPerPanel);

    var _useState = (0, _react.useState)(function () {
      var initialPanelList = _createPanelList(virtualPanelList);

      return initialPanelList;
    }),
        _useState2 = _slicedToArray(_useState, 2),
        panelList = _useState2[0],
        setPanelList = _useState2[1];

    var index = (0, _react.useRef)(0);

    var _useState3 = (0, _react.useState)(panelList.length > 1 ? DEFAULT_X : 0),
        _useState4 = _slicedToArray(_useState3, 2),
        x = _useState4[0],
        setX = _useState4[1];

    var _useState5 = (0, _react.useState)(false),
        _useState6 = _slicedToArray(_useState5, 2),
        moving = _useState6[0],
        setMoving = _useState6[1];

    var _useState7 = (0, _react.useState)("none"),
        _useState8 = _slicedToArray(_useState7, 2),
        transitionValue = _useState8[0],
        setTransitionValue = _useState8[1];

    var _useState9 = (0, _react.useState)(0),
        _useState10 = _slicedToArray(_useState9, 2),
        currentDirection = _useState10[0],
        setCurrentDirection = _useState10[1];

    var panelCount = virtualPanelList.length;

    var onMove = function onMove(directionValue) {
      if (moving) return;
      index.current = getMovedIndex(directionValue);
      var targetIndex = getMovedIndex(directionValue);
      setMoving(true);
      setCurrentDirection(directionValue);
      setPanelList(function (panelList) {
        return directionValue > 0 ? [].concat(_toConsumableArray(panelList), [virtualPanelList[targetIndex]]) : [virtualPanelList[targetIndex]].concat(_toConsumableArray(panelList));
      });

      if (directionValue === -1) {
        setX(-200);
      }
    };

    _addMover(carouselId, onMove);

    (0, _react.useEffect)(function () {
      if (currentDirection !== 0) {
        setTransitionValue(DEFAULT_TRANSITION);
        setX(function (prevX) {
          return prevX + currentDirection * DEFAULT_X;
        });
        setCurrentDirection(0);
      }
    }, [currentDirection]);

    var getMovedIndex = function getMovedIndex(directionValue) {
      return (panelCount + directionValue + index.current) % panelCount;
    };

    var onTransitionEnd = function onTransitionEnd() {
      setMoving(false);
      setTransitionValue("none");
      setPanelList(function (panelList) {
        var resultList = _toConsumableArray(panelList);

        if (x === DEFAULT_X) {
          resultList.pop();
        } else if (x === -200) {
          resultList.shift();
          setX(DEFAULT_X);
        }

        return resultList;
      });
    };

    var renderPanelList = function renderPanelList() {
      return panelList.map(function (panel, index) {
        return /*#__PURE__*/_react.default.createElement(Panel, {
          key: index,
          gap: gap
        }, panel.map(function (item, index) {
          return /*#__PURE__*/_react.default.createElement(Item, {
            key: index,
            gap: gap,
            itemCountPerPanel: itemCountPerPanel
          }, item);
        }));
      });
    };

    return /*#__PURE__*/_react.default.createElement(Wrapper, {
      customMode: customMode
    }, !customMode && /*#__PURE__*/_react.default.createElement(Button, {
      prev: true,
      onClick: function onClick() {
        return onMove(-1);
      }
    }, /*#__PURE__*/_react.default.createElement(_hi.HiOutlineChevronLeft, null)), /*#__PURE__*/_react.default.createElement(CarouselContainer, null, /*#__PURE__*/_react.default.createElement(Slider, {
      onTransitionEnd: onTransitionEnd,
      x: x,
      transitionValue: transitionValue,
      gap: gap
    }, renderPanelList())), !customMode && /*#__PURE__*/_react.default.createElement(Button, {
      next: true,
      onClick: function onClick() {
        return onMove(+1);
      }
    }, /*#__PURE__*/_react.default.createElement(_hi.HiOutlineChevronRight, null)));
  };

  var Controller = function Controller(_ref2) {
    var children = _ref2.children,
        carouselId = _ref2.carouselId,
        _ref2$prev = _ref2.prev,
        prev = _ref2$prev === void 0 ? false : _ref2$prev,
        _ref2$next = _ref2.next,
        next = _ref2$next === void 0 ? false : _ref2$next;

    if (!prev && !next) {
      throw new Error('MissingRequiredPropertyError: you have to pass "prev" or "next" as direction property to the controller.');
    }

    if (!carouselId) {
      throw new Error("MissingRequiredPropertyError: you have to pass carouselId to the controller.");
    }

    var direction = prev ? -1 : next ? 1 : 0;
    var button = children !== null && children !== void 0 ? children : prev ? /*#__PURE__*/_react.default.createElement(_hi.HiOutlineChevronLeft, null) : next ? /*#__PURE__*/_react.default.createElement(_hi.HiOutlineChevronRight, null) : "";
    return /*#__PURE__*/_react.default.createElement(Button, {
      onClick: function onClick() {
        return _collectionOfCarouselMover[carouselId](direction);
      }
    }, button);
  };

  var Counter = function Counter() {
    return /*#__PURE__*/_react.default.createElement("div", null);
  };

  var _addMover = function _addMover(targetId, mover) {
    _collectionOfCarouselMover[targetId] = mover;
  };

  var _cretaeVirtualPanelList = function _cretaeVirtualPanelList(items, countPer) {
    if (!Array.isArray(items)) {
      return [items];
    }

    if (items.length === 0) {
      return Array.from({
        length: countPer
      }, function () {
        return ALT_COMPONENT;
      });
    }

    return items.reduce(function (list, item, index) {
      var _divmod2 = _divmod(index, countPer),
          _divmod3 = _slicedToArray(_divmod2, 2),
          i = _divmod3[0],
          j = _divmod3[1];

      list[i] ? list[i][j] = item : list[i] = [item];
      return list;
    }, []);
  };

  var _createPanelList = function _createPanelList(virtualPanelList) {
    var len = virtualPanelList.length;
    var last = virtualPanelList[len - 1];

    if (len === 1) {
      return virtualPanelList;
    } else if (len === 2) {
      return [last].concat(_toConsumableArray(virtualPanelList));
    } else {
      return [last].concat(_toConsumableArray(virtualPanelList.slice(0, 2)));
    }
  };

  return {
    Carousel: Carousel,
    Controller: Controller,
    Counter: Counter
  };
};

var _divmod = function _divmod(a, b) {
  return [parseInt(a / b), a % b];
};

var Wrapper = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  ", "\n"])), function (_ref3) {
  var customMode = _ref3.customMode;
  return !customMode && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      display: flex;\n      align-items: center;\n      flex-direction: column;\n    "])));
});

var CarouselContainer = _styledComponents.default.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  width: 100%;\n  overflow: hidden;\n"])));

var Slider = _styledComponents.default.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  width: 100%;\n  ", "\n  display: flex;\n"])), function (_ref4) {
  var x = _ref4.x,
      transitionValue = _ref4.transitionValue,
      gap = _ref4.gap;
  return (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    transform: ", ";\n    transition: ", ";\n    padding-right: ", ";\n  "])), "translate3d(".concat(x, "%, 0, 0)"), transitionValue, gap);
});

var Panel = _styledComponents.default.ul(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  width: 100%;\n  margin: 0;\n  display: flex;\n  flex: 1 0 auto;\n  padding: 0;\n  ", ";\n"])), function (_ref5) {
  var gap = _ref5.gap;
  return (0, _styledComponents.css)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n      padding-right: ", ";\n    "])), gap);
});

var Item = _styledComponents.default.li(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  list-style-type: none;\n  ", "\n"])), function (_ref6) {
  var itemCountPerPanel = _ref6.itemCountPerPanel,
      gap = _ref6.gap;
  return (0, _styledComponents.css)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n      width: ", ";\n      & + & {\n        margin-left: ", ";\n      }\n    "])), "calc(100%/".concat(itemCountPerPanel, ")"), gap);
});

var Button = _styledComponents.default.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  font-size: 2rem;\n"])));

var ALT_COMPONENT = _styledComponents.default.div(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  background: tan;\n"])));

var _carouselModule2 = _carouselModule(),
    Carousel = _carouselModule2.Carousel,
    Controller = _carouselModule2.Controller,
    Counter = _carouselModule2.Counter;

exports.Counter = Counter;
exports.Controller = Controller;
var _default = Carousel;
exports.default = _default;