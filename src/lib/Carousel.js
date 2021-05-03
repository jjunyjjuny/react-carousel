import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const DEFAULT_X = -100;
const DEFAULT_TRANSITION = "all .5s";

const _carouselModule = () => {
  const _collectionOfCarouselMover = {};

  const Carousel = ({
    children: items,
    itemCountPerPanel,
    carouselId,
    customMode,
    gap = "0.5rem",
    loop,
    autoPlay,
    interval,
    dot,
  }) => {
    const virtualPanelList = _cretaeVirtualPanelList(items, itemCountPerPanel);
    const [panelList, setPanelList] = useState(() => {
      const initialPanelList = _createPanelList(virtualPanelList);
      return initialPanelList;
    });
    const index = useRef(0);
    const [x, setX] = useState(panelList.length > 1 ? DEFAULT_X : 0);
    const [moving, setMoving] = useState(false);
    const [transitionValue, setTransitionValue] = useState("none");
    const [currentDirection, setCurrentDirection] = useState(0);
    const panelCount = virtualPanelList.length;

    const onMove = (directionValue) => {
      if (moving) return;
      index.current = getMovedIndex(directionValue);
      const targetIndex = getMovedIndex(directionValue);

      setMoving(true);
      setCurrentDirection(directionValue);
      setPanelList((panelList) =>
        directionValue > 0
          ? [...panelList, virtualPanelList[targetIndex]]
          : [virtualPanelList[targetIndex], ...panelList]
      );
      if (directionValue === -1) {
        setX(-200);
      }
    };
    _addMover(carouselId, onMove);
    useEffect(() => {
      if (currentDirection !== 0) {
        setTransitionValue(DEFAULT_TRANSITION);
        setX((prevX) => prevX + currentDirection * DEFAULT_X);
        setCurrentDirection(0);
      }
    }, [currentDirection]);

    const getMovedIndex = (directionValue) => {
      return (panelCount + directionValue + index.current) % panelCount;
    };
    const onTransitionEnd = () => {
      setMoving(false);
      setTransitionValue("none");
      setPanelList((panelList) => {
        const resultList = [...panelList];
        if (x === DEFAULT_X) {
          resultList.pop();
        } else if (x === -200) {
          resultList.shift();
          setX(DEFAULT_X);
        }
        return resultList;
      });
    };
    const renderPanelList = () => {
      return panelList.map((panel, index) => {
        return (
          <Panel key={index} gap={gap}>
            {panel.map((item, index) => (
              <Item key={index} {...{ gap, itemCountPerPanel }}>
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
          <Button prev onClick={() => onMove(-1)}>
            <HiOutlineChevronLeft />
          </Button>
        )}
        <CarouselContainer>
          <Slider {...{ onTransitionEnd, x, transitionValue, gap }}>
            {renderPanelList()}
          </Slider>
        </CarouselContainer>
        {!customMode && (
          <Button next onClick={() => onMove(+1)}>
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
    const direction = prev ? -1 : next ? 1 : 0;
    const button =
      children ??
      (prev ? <HiOutlineChevronLeft /> : next ? <HiOutlineChevronRight /> : "");
    return (
      <Button onClick={() => _collectionOfCarouselMover[carouselId](direction)}>
        {button}
      </Button>
    );
  };
  const Counter = () => {
    return <div></div>;
  };
  const _addMover = (targetId, mover) => {
    _collectionOfCarouselMover[targetId] = mover;
  };
  const _cretaeVirtualPanelList = (items, countPer) => {
    if (!Array.isArray(items)) {
      return [items];
    }
    if (items.length === 0) {
      return Array.from({ length: countPer }, () => ALT_COMPONENT);
    }
    return items.reduce((list, item, index) => {
      const [i, j] = _divmod(index, countPer);
      list[i] ? (list[i][j] = item) : (list[i] = [item]);
      return list;
    }, []);
  };
  const _createPanelList = (virtualPanelList) => {
    const len = virtualPanelList.length;
    const last = virtualPanelList[len - 1];
    if (len === 1) {
      return virtualPanelList;
    } else if (len === 2) {
      return [last, ...virtualPanelList];
    } else {
      return [last, ...virtualPanelList.slice(0, 2)];
    }
  };

  return { Carousel, Controller, Counter };
};
const _divmod = (a, b) => {
  return [parseInt(a / b), a % b];
};
const Wrapper = styled.div`
  width: 100%;
  ${({ customMode }) =>
    !customMode &&
    css`
      display: flex;
      align-items: center;
    `}
`;
const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
const Slider = styled.div`
  width: 100%;
  ${({ x, transitionValue, gap }) => css`
    transform: ${`translate3d(${x}%, 0, 0)`};
    transition: ${transitionValue};
    padding-right: ${gap};
  `}
  display: flex;
`;
const Panel = styled.ul`
  width: 100%;
  margin: 0;
  display: flex;
  flex: 1 0 auto;
  padding: 0;
  ${({ gap }) => {
    return css`
      padding-right: ${gap};
    `;
  }};
`;
const Item = styled.li`
  list-style-type: none;
  ${({ itemCountPerPanel, gap }) =>
    css`
      width: ${`calc(100%/${itemCountPerPanel})`};
      & + & {
        margin-left: ${gap};
      }
    `}
`;
const Button = styled.div`
  font-size: 2rem;
`;
const ALT_COMPONENT = styled.div`
  background: tan;
`;
const { Carousel, Controller, Counter } = _carouselModule();

export { Controller, Counter };
export default Carousel;
