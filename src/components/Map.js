import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components';
import worldMap from '../assets/world-50m.json';
import DataGenerator from '../api/DataGenerator';
import SingleIncidentPopup from './SingleIncidentPopup';
import StyledCircle from './StyledCircle';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';

const StyledMap = styled.div`
  width: 100%;
  max-width: 980;
  margin: 0 auto;

  &:hover {
    cursor: grab;
  }

  &:active {
    cursor: grabbing;
  }
`;

// Initialize Data
const dataObj = new DataGenerator();


class Map extends Component {

  constructor(props) {
    super();
    this.popUpHandler = this.popUpHandler.bind(this);
    this.popDownHandler = this.popDownHandler.bind(this);
  }

  state = {
    incidentData: dataObj.getData,
    popUp: {
      show: false,
      x: 0,
      y: 0,
      name: null,
      type: null,
      score: null,
      fqdn: null,
      observedAt: null,
    },
  }

  componentDidMount() {
    this.setState({
      incidentData: dataObj.getData,
    });

    this.update();

    setInterval(
      () => this.update(),
      10000
    );
  }

  update() {
    dataObj.generate();
    this.setState({
      incidentData: dataObj.getData,
    });
    console.log(this.state.incidentData);
  }

  popUpHandler(incident, event) {
    this.setState({
      popUp: {
        show: true,
        x: event.pageX,
        y: event.pageY,
        name: incident.name,
        type: incident.type,
        score: incident.score,
        fqdn: incident.fqdn,
        observedAt: incident.observedAt,
      }
    });
  }

  popDownHandler() {
    this.setState({
      popUp: {
        show: false,
      }
    });
  }


  render() {
    const {
     theme
   } = this.props;

    const markers = this.state.incidentData.map(incident => {
      const coordiates = [incident.location.long, incident.location.lat];
      const circleColor = (incident.observed.score > 75) ? theme.colors.red : theme.colors.purple;
      return <Marker
        key={incident.id}
        marker={{
          coordinates: coordiates,
          name: incident.observed.name,
          type: incident.observed.type,
          score: incident.observed.score,
          fqdn: incident.fqdn,
          observedAt: incident.observedAt,
        }}
        style={{
          default: { fill:  theme.colors.redActive},
          hover: { fill: theme.colors.white },
          pressed: { fill: theme.colors.redHover },
        }}
        onMouseEnter={this.popUpHandler}
        >
        <StyledCircle
          cx={0}
          cy={0}
          r={3}
          style={{
            stroke: circleColor,
          }}
        />
      </Marker>
    });

    return (
      <StyledMap>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11,0,0],
          }}
          width={980}
          height={551}
          style={{
            width: '100%',
            height: 'auto',
          }}
          >
          <ZoomableGroup center={[0,20]}>
            <Geographies geography={worldMap}>
              {(geographies, projection) => geographies.map((geography, i) => geography.id !== 'ATA' && (
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  tabable="false"
                  style={{
                    default: {
                      fill: '#ECEFF1',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                    hover: {
                      fill: '#ECEFF1',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#ECEFF1',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                  }}
                />
              ))}
            </Geographies>
            <Markers>
              {/* display markers */}
              {markers}
            </Markers>
            <SingleIncidentPopup
              show={this.state.popUp.show}
              observedAt={this.state.popUp.observedAt}
              name={this.state.popUp.name}
              type={this.state.popUp.type}
              score={this.state.popUp.score}
              fqdn={this.state.popUp.fqdn}
              x={this.state.popUp.x}
              y={this.state.popUp.y}
              onMouseLeave={this.popDownHandler}
            />
          </ZoomableGroup>
        </ComposableMap>
      </StyledMap>
    )
  }
}

export default withTheme(Map);
