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
    userInput: "",
    locationInput: "",
    questionOneData: "",
    questionOneFail: "",
    questionTwoData: "",
    mate1: "",
    mate2: "",
    mate3: "",
    mate4: ""
  }

  componentDidMount() {
    fetch("https://protocol29.gear.host/scores/" + this.state.userInput.toUpperCase()).then(data => { return data.json() }).then(res => {

      this.setState({ foxesScore: res.foxesScore, archersScore: res.archersScore })

    })
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
          this.checkQuestions()

        }
      })
    }
    // this.setState({ idState: 'found' })
  }

  checkQuestions() {
    fetch("https://protocol29.gear.host/question/1/" + this.state.userInput.toUpperCase()).then(data => { return data.json() }).then(res => {
      console.log(res);
      if (res.success) {
        this.setState({ questionOneData: res.data })
      }
    })

    fetch("https://protocol29.gear.host/question/2/" + this.state.userInput.toUpperCase()).then(data => { return data.json() }).then(res => {
      console.log(res);
      if (res.success) {
        this.setState({ questionTwoData: res.data })
      }
    })
  }

  sendQuestionOne() {
    if (this.state.locationInput) {
      fetch("https://protocol29.gear.host/question/1",
        {
          method: "POST",
          body: JSON.stringify({
            user: this.state.selectedId,
            answer: this.state.locationInput
          })
        })
        .then(data => { return data.json() })
        .then(res => {
          if (res.success === false) {
            this.setState({ questionOneFail: this.state.locationInput.toUpperCase() })
          } else {
            this.setState({ questionOneData: res.data, foxesScore: res.foxesScore, archersScore: res.archersScore })
          }
          console.log(res)
        })
    }
    // this.setState({ idState: 'found' })
  }

  sendQuestionTwo() {

    fetch("https://protocol29.gear.host/question/2",
      {
        method: "POST",
        body: JSON.stringify({
          user: this.state.selectedId,
          team: [this.state.mate1, this.state.mate2, this.state.mate3, this.state.mate4]
        })
      })
      .then(data => { return data.json() })
      .then(res => {
        if (res.success === false) {
          this.setState({ questionTwoFail: this.state.mate1 + "," + this.state.mate2 + "," + this.state.mate3 + "," + this.state.mate4 })
        } else {
          this.setState({ questionTwoData: "boom", foxesScore: res.foxesScore, archersScore: res.archersScore })
        }
        console.log(res)
      })

    // this.setState({ idState: 'found' })
  }

  renderQuestionTwo() {
    if (this.state.questionTwoData) {
      return (
        <Box align='center' justify='center' background='black' gap='small'>
          <Text level='4' alignSelf='center' textAlign='center' margin='small'>
            The {this.toTitleCase(this.state.team)} Clan knows their friends.
          </Text>
        </Box>
      )
    }
    else {
      var failLine;
      if (this.state.questionTwoFail) {
        failLine = (<Text level='4' color="fail" alignSelf='center' textAlign='center' margin='none'>These arent four clan mates {this.state.questionTwoFail}</Text>)
      }

      return (
        <Box align='center' justify='center' background='black' gap='small'>
          <Heading level='1' alignSelf='center' textAlign='center' margin='none'>Know your friends.  Enter the IDs of four clanmates:</Heading>
          <TextInput placeholder="Clanmate 1" alignSelf='center' textAlign='center' margin='none'
            onChange={event => this.setState({ mate1: event.target.value })} />
          <TextInput placeholder="Clanmate 2" alignSelf='center' textAlign='center' margin='none'
            onChange={event => this.setState({ mate2: event.target.value })} />
          <TextInput placeholder="Clanmate 3" alignSelf='center' textAlign='center' margin='none'
            onChange={event => this.setState({ mate3: event.target.value })} />
          <TextInput placeholder="Clanmate 4" alignSelf='center' textAlign='center' margin='none'
            onChange={event => this.setState({ mate4: event.target.value })} />
          {failLine}
          <Button label="Enter" onClick={this.sendQuestionTwo.bind(this)} />
        </Box>
      )

    }
  }

  renderQuestionOne() {
    if (this.state.questionOneData) {
      return (
        <Box align='center' justify='center' background='black' gap='small'>
          <Text level='4' alignSelf='center' textAlign='center' margin='none'>
            The {this.toTitleCase(this.state.team)} Clan has solved the first puzzle.
          </Text>
          <Text level='4' alignSelf='center' textAlign='center' margin='none'>
            {this.state.questionOneData}
          </Text>
        </Box>
      )
    }
    else {
      var failLine;
      if (this.state.questionOneFail) {
        failLine = (<Text level='4' color="fail" alignSelf='center' textAlign='center' margin='none'>The location is not {this.state.questionOneFail}</Text>)
      }

      return (
        <Box align='center' justify='center' background='black' gap='small'>
          <Heading level='1' alignSelf='center' textAlign='center' margin='none'>Your clan is blind... enter the name of the first location for your clan:</Heading>
          <TextInput placeholder="Enter location name" alignSelf='center' textAlign='center' margin='none'
            onChange={event => this.setState({ locationInput: event.target.value })} />
          {failLine}
          <Button label="Enter" onClick={this.sendQuestionOne.bind(this)} />
        </Box>
      )

    }
  }

  render() {
    var scoreSection = (
      <Box direction='row' alignSelf='center' gap='xlarge' pad='xlarge' overflow={{ horizontal: 'hidden' }}>
        <Box align='center' justify='center' background='black'>
          <Meter alignSelf='center' round={true} type='circle' size="xsmall" thickness="small" values={[{ value: this.state.foxesScore, label: "foxes" }]} />
          <Heading level='3' margin='none'>Foxes: {this.state.foxesScore}</Heading>
        </Box>


        <Box align='center' justify='center' background='black'>
          <Meter alignSelf='center' round={true} type='circle' size="xsmall" thickness="small" values={[{ value: this.state.archersScore, label: "archers" }]} />
          <Heading level='3' margin='none'>Archers: {this.state.archersScore}</Heading>
        </Box>
      </Box>
    )

    var uninit;
    var QuestionOne;
    var question2;
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
        </Box>
      )

      QuestionOne = this.renderQuestionOne();
      question2 = this.renderQuestionTwo();
    }


    return (
      <Grommet theme={theme} full >
        <Box fill={this.state.idState != 'found'} background='black'>
          <AppBar>
            <Heading level='3' margin='none'>Protocol 29</Heading>
          </AppBar>
          {scoreSection}
          {uninit}
          {QuestionOne}
          {question2}

        </Box>
        <Box fill="horizontal" flex="false" height="medium" background='black'>

        </Box>
      </Grommet >
    );
  }
}

export default App;
