import React from 'react';
import styled from 'styled-components';
import Map from '../components/Map';

const StyledMapContainer = styled.section`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  max-width: 75em;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.darkerBlue};
  flex: 1 1 auto;
  border-radius: 10px;
`;


const mapContainer = ( props ) => {
  return (
    <StyledMapContainer>
      <Map/>
    </StyledMapContainer>
  )
}

export default mapContainer;
