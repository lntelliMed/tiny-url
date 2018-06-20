import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions';

class MainPage extends Component {
  state = {
    longUrl: ''
  }

  handleTinyUrlGeneration = () => {
    this.props.onInitTinyUrl(this.state.longUrl);
  }

  handleLongUrlChange = (event) => {
    this.setState({
      longUrl: event.target.value
    });
  }

  handleLongUrlRedirect = (newUrl) => {
    this.props.onInitLongUrl(newUrl);
  }

  render () {
    let tinyUrl = null;
    if (this.props.tinyUrl) {
      const generatedUrl = `${window.location.protocol}//${window.location.host}/api/urls/${this.props.tinyUrl}`;
      tinyUrl = (
        <div>
          <h2>The generated URL is:</h2>
          <h3 onClick={() => this.handleLongUrlRedirect(this.props.tinyUrl)}>
              {generatedUrl}
            </h3>
        </div>
      );
    }

    if (this.props.longUrl) {
      window.location.assign(this.props.longUrl)
    }

    return (
      <div>
        <label>Please enter the URL that needs to be shortened:</label>
        <br />
        <input type="text" value={this.state.longUrl} onChange={(event) => this.handleLongUrlChange(event)} />
        <br />
        <button onClick={() => this.handleTinyUrlGeneration()}>Generate Tiny URL</button>
        {tinyUrl}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tinyUrl: state.shortenUrl.tinyUrl,
    longUrl: state.shortenUrl.longUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitTinyUrl: (longUrl) => dispatch(actions.fetchTinyUrl(longUrl)),
    onInitLongUrl: (shortUrl) => dispatch(actions.fetchLongUrl(shortUrl))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
