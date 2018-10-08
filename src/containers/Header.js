import React from 'react';
import styled from 'styled-components';
import Logo from '../components/Logo';
import Title from '../components/Title';

const StyledHeader = styled.header`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  background-color: ${props => (props.theme.colors.darkerBlue)};
  min-height: 50px;
  padding: 0.5em 1em;
`;

const header = ( props ) => {
  return (
    <StyledHeader>
      <Logo/>
      <Title>CyberDash</Title>
    </StyledHeader>
  )
}

export default header;
