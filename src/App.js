import Carousel, { Controller } from "./lib/Carousel.js";
import styled from "styled-components";
import CarouselSample from "./lib/CarouselSample";
const sampleArray = [
  { id: 0, text: "Sample0" },
  { id: 1, text: "Sample1" },
  { id: 2, text: "Sample2" },
  { id: 3, text: "Sample3" },
  { id: 4, text: "Sample4" },
  { id: 5, text: "Sample5" },
];

function App() {
  return (
    <>
      {/* <SampleWrapper>
        <SampleCarouselBlock>
          <Carousel
            itemCountPerPanel={1}
            customMode
            carouselId={4}
            gap={"10px"}
          >
            {sampleArray.map((el) => (
              <SampleBlock key={el.id}>
                <h2>{el.id}</h2>
                <div>{el.text}</div>
              </SampleBlock>
            ))}
          </Carousel>
          <Controller prev carouselId={4} />
          <Controller next carouselId={4} />
        </SampleCarouselBlock>
        <SampleCarouselBlock>
          <Carousel
            itemCountPerPanel={1}
            customMode
            carouselId={2}
            gap={"10px"}
          >
            {sampleArray.map((el) => (
              <SampleBlock key={el.id}>
                <h2>{el.id}</h2>
                <div>{el.text}</div>
              </SampleBlock>
            ))}
          </Carousel>
          <Controller prev carouselId={2} />
          <Controller next carouselId={2} />
        </SampleCarouselBlock>
      </SampleWrapper> */}
      <CarouselSample />
    </>
  );
}
const SampleWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SampleCarouselBlock = styled.div`
  width: 100px;
`;
const SampleBlock = styled.div``;
export default App;
