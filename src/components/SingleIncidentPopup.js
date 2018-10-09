import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import moment from 'moment';
import IncidentPopupLabel from './IncidentPopupLabel';

const StyledPopup = styled.div`
  display: flex;
  flex-flow: row wrap;
  background-color: ${props => props.theme.colors.white};
  visibility: ${props => (props.show) ? 'visible' : 'hidden'};
  opacity: ${props => (props.show) ? 1 : 0};
  z-index: 3;
  position: fixed;
  border-radius: 3px;
  padding: 1em;
  width: 200px;
  height: 200px;
  left: ${props => props.x - 200 / 2}px;
  top: ${props => props.y - 200 / 2}px;
  transition: opacity 0.5s;
  border: 2px solid ${props => props.theme.colors.blue};
  box-shadow: 5px 10px 5px 0 rgba(000, 000, 000, 0.5);
`;

class singleIncidentPopup extends Component {
  constructor(props) {
    super(props);

    const id = 'incidentSinglePopup';
    this.domNode = document.querySelector(`#${id}`);

    if (!this.domNode) {
      this.domNode = document.createElement('div');
      this.domNode.setAttribute('id', id);
      document.body.appendChild(this.domNode);
    }
  }

  render() {

    const formatTime = moment.unix(this.props.observedAt).toString();

    return ReactDOM.createPortal(
      <StyledPopup
        show={this.props.show}
        x={this.props.x}
        y={this.props.y}
        onMouseLeave={this.props.onMouseLeave}
        >
        <div>
          {
            /* Needs to be refactored into a loop */
          }
          <IncidentPopupLabel
            label='Observed At:'
            content={formatTime}
          />
          <IncidentPopupLabel
            label='FQDN:'
            content={this.props.fqdn}
          />
          <IncidentPopupLabel
            label='Type:'
            content={this.props.type}
          />
          <IncidentPopupLabel
            label='Name:'
            content={this.props.name}
          />
          <IncidentPopupLabel
            label='Score:'
            content={this.props.score}
          />
        </div>
      </StyledPopup>
    ,this.domNode)
  }
}

export default singleIncidentPopup;
