import React from 'react';

class TinyUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { copyStatus: 'Copy URL' }
  }

  copyToClipboard = (e) => {
    this.tinyUrl.select();
    document.execCommand('copy');
    e.target.focus();
    this.setState({ copyStatus: 'Copied!' });
  };

  render() {
    return (
      <section className="redirect" >
        {
          document.queryCommandSupported('copy') &&
          <div>
            <input
              type="text"
              ref={(tinyUrl) => this.tinyUrl = tinyUrl}
              value={this.props.generatedUrl}
            />
            <br />
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
