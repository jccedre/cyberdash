import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { main } from '../Styles/Main';
import Header from './Header';
import Dashboard from './Dashboard';
import MapContainer from './MapContainer';

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={main}>
      <StyledApp className="App" title={this.props.title}>
        <Header/>
        <Dashboard>
          <MapContainer/>
        </Dashboard>
      </StyledApp>
      </ThemeProvider>
    );
  }
}

export default App;
