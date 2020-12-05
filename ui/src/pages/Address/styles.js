import styled from "styled-components";

export const Form = styled.div`
  @media (min-width: 768px) {
    flex-grow: 1;
    margin-left: 100px;

    input,
    button {
      max-width: 400px;
    }
  }
`;

export const Information = styled.div`
  margin: 0 0 50px 0;
  @media (min-width: 768px) {
    display: flex;
  }
`;

export const Current = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
  line-height: 2;
`;
