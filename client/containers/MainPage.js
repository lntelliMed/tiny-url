import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import * as actions from '../store/actions';
import Error from '../components/Error';
import TinyUrl from '../components/TinyUrl';

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

  handleRedirect = (newUrl) => {
    window.location.assign(newUrl);
  }

  // handleLongUrlRedirect = (newUrl) => {
  //   this.props.onInitLongUrl(newUrl);
  // }

  render () {
    let pending = null;
    let tinyUrl = null;
    let error = null;

    if (this.props.isPending) {
      pending = <p>Retrieving the short URL. Please wait!</p>
    }

    if (this.props.tinyUrl) {
      // const generatedUrl = `${window.location.protocol}//${window.location.host}/${this.props.tinyUrl}`;
      const generatedUrl = this.props.tinyUrl;
      tinyUrl = (
        <div>
          <h2>The generated URL is:</h2>
          {/* <h3 onClick={() => this.handleLongUrlRedirect(this.props.tinyUrl)}>
              {generatedUrl}
          </h3> */}
          {/* <button id="redirect-button" onClick={() => window.location.assign(this.state.longUrl)}>Go to URL</button> */}
          {/* <h3>
            {generatedUrl}
          </h3> */}
          {/* <button id="redirect-button" onClick={() => window.location.assign(generatedUrl) }>Visit Generated URL</button> */}
          <TinyUrl generatedUrl={generatedUrl} redirect={this.handleRedirect} />
        </div>
      );
    }

    if (this.props.longUrl) {
      window.location.assign(this.props.longUrl);
    }

    if (this.props.error) {
      error = <Error error={this.props.error} />
    }

    return (
      <div className="container">
        <Header />
        <h1>Please enter the long URL that needs to be shortened:</h1>
        <br />
        <input
          type="text"
          value={this.state.longUrl}
          onChange={(event) => this.handleLongUrlChange(event)}
          placeholder="http://www.example.org /5668639101419520/5649050225344512/5668600916475904/"
        />
        <br />
        <button onClick={() => this.handleTinyUrlGeneration()}>Generate Tiny URL</button>
        {tinyUrl}
        {pending}
        {error}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tinyUrl: state.shortenUrl.tinyUrl,
    longUrl: state.shortenUrl.longUrl,
    isPending: state.shortenUrl.isPending,
    error: state.shortenUrl.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitTinyUrl: (longUrl) => dispatch(actions.fetchTinyUrl(longUrl)),
    onInitLongUrl: (shortUrl) => dispatch(actions.fetchLongUrl(shortUrl))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
