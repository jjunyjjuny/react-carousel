import carouselContext from "./lib/Carousel.v3";
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
  { id: 9, text: "test9" },
  { id: 10, text: "test10" },
  { id: 11, text: "test11" },
  { id: 12, text: "test12" },
];
const { Carousel, PrevButton, NextButton } = carouselContext;
function App() {
  return (
    <TestWrapper>
      <PrevButton carouselId={1}></PrevButton>
      <Carousel itemsPerPeice={3} autoFit carouselId={1}>
        {testArray.map((el) => (
          <TestBlock>
            <h2>{el.id}</h2>
            <div>{el.text}</div>
          </TestBlock>
        ))}
      </Carousel>
      <NextButton carouselId={1}></NextButton>
    </TestWrapper>
  );
}
const TestWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const TestBlock = styled.div``;
export default App;
