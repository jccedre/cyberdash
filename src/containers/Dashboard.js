import React from 'react';
import styled from 'styled-components';

const StyledDashboard = styled.section`
  display: flex;
  flex-flow: row wrap;
  padding: 1em;
  background-color: ${props => props.theme.colors.darkBlue};
  height: 100%;
  min-width: 768px;
`;

const dashboard = ( props ) => {
  return (
    <StyledDashboard>
      {props.children}
    </StyledDashboard>
  )
}

export default dashboard;
