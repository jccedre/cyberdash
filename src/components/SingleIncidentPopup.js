import React from 'react';
import styled from 'styled-components';

const StyledPopup = styled.div`
  display: flex;
  flex-flow: row wrap;
  background-color: ${props => props.theme.colors.white};
  visibility: ${props => (props.show) ? 'visible' : 'hidden'};
  z-index: 3;
  position: fixed;
  border-radius: 3px;
  padding: 1em;
`;

const singleIncidentPopup = ( props ) => {
  return (
    <StyledPopup>
      <div>
        <p>Type: {props.type}</p>
        <p>Name: {props.name}</p>
        <p>Score: {props.score}</p>
      </div>
    </StyledPopup>
  )
}

export default singleIncidentPopup;
