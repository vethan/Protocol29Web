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
    selectedId: "Someid",
    playerName: "Jackson",
    team: "archers",
    userInput: ""
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  sendThing() {
    if (this.state.userInput) {
      fetch("https://protocol29.gear.host/user/" + this.state.userInput.toUpperCase()).then(data => { return data.json() }).then(res => {
        if (res.success === false) {
          this.setState({ idState: "failed" })
        } else {
          this.setState({ idState: "found", playerName: res.name, selectedId: res.id, team: res.team })
        }
        console.log(res)
      })
    }
    // this.setState({ idState: 'found' })
  }

  render() {
    var scoreSection = (
      <Box direction='row' alignSelf='center' gap='xlarge' pad='xlarge' overflow={{ horizontal: 'hidden' }}>
        <Box align='center' justify='center' background='black'>
          <Meter alignSelf='center' round={true} type='circle' size="xsmall" thickness="small" values={[{ value: this.state.foxesScore, label: "foxes" }]} />
          <Heading level='3' margin='none'>Foxes</Heading>
        </Box>


        <Box align='center' justify='center' background='black'>
          <Meter alignSelf='center' round={true} type='circle' size="xsmall" thickness="small" values={[{ value: this.state.archersScore, label: "archers" }]} />
          <Heading level='3' margin='none'>Archers</Heading>
        </Box>
      </Box>
    )

    var uninit;
    if (this.state.idState === 'none') {
      uninit = (
        <Box align='center' justify='center' background='black' gap='small'>
          <Heading level='1' alignSelf='center' textAlign='center' margin='none'>Enter your Protocol 29 id:</Heading>
          <TextInput placeholder="Enter id here" alignSelf='center' textAlign='center' margin='none'
            onChange={event => this.setState({ userInput: event.target.value })} />
          <Button label="Enter" onClick={this.sendThing.bind(this)} />
        </Box>
      )
    } else if (this.state.idState === 'failed') {
      uninit = (
        <Box align='center' justify='center' background='black' gap='small'>
          <Heading level='1' alignSelf='center' textAlign='center' margin='none'>Enter your Protocol 29 id:</Heading>
          <TextInput placeholder="Enter id here" alignSelf='center' textAlign='center' margin='none'
            onChange={event => this.setState({ userInput: event.target.value })} />
          <Text level='4' color="fail" alignSelf='center' textAlign='center' margin='none'>Failed! {this.state.userInput} doesn't exist</Text>
          <Button label="Enter" onClick={this.sendThing.bind(this)} />
        </Box>
      )
    } else if (this.state.idState === 'found') {
      //TODO:  Display the team + Name + ID
      uninit = (
        <Box align='center' justify='center' background='black' gap='small'>
          <Text level='4' alignSelf='center' textAlign='center' margin='none'>Welcome {this.toTitleCase(this.state.playerName)}! You belong to the {this.toTitleCase(this.state.team)} Clan</Text>
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
