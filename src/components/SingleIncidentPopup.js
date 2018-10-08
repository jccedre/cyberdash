import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

class singleIncidentPopup extends Component {
  constructor(props) {
    super(props);
    this.domNode = document.createElement('div');
    document.body.appendChild(this.domNode);
  }
  render() {
    return ReactDOM.createPortal(
      <StyledPopup>
        <div>
          <p>Type: {this.props.type}</p>
          <p>Name: {this.props.name}</p>
          <p>Score: {this.props.score}</p>
        </div>
      </StyledPopup>
    ,this.domNode)
  }
}

export default singleIncidentPopup;
