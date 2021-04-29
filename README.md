
## Warning! 
- I am practicing npm publish right now. There may be an error, so be careful when using it.... 
- **Do not use this with StrictMode!!!!!!**
- Thank you for your attention!!

# react-carousel

this library make list into carousel in React
## Installation

Using npm :

```
$ npm i @jjunyjjuny/react-carousel
```

## Usage with styled-components

### default 

```
import styled from "styled-components";
import carouselContext from "@jjunyjjuny/react-carousel";

const { Carousel } = carouselContext

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
      >
        {sampleArray.map((el) => (
          <Item>{el}</Item>
        ))}
      </Carousel>
    </Container>
  );
};
```

### customMode

```
import styled from "styled-components";
import carouselContext from "@jjunyjjuny/react-carousel";

const { Carousel, Controller } = carouselContext

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
      <Controller prev carouselId={1}>
      <Carousel
        carouselId={1}
        customMode
        itemsPerPeice={3}
        autoFit
        gap={"10px"}
      >
        {sampleArray.map((el) => (
          <Item>{el}</Item>
        ))}
      </Carousel>
      <Controller next carouselId={1}>

    </Container>
  );
};
```


## props

<br/>

### Carousel

|     Name      |     Value      |                                                Description                                                 |
| :-----------: | :------------: | :--------------------------------------------------------------------------------------------------------: |
| itemsPerPeice |     number     |                                Number of items to show at a timer per piece                                |
|      gap      |     string     |                                          Gap length between items                                          |
|    autoFit    |    boolean     |                If your item "width" is relative(%), it automatically fits when it is "true"                |
|  customMode   |    boolean     | Custom mode can be activated with this prop. In custom mode, the carousel and controller can be separated. |
|  carouselId   | primitive type |                     The only value that corresponds to the controller in custom mode.                      |

<br/>

### Controller

|    Name    |     Value      |                          Description                           |
| :--------: | :------------: | :------------------------------------------------------------: |
| carouselId | primitive type | The ID value of the carousel to which the controller will move |
| prev, next |    boolean     |      Direction in which the controller moves the carousel      |
