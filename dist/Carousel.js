"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _hi = require("react-icons/hi");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;

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

var carouselContext = function carouselContext() {
  var _carouselDatas = {};
  var _moveControllers = {};
  var transitionDefault = "all .5s";
  var xDefault = -100;

  var Carousel = function Carousel(props) {
    var carouselId = props.carouselId,
        customMode = props.customMode;

    var state = _getData(props, carouselId);

    var items = state.children,
        _state$itemsPerPeice = state.itemsPerPeice,
        itemsPerPeice = _state$itemsPerPeice === void 0 ? 1 : _state$itemsPerPeice,
        _state$autoFit = state.autoFit,
        autoFit = _state$autoFit === void 0 ? false : _state$autoFit;
    var _state$gap = state.gap,
        gap = _state$gap === void 0 ? autoFit ? "0.5rem" : "0rem" : _state$gap;

    var slideList = _createSlideList(items, itemsPerPeice);

    var _useState = (0, _react.useState)(slideList),
        _useState2 = _slicedToArray(_useState, 2),
        slides = _useState2[0],
        setSlides = _useState2[1];

    var _useState3 = (0, _react.useState)(slideList.length > 1 ? xDefault : "0"),
        _useState4 = _slicedToArray(_useState3, 2),
        x = _useState4[0],
        setX = _useState4[1];

    var _useState5 = (0, _react.useState)(false),
        _useState6 = _slicedToArray(_useState5, 2),
        moving = _useState6[0],
        setMoving = _useState6[1];

    var _useState7 = (0, _react.useState)(transitionDefault),
        _useState8 = _slicedToArray(_useState7, 2),
        trasitionValue = _useState8[0],
        setTransitionValue = _useState8[1];

    var _useState9 = (0, _react.useState)(0),
        _useState10 = _slicedToArray(_useState9, 2),
        dir = _useState10[0],
        setDir = _useState10[1];

    var onMove = function onMove(direction) {
      if (moving) return;

      if (direction === -1 && x === -(slideList.length - 1) * 100) {
        setSlides(function (slides) {
          console.log(1);
          var slide = slides.shift();
          return [].concat(_toConsumableArray(slides), [slide]);
        });
        setTransitionValue("none");
        setX(0);
        setDir(direction);
        return;
      } else if (direction === 1 && x === 0) {
        setSlides(function (slides) {
          console.log(2);
          var slide = slides.pop();
          return [slide].concat(_toConsumableArray(slides));
        });
        setTransitionValue("none");
        setX(-100);
        setDir(direction);
        return;
      }

      setX(function (prevX) {
        return prevX + direction * 100;
      });
      setMoving(true);
    };

    _setController(carouselId, onMove);

    var onTransitionEnd = function onTransitionEnd() {
      setMoving(false);

      if (x === -(slideList.length - 1) * 100) {
        setTransitionValue("none");
        setSlides(function (slides) {
          var slide = slides.shift();
          return [].concat(_toConsumableArray(slides), [slide]);
        });
        setX(-(slideList.length - 1) * 100 + 100);
      } else if (x === 0) {
        setTransitionValue("none");
        setSlides(function (slides) {
          console.log(4);
          var slide = slides.pop();
          return [slide].concat(_toConsumableArray(slides));
        });
        setX(-100);
      }
    };

    (0, _react.useEffect)(function () {
      if (dir !== 0) {
        onMove(dir);
        setDir(0);
      }

      if (trasitionValue === "none") setTransitionValue(transitionDefault);
    }, [x]);
    var ulStyles = {
      transform: "translate3d(".concat(x, "%, 0, 0)"),
      transition: trasitionValue,
      display: "flex"
    };

    var renderList = function renderList(list) {
      return list.map(function (slide, index) {
        return /*#__PURE__*/_react.default.createElement(Panel, {
          key: index,
          gap: gap
        }, slide.map(function (item, index) {
          return /*#__PURE__*/_react.default.createElement(Item, {
            key: index,
            autoFit: autoFit,
            itemsPerPeice: itemsPerPeice,
            gap: gap
          }, item);
        }));
      });
    };

    return /*#__PURE__*/_react.default.createElement(Wrapper, {
      customMode: customMode
    }, !customMode && /*#__PURE__*/_react.default.createElement(Button, {
      prev: true,
      onClick: function onClick() {
        return onMove(+1);
      }
    }, /*#__PURE__*/_react.default.createElement(_hi.HiOutlineChevronLeft, null)), /*#__PURE__*/_react.default.createElement(CarouselContainer, null, /*#__PURE__*/_react.default.createElement(Slider, {
      gap: gap,
      style: ulStyles,
      onTransitionEnd: onTransitionEnd
    }, renderList(slides))), !customMode && /*#__PURE__*/_react.default.createElement(Button, {
      next: true,
      onClick: function onClick() {
        return onMove(-1);
      }
    }, /*#__PURE__*/_react.default.createElement(_hi.HiOutlineChevronRight, null)));
  };

  var Controller = function Controller(_ref) {
    var children = _ref.children,
        carouselId = _ref.carouselId,
        _ref$prev = _ref.prev,
        prev = _ref$prev === void 0 ? false : _ref$prev,
        _ref$next = _ref.next,
        next = _ref$next === void 0 ? false : _ref$next;

    if (!prev && !next) {
      throw new Error('MissingRequiredPropertyError: you have to pass "prev" or "next" as direction property to the controller.');
    }

    if (!carouselId) {
      throw new Error("MissingRequiredPropertyError: you have to pass carouselId to the controller.");
    }

    var direction = prev ? 1 : next ? -1 : 0;
    var button = children !== null && children !== void 0 ? children : prev ? /*#__PURE__*/_react.default.createElement(_hi.HiOutlineChevronLeft, null) : next ? /*#__PURE__*/_react.default.createElement(_hi.HiOutlineChevronRight, null) : "";
    return /*#__PURE__*/_react.default.createElement(Button, {
      onClick: function onClick() {
        return _moveControllers[carouselId](direction);
      }
    }, button);
  };

  var _setController = function _setController(id, move) {
    _moveControllers[id] = move;
  };

  var _getData = function _getData(props, targetId) {
    var customMode = props.customMode,
        items = props.children,
        itemsPerPeice = props.itemsPerPeice,
        autoFit = props.autoFit,
        gap = props.gap;
    var data = {
      children: items,
      itemsPerPeice: itemsPerPeice,
      autoFit: autoFit,
      gap: gap
    };

    if (!customMode) {
      return data;
    }

    if (_isThereCarouselData(targetId)) {
      return _getCarouselData(targetId);
    } else {
      _setData(data, targetId);

      return data;
    }
  };

  var _setData = function _setData(data, id) {
    _carouselDatas[id] = data;
  };

  var _isThereCarouselData = function _isThereCarouselData(targetId) {
    return targetId in _carouselDatas;
  };

  var _getCarouselData = function _getCarouselData(targetId) {
    return _carouselDatas[targetId];
  };

  return {
    Carousel: Carousel,
    Controller: Controller
  };
};

var _createSlideList = function _createSlideList(items, itemsPerPeice) {
  if (!Array.isArray(items)) {
    return [items];
  }

  if (items.length === 0) return [];
  var newItems = items.reduce(function (result, item, index) {
    var _divmod2 = _divmod(index, itemsPerPeice),
        _divmod3 = _slicedToArray(_divmod2, 2),
        i = _divmod3[0],
        j = _divmod3[1];

    result[i] ? result[i][j] = item : result[i] = [item];
    return result;
  }, []);
  newItems.unshift(newItems.pop());
  return newItems;
};

var _divmod = function _divmod(a, b) {
  return [parseInt(a / b), a % b];
};

var Wrapper = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", "\n"])), function (_ref2) {
  var customMode = _ref2.customMode;
  return !customMode && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      display: flex;\n      align-items: center;\n    "])));
});

var CarouselContainer = _styledComponents.default.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  overflow: hidden;\n"])));

var Slider = _styledComponents.default.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n  padding-right: ", ";\n"])), function (_ref3) {
  var gap = _ref3.gap;
  return "".concat(gap);
});

var Panel = _styledComponents.default.ul(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  margin: 0;\n  display: flex;\n  width: 100%;\n  flex: 1 0 auto;\n  padding: 0;\n  margin-right: ", ";\n"])), function (_ref4) {
  var gap = _ref4.gap;
  return "".concat(gap);
});

var Item = _styledComponents.default.li(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  list-style-type: none;\n  ", "\n"])), function (_ref5) {
  var autoFit = _ref5.autoFit,
      itemsPerPeice = _ref5.itemsPerPeice,
      gap = _ref5.gap;
  return autoFit && (0, _styledComponents.css)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n      width: ", ";\n      & + & {\n        margin-left: ", ";\n      }\n    "])), autoFit ? "calc(100%/".concat(itemsPerPeice, ")") : "auto", gap);
});

var Button = _styledComponents.default.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  font-size: 2rem;\n"])));

var _default = carouselContext();

exports.default = _default;
