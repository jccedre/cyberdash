import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components';
import tooltip from 'wsdm-tooltip';
import worldMap from '../assets/world-50m.json';
import DataGenerator from '../api/DataGenerator';
import SingleIncidentPopup from './SingleIncidentPopup';
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

const StyledCircle = styled.circle`
  stroke-width: 3;
  opacity: 0.9;
  animation: ${props => props.theme.animations.pulse} 2s ease-in-out infinite;
  transition: all 0.3s;


  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

// Initialize Data
const dataObj = new DataGenerator();


//
// const markers = [
//   { markerOffset: -25, name: 'Buenos Aires', t: [-58.3816, -34.6037] },
//   { markerOffset: -25, name: 'La Paz', coordinates: [-68.1193, -16.4897] },
//   { markerOffset: 35, name: 'Brasilia', coordinates: [-47.8825, -15.7942] },
//   { markerOffset: 35, name: 'Santiago', coordinates: [-70.6693, -33.4489] },
//   { markerOffset: 35, name: 'Bogota', coordinates: [-74.0721, 4.7110] },
//   { markerOffset: 35, name: 'Quito', coordinates: [-78.4678, -0.1807] },
//   { markerOffset: -25, name: 'Georgetown', coordinates: [-58.1551, 6.8013] },
//   { markerOffset: -25, name: 'Asuncion', coordinates: [-57.5759, -25.2637] },
//   { markerOffset: 35, name: 'Paramaribo', coordinates: [-55.2038, 5.8520] },
//   { markerOffset: 35, name: 'Montevideo', coordinates: [-56.1645, -34.9011] },
//   { markerOffset: -25, name: 'Caracas', coordinates: [-66.9036, 10.4806] },
// ];

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

    this.tip = tooltip();
    this.tip.create();
  }

  update() {
    dataObj.generate();
    this.setState({
      incidentData: dataObj.getData,
    });
    console.log(this.state.incidentData);
  }

  popUpHandler(incident, event) {
    this.tip.show(`
          <p>Type: ${incident.type}</p>
          <p>Name: ${incident.name}</p>
          <p>Score: ${incident.score}</p>
        `);
    this.tip.position({ pageX: event.pageX, pageY: event.pageY });
  }

  popDownHandler() {
    this.tip.hide();
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
          score: incident.observed.score,
          type: incident.observed.type,
        }}
        style={{
          default: { fill:  theme.colors.redActive},
          hover: { fill: theme.colors.white },
          pressed: { fill: theme.colors.redHover },
        }}
        onMouseEnter={this.popUpHandler}
        onMouseLeave={this.popDownHandler}
        >
        <StyledCircle
          cx={0}
          cy={0}
          r={3}
          style={{
            stroke: circleColor,
          }}
        />
        {/* <SingleIncidentPopup
          type={incident.observed.type}
          name={incident.observed.name}
          score={incident.observed.score}
        /> */}

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
          <ZoomableGroup center={[0,20]} >
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
              {/* {markers.map((marker, i) => (

              ))} */}
              {markers}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </StyledMap>
    )
  }
}

export default withTheme(Map);
