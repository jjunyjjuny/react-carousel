# react-carousel

this library make list into carousel in React

## Installation

Using npm : 

```
$ npm i @jjunyjjuny/react-carousel
```


## Usage with styled-components

```
import styled from "styled-components";
import Carousel from "@jjunyjjuny/react-carousel";

const Container = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  width: 500px;
`;
const Item = styled.div`
  height: 50px;
  box-sizing: border-box;
`;
const sampleArray = [1, 2, 3, 4, 6, 7, 8];
const CarouselSample = () => {
  return (
    <Container>
      <h2>Sample</h2>
      <Carousel
        itemsPerPeice={3}
        autoFit
        gap={"10px"}
        onClickItem={() => {
          console.log('click!');
        }}
      >
        {sampleArray.map((el) => (
          <Item>{el}</Item>
        ))}
      </Carousel>
    </Container>
  );
};
```

## props

| Name | Value | Description |
|:---:|:---:|:---:|
|itemsPerPeice|number|number of items to show at a timer per piece |
|gap|string|gap length between items |
|autoFit|boolean|if your item "width" is relative(%), it automatically fits when it is "true" |
|onClickItem|function|callback when item is clicked |
