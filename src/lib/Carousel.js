import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const carouselContext = () => {
  const _carouselDatas = {};
  const _moveControllers = {};
  const transitionDefault = "all .5s";
  const xDefault = -100;
  const Carousel = (props) => {
    const { carouselId, customMode } = props;
    const state = _getData(props, carouselId);
    const { children: items, itemsPerPeice = 1, autoFit = false } = state;
    const { gap = autoFit ? "0.5rem" : "0rem" } = state;
    const slideList = _createSlideList(items, itemsPerPeice);
    const [slides, setSlides] = useState(slideList);
    const [x, setX] = useState(slideList.length > 1 ? xDefault : "0");
    const [moving, setMoving] = useState(false);
    const [trasitionValue, setTransitionValue] = useState(transitionDefault);
    const [dir, setDir] = useState(0);

    const onMove = (direction) => {
      if (moving) return;
      if (direction === -1 && x === -(slideList.length - 1) * 100) {
        setSlides((slides) => {
          console.log(1);
          const slide = slides.shift();
          return [...slides, slide];
        });
        setTransitionValue("none");
        setX(0);
        setDir(direction);
        return;
      } else if (direction === 1 && x === 0) {
        setSlides((slides) => {
          console.log(2);
          const slide = slides.pop();
          return [slide, ...slides];
        });
        setTransitionValue("none");
        setX(-100);
        setDir(direction);
        return;
      }
      setX((prevX) => prevX + direction * 100);
      setMoving(true);
    };

    _setController(carouselId, onMove);

    const onTransitionEnd = () => {
      setMoving(false);
      if (x === -(slideList.length - 1) * 100) {
        setTransitionValue("none");
        setSlides((slides) => {
          const slide = slides.shift();
          return [...slides, slide];
        });
        setX(-(slideList.length - 1) * 100 + 100);
      } else if (x === 0) {
        setTransitionValue("none");
        setSlides((slides) => {
          console.log(4);
          const slide = slides.pop();
          return [slide, ...slides];
        });
        setX(-100);
      }
    };

    useEffect(() => {
      if (dir !== 0) {
        onMove(dir);
        setDir(0);
      }
      if (trasitionValue === "none") setTransitionValue(transitionDefault);
    }, [x]);

    const ulStyles = {
      transform: `translate3d(${x}%, 0, 0)`,
      transition: trasitionValue,
      display: "flex",
    };
    const renderList = (list) => {
      return list.map((slide, index) => {
        return (
          <Panel key={index} gap={gap}>
            {slide.map((item, index) => (
              <Item
                key={index}
                autoFit={autoFit}
                itemsPerPeice={itemsPerPeice}
                gap={gap}
              >
                {item}
              </Item>
            ))}
          </Panel>
        );
      });
    };
    return (
      <Wrapper customMode={customMode}>
        {!customMode && (
          <Button prev onClick={() => onMove(+1)}>
            <HiOutlineChevronLeft />
          </Button>
        )}
        <CarouselContainer>
          <Slider gap={gap} style={ulStyles} onTransitionEnd={onTransitionEnd}>
            {renderList(slides)}
          </Slider>
        </CarouselContainer>
        {!customMode && (
          <Button next onClick={() => onMove(-1)}>
            <HiOutlineChevronRight />
          </Button>
        )}
      </Wrapper>
    );
  };

  const Controller = ({ children, carouselId, prev = false, next = false }) => {
    if (!prev && !next) {
      throw new Error(
        'MissingRequiredPropertyError: you have to pass "prev" or "next" as direction property to the controller.'
      );
    }
    if (!carouselId) {
      throw new Error(
        "MissingRequiredPropertyError: you have to pass carouselId to the controller."
      );
    }
    const direction = prev ? 1 : next ? -1 : 0;
    const button =
      children ??
      (prev ? <HiOutlineChevronLeft /> : next ? <HiOutlineChevronRight /> : "");
    return (
      <Button onClick={() => _moveControllers[carouselId](direction)}>
        {button}
      </Button>
    );
  };

  const _setController = (id, move) => {
    _moveControllers[id] = move;
  };
  const _getData = (props, targetId) => {
    const { customMode, children: items, itemsPerPeice, autoFit, gap } = props;
    const data = { children: items, itemsPerPeice, autoFit, gap };

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
  const _setData = (data, id) => {
    _carouselDatas[id] = data;
  };
  const _isThereCarouselData = (targetId) => {
    return targetId in _carouselDatas;
  };
  const _getCarouselData = (targetId) => {
    return _carouselDatas[targetId];
  };

  return { Carousel, Controller };
};

const _createSlideList = (items, itemsPerPeice) => {
  if (!Array.isArray(items)) {
    return [items];
  }
  if (items.length === 0) return [];
  const newItems = items.reduce((result, item, index) => {
    const [i, j] = _divmod(index, itemsPerPeice);
    result[i] ? (result[i][j] = item) : (result[i] = [item]);
    return result;
  }, []);
  newItems.unshift(newItems.pop());
  return newItems;
};

const _divmod = (a, b) => {
  return [parseInt(a / b), a % b];
};
const Wrapper = styled.div`
  ${({ customMode }) =>
    !customMode &&
    css`
      display: flex;
      align-items: center;
    `}
`;
const CarouselContainer = styled.div`
  overflow: hidden;
`;
const Slider = styled.div`
  display: flex;
  width: 100%;
  padding-right: ${({ gap }) => `${gap}`};
`;
const Panel = styled.ul`
  margin: 0;
  display: flex;
  width: 100%;
  flex: 1 0 auto;
  padding: 0;
  margin-right: ${({ gap }) => {
    return `${gap}`;
  }};
`;
const Item = styled.li`
  list-style-type: none;
  ${({ autoFit, itemsPerPeice, gap }) =>
    autoFit &&
    css`
      width: ${autoFit ? `calc(100%/${itemsPerPeice})` : "auto"};
      & + & {
        margin-left: ${gap};
      }
    `}
`;
const Button = styled.div`
  font-size: 2rem;
`;

export default carouselContext();
