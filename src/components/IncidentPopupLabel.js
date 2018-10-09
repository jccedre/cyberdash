import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.span`
  font-weight: bold;
`;


const incidentPopupLabel = ( props ) => {
  return (
    <p><StyledLabel>{props.label}</StyledLabel> {props.content}</p>
  )
}

export default incidentPopupLabel;
