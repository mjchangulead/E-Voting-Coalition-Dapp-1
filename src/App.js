import React, { Component } from 'react';
import { connect } from 'react-redux';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Friends from './components/Friends/Friends';
import './App.css';

import { submitShowIdea } from './actions'

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  clickuser: '',
  isFaceDetect: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

const mapStateToProps = state => {
  return{
    //user: state.submitShowIdea.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonSubmit: () => dispatch(submitShowIdea())
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => { 
    this.setState({imageUrl: this.state.input});
      fetch('https://murmuring-sea-22947.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://murmuring-sea-22947.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if ((route === 'friends')||(route === 'facedetect')) {
      this.setState({isSignedIn: true})
      if (route === 'facedetect') {
        this.setState({isFaceDetect: true})
      } else {
        this.setState({isFaceDetect: false})
      }
    }
    this.setState({route: route});
  }

  onSubmitIdea = (clickname) => {
    this.setState({clickuser: clickname});
    this.onRouteChange('facedetect');
  }

  render() {
    const { isSignedIn, imageUrl, route, box, isFaceDetect } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} isFaceDetect={isFaceDetect} />
        { route === 'facedetect'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
                clickname={this.state.clickuser}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'register'
             ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : (route === 'friends' 
               ? <Friends onSubmitIdea={this.onSubmitIdea} />
               : <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
            )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
