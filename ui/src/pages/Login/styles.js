import styled from "styled-components";

export const Section = styled.section`
  text-align: center;
  min-height: calc(100vh - 95px - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  box-sizing: border-box;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  line-height: 1.4;
  color: ${props => props.theme.colors.primary};
  margin: 0 0 10px 0;
`;
