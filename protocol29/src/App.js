import React, { Component } from 'react';
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Meter,
  ResponsiveContext,
  TextInput,
  Text,
} from 'grommet';

const theme = {
  global: {
    colors: {
      "brand": '#222220',
      "dark": '#000000',
      "fail": '#bb0000',
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
  state = {
    foxesScore: 0,
    archersScore: 0,
    idState: 'none',
    selectedId: "Someid"
  }

  render() {
    var scoreSection = (
      <Box direction='row' alignSelf='center' gap='xlarge' pad='xlarge' overflow={{ horizontal: 'hidden' }}>
        <Box align='center' justify='center' background='black'>
          <Meter alignSelf='center' round='true' type='circle' size="xsmall" thickness="small" values={[{ value: this.state.foxesScore, label: "foxes" }]} />
          <Heading level='3' margin='none'>Foxes</Heading>
        </Box>


        <Box align='center' justify='center' background='black'>
          <Meter alignSelf='center' round='true' type='circle' size="xsmall" thickness="small" values={[{ value: this.state.archersScore, label: "archers" }]} />
          <Heading level='3' margin='none'>Archers</Heading>
        </Box>
      </Box>
    )

    var uninit;
    if (this.state.idState == 'none') {
      uninit = (
        <Box align='center' justify='center' background='black' gap='small'>
          <Heading level='1' alignSelf='center' textAlign='center' margin='none'>Enter your Protocol 29 id:</Heading>
          <TextInput placeholder="Enter id here" alignSelf='center' textAlign='center' margin='none' />
          <Button label="Enter" />
        </Box>
      )
    } else if (this.state.idState == 'failed') {
      uninit = (
        <Box align='center' justify='center' background='black' gap='small'>
          <Heading level='1' alignSelf='center' textAlign='center' margin='none'>Enter your Protocol 29 id:</Heading>
          <TextInput placeholder="Enter id here" alignSelf='center' textAlign='center' margin='none' />
          <Text level='4' color="fail" alignSelf='center' textAlign='center' margin='none'>Failed! {this.state.selectedId} doesn't exist</Text>
          <Button label="Enter" />
        </Box>
      )
    } else if (this.state.idState == 'found') {
      //TODO:  Display the team + Name + ID
      uninit = (
        <Box align='center' justify='center' background='black' gap='small'>
          <Heading level='1' alignSelf='center' textAlign='center' margin='none'>Enter your Protocol 29 id:</Heading>
          <TextInput placeholder="Enter id here" alignSelf='center' textAlign='center' margin='none' />
          <Text level='4' color="fail" alignSelf='center' textAlign='center' margin='none'>Failed! {this.state.selectedId} doesn't exist</Text>
          <Button label="Enter" />
        </Box>
      )
    }
    return (
      <Grommet theme={theme} full>
        <Box fill background='black'>
          <AppBar>
            <Heading level='3' margin='none'>Protocol 29</Heading>
          </AppBar>
          {scoreSection}
          {uninit}



        </Box>

      </Grommet >
    );
  }
}

export default App;
