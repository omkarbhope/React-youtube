import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import youtube from './api/youtube';
import { SearchBar, VideoDetail, VideoList } from './components';
import logo from './images/yt_icon_rgb.png';


class App extends Component {

  state = { 
    videos: [],
    selectedVideo: null
  
  }

  onVideoSelect= (video) => {
    this.setState(
      { selectedVideo:video }
    )
  }

  handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', 
    { params: {
      part: 'snippet',
      maxResults: 5,
      key: '',
      q: searchTerm,
  }
  });
    this.setState(
      { videos: response.data.items, selectedVideo: response.data.items[0] }
    )
  }

  render() {
    const { selectedVideo ,videos} = this.state;
    return (
      <Grid style={{ justifyContent: "center" }} container spacing={10}>
        <Grid item xs={11}>
          <Grid container spacing={5}>
            <Grid item xs={1} style={{ justifyContent: "center" }}>
              <img width="100%" height="80" src={logo} alt="Youtube" />
            </Grid>
            <Grid item xs={11}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={9}>
              <VideoDetail video= {selectedVideo}/>
            </Grid>
            <Grid item xs={3}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default App;

