## Notice!

- I am practicing npm publish right now. There may be an error, so be careful when using it....

- I plan to add function loop or not, autoplay, dot or number counter ...

- Thank you for your attention!!

<br/>

# 🎠 react-carousel

this library make list into carousel in React

<br/>

## 🔲Sample 

![carousel2](https://user-images.githubusercontent.com/41738385/116840924-912d8380-ac12-11eb-9445-bdc678faa781.gif)

![carousel3](https://user-images.githubusercontent.com/41738385/116840940-a0143600-ac12-11eb-9d1f-866fe68476fd.gif)


<br/>

## 🚀 Installation

Using npm :

```
$ npm i @jjunyjjuny/react-carousel
```

<br/>

## Usage with styled-components

<br/>

### default

```
import styled from "styled-components";
import Carousel from "@jjunyjjuny/react-carousel";

const Container = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  width: 480px;
`;
const Item = styled.div`
  background: #dbe4ff;
  text-align: center;
  font-size: 2rem;
  line-height: 145px;
  height: 150px;
  border-radius: 10px;
`;

const sampleArray = [1, 2, 3, 4, 6, 7, 8];
const CarouselSample = () => {
  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>Sample Carousel</h2>
      <Carousel itemCountPerPanel={3}>
        {sampleArray.map((el) => (
          <Item>{el}</Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default CarouselSample;
```

<br/>

### customMode

```
import styled from "styled-components";
import Carousel, { Controller } from "@jjunyjjuny/react-carousel";

const Container = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  width: 480px;
`;
const Item = styled.div`
  background: #dbe4ff;
  text-align: center;
  font-size: 2rem;
  line-height: 145px;
  height: 150px;
  border-radius: 10px;
`;
const ControllerBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const sampleArray = [1, 2, 3, 4, 6, 7, 8];
const CarouselSample = () => {
  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>Sample customMode</h2>
      <Carousel itemCountPerPanel={3} customMode carouselId={"jjunyjjuny"}>
        {sampleArray.map((el) => (
          <Item>{el}</Item>
        ))}
      </Carousel>
      <ControllerBox>
        <Controller prev carouselId={"jjunyjjuny"} />
        <Controller next carouselId={"jjunyjjuny"} />
      </ControllerBox>
    </Container>
  );
};

export default CarouselSample;
```

<br/>

## 📃 props

<br/>

### Carousel

|       Name        |     Value      |                                                Description                                                 |
| :---------------: | :------------: | :--------------------------------------------------------------------------------------------------------: |
| itemCountPerPanel |     number     |                                Number of items to show at a timer per piece                                |
|        gap        |     string     |                                          Gap length between items                                          |
|    customMode     |    boolean     | Custom mode can be activated with this prop. In custom mode, the carousel and controller can be separated. |
|    carouselId     | primitive type |                     The only value that corresponds to the controller in custom mode.                      |

<br/>

### Controller

|    Name    |     Value      |                          Description                           |
| :--------: | :------------: | :------------------------------------------------------------: |
| carouselId | primitive type | The ID value of the carousel to which the controller will move |
| prev, next |    boolean     |      Direction in which the controller moves the carousel      |
|  children  | Component, jsx |       if you want your own button, insert it as children       |
