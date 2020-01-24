import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: deepskyblue;
  color: white;
  font-weight: bold;
`;

export const HelloFromSub: React.FC = () => {
  const [stateValue, setStateValue] = useState(true);

  return (
    <Container onClick={() => setStateValue(!stateValue)}>
      {stateValue ? "Hello" : "Bye"} from core!
    </Container>
  );
};
