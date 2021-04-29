import carouselContext from "./lib/Carousel";
import styled from "styled-components";
const testArray = [
  { id: 1, text: "test1" },
  { id: 2, text: "test2" },
  { id: 3, text: "test3" },
  { id: 4, text: "test4" },
  { id: 5, text: "test5" },
  { id: 6, text: "test6" },
  { id: 7, text: "test7" },
  { id: 8, text: "test8" },
];
const { Carousel, Controller } = carouselContext;

function App() {
  return (
    <TestWrapper>
      <TestCarouselBlock>
        <Carousel itemsPerPeice={4} autoFit customMode carouselId={4}>
          {testArray.map((el) => (
            <TestBlock>
              <h2>{el.id}</h2>
              <div>{el.text}</div>
            </TestBlock>
          ))}
        </Carousel>
      </TestCarouselBlock>
      <Controller carouselId={4} prev />
      <Controller carouselId={4} next />
    </TestWrapper>
  );
}
const TestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TestCarouselBlock = styled.div`
  width: 400px;
`;
const TestBlock = styled.div``;
export default App;
