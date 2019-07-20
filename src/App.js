import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.vidRef = React.createRef();
    this.state = {
      currentTime: 0,
      duration: 0,
      progress: 0,
      paused: true,
      muted: false
    };
  }

  setDuration = () => {
    this.setState({duration: this.vidRef.current.duration});
  }

  updateTime = () => {
    this.setState({
      currentTime: this.vidRef.current.currentTime,
      progress: 100*this.state.currentTime/this.state.duration
    });
  }

  playPause = () => {
    this.vidRef.current.paused ? this.vidRef.current.play() : this.vidRef.current.pause();
    this.setState({paused: this.vidRef.current.paused});
  }

  muteUnmute = () => {
    this.vidRef.current.muted = !this.vidRef.current.muted;
    this.setState({muted: this.vidRef.current.muted});
  }

  render() {
    return (
      <Card id="vp-card">
        <CardHeader
          avatar={
            <Avatar className="vp-avatar bg-secondary" aria-label="Vid Player">
              <OndemandVideoIcon />
            </Avatar>
          }
          title="Vid Player by Iker"
          subheader="July 19, 2019"
        />
        <video id="vp-media" width="100%" ref={this.vidRef}
          onLoadedMetadata={this.setDuration} onTimeUpdate={this.updateTime}>
          <source src="https://s3-eu-west-1.amazonaws.com/onrewind-test-bucket/big_buck_bunny.mp4" 
            type="video/mp4" />
        </video>
        <CardActions>
          <IconButton aria-label="Play/Pause" onClick={this.playPause}>
            {this.state.paused ? (<PlayArrowIcon />) : (<PauseIcon />)}
          </IconButton>
          <LinearProgress id="vp-progress" variant="determinate" value={this.state.progress} />
          <span>{Math.floor(this.state.currentTime)}/{Math.floor(this.state.duration)}</span>
          <IconButton aria-label="Play/Pause" onClick={this.muteUnmute}>
            {this.state.muted ? (<VolumeOffIcon />) : (<VolumeUpIcon />)}
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default App;

