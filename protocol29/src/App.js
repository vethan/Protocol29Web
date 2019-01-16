import React, { Component } from 'react';
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  ResponsiveContext,
} from 'grommet';

const theme = {
  global: {
    colors: {
      "brand": '#222220',
      "dark": '#000000',
      text: {
        "dark": '#80FF00'
      },
      control: {
        "dark": '#80FF00'
      }

    },
    font: {
      family: 'Source Code Pro',
      size: '14px',
      height: '20px',
    },
  },
};

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='black'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

class App extends Component {
  render() {
    return (
      <Grommet theme={theme} full>
        <Box fill>
          <AppBar>
            <Heading level='3' margin='none'>Protocol 29</Heading>
          </AppBar>
          <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
            <Box flex align='center' justify='center' background='black'>
              <Heading level='1' alignSelf='center' textAlign='center' margin='none'>Protocol 29 initialising...</Heading>

            </Box>
          </Box>
        </Box>

      </Grommet >
    );
  }
}

export default App;
