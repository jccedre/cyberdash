import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h2`
  margin: 0 1em;
  color: ${props => props.theme.colors.white};
`;

const title = ( props ) => {
  return(
    <StyledTitle>
      {props.children}
    </StyledTitle>
  )
}

export default title;
