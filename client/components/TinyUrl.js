import React from 'react';

class TinyUrl extends React.Component {
  state = {
    copyStatus: 'Copy URL'
  }

  copyToClipboard = (e) => {
    this.tinyUrl.select();
    document.execCommand('copy');
    e.target.focus();

    this.setState({
      copyStatus: 'Copied!'
    });
  };

  render() {
    return (
      <section className="redirect" >
        <h2>The generated URL is:</h2>
        <input
          type="text"
          ref={(tinyUrl) => this.tinyUrl = tinyUrl}
          defaultValue={this.props.generatedUrl}
        />
        <br />
        {
          document.queryCommandSupported('copy') &&
          <div>
            <button onClick={() => this.props.redirect(this.props.generatedUrl) }>Visit URL</button>
            <button onClick={this.copyToClipboard}>{this.state.copyStatus}</button>
            <button onClick={() => this.props.reset()}>Reset</button>
          </div>
        }
      </section>
    );
  }
}

export default TinyUrl;
