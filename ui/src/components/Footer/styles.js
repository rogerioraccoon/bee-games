import styled from "styled-components";

export const Section = styled.footer`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px 0;
`;

export const Copyright = styled.p`
  font-size: 16px;
  text-align: center;
  color: #ffffff;

  @media (min-width: 1024px) {
    text-align: left;
  }
`;
