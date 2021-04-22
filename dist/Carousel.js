import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const Carousel = ({
  children: items,
  itemsPerPeice,
  onClickItem,
  gap = "0.5rem",
  autoFit = false,
}) => {
  const [initialSlide, virture] = createVirtureSlides(items, itemsPerPeice);
  const virtureSlides = useRef(virture);
  const container = useRef();
  const currentSlideIndex = useRef(0);
  const direction = useRef("none");
  const [realSlides, setRealSlieds] = useState([initialSlide]);
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      slideContainer(direction.current);
    }
  });

  const move = (dir) => {
    didMountRef.current = true;
    direction.current = dir;
    if (isThereItem(dir)) {
      changeCurrentIndex(dir);
      slideContainer();
      return;
    }
    const newSlides = isEmptyVirtureSlides()
      ? getMovedSlides(dir)
      : getAddedSlides(dir);
    setRealSlieds(newSlides);
  };

  const getMovedSlides = (dir) => {
    const newSlides = [...realSlides];
    if (dir === "prev") {
      const opposite = newSlides.pop();
      newSlides.unshift(opposite);
      container.current.style.transition = "none";
      container.current.style.transform = "translate(calc(-100%))";
    } else {
      const i = currentSlideIndex.current;
      const opposite = newSlides.shift();
      newSlides.push(opposite);
      container.current.style.transition = "none";
      container.current.style.transform = `translate(-${i * 100 - 100}%)`;
    }

    return newSlides;
  };
  const getAddedSlides = (dir) => {
    let newSlide;
    let newSlides;
    if (dir === "prev") {
      newSlide = virtureSlides.current.pop();
      newSlides = [newSlide, ...realSlides];
      container.current.style.transition = "none";
      container.current.style.transform = "translate(-100%)";
    } else {
      currentSlideIndex.current++;
      newSlide = virtureSlides.current.shift();
      newSlides = [...realSlides, newSlide];
    }

    return newSlides;
  };
  const changeCurrentIndex = (dir) => {
    currentSlideIndex.current =
      dir === "prev"
        ? --currentSlideIndex.current
        : ++currentSlideIndex.current;
  };
  const slideContainer = (dir) => {
    const i = currentSlideIndex.current;
    container.current.style.transition = `all 1s ease`;
    container.current.style.transform = `translateX(-${i * 100}%)`;
  };

  const renderList = () => {
    const list = realSlides;
    return list.map((slide, index) => {
      return (
        <Slide key={index} gap={gap}>
          {slide.map((item, index) => (
            <SlideItem
              gap={gap}
              autoFit={autoFit}
              key={index}
              onClick={onClickItem}
              itemsPerPeice={itemsPerPeice}
            >
              {item}
            </SlideItem>
          ))}
        </Slide>
      );
    });
  };
  const isThereItem = (direction) => {
    if (direction === "prev") {
      return currentSlideIndex.current !== 0;
    } else {
      return currentSlideIndex.current !== realSlides.length - 1;
    }
  };
  const isEmptyVirtureSlides = () => {
    return virtureSlides.current.length === 0;
  };
  return (
    <CarouselWrapper>
      <Button prev onClick={() => move("prev")}>
        <HiOutlineChevronLeft />
      </Button>
      <CarouselContent>
        <CarouselContainer gap={gap} ref={container} dir={direction.current}>
          {renderList()}
        </CarouselContainer>
      </CarouselContent>
      <Button next onClick={() => move("next")}>
        <HiOutlineChevronRight />
      </Button>
    </CarouselWrapper>
  );
};

const createVirtureSlides = (items, itemsPerPeice) => {
  if (!Array.isArray(items)) {
    return [[items], []];
  }
  const newItems = items.reduce((result, item, index) => {
    const [i, j] = divmod(index, itemsPerPeice);
    result[i] ? (result[i][j] = item) : (result[i] = [item]);
    return result;
  }, []);
  return [newItems.shift(), newItems];
};

const divmod = (a, b) => {
  return [parseInt(a / b), a % b];
};

const CarouselWrapper = styled.div`
  background: #b5b5b5;
  display: flex;
`;
const CarouselContent = styled.div`
  width: 90%;
  overflow: hidden;
`;
const CarouselContainer = styled.div`
  display: inline-flex;
  width: 100%;
  padding-right: ${({ gap }) => `${gap}`};
`;
const Slide = styled.ul`
  background: #777777;
  display: flex;
  width: 100%;
  flex: 1 0 auto;
  padding: 0;
  padding-right: ${({ gap }) => `${gap}`};
  &::first-child {
  }
`;
const SlideItem = styled.li`
  list-style-type: none;
  ${({ autoFit, itemsPerPeice, gap }) => css`
    width: ${autoFit ? `calc(100%/${itemsPerPeice})` : "auto"};
    & + & {
      margin-left: ${gap};
    }
  `}
`;
const Button = styled.div`
  flex: 1;
  z-index: 2;

  ${(props) => css`
    ${props.prev &&
    css`
      left: 10%;
    `}
    ${props.next &&
    css`
      right: 10%;
    `}
  `};
`;
export default Carousel;
