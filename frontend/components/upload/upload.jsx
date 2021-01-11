import React from 'react';
import TrackForm from './track_form';

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null
    }

    this.handleFile = this.handleFile.bind(this);
    this.forgetFile = this.forgetFile.bind(this);
  }

  handleFile(e) {
    this.setState({
      file: e.currentTarget.files[0]
    });
  }

  forgetFile() {
    this.setState({
      file: null
    });
  }

  render() {
    const { file } = this.state;
    const uploadControls = (
      <div className="upload-controls">
        <p className="upload-message">
          Upload your track here
        </p>
        <div className="upload-button">
          <label
            className="input-label"
            htmlFor="upload"
          >choose the file to upload</label>
          <input
            id="upload"
            type="file"
            className="hidden-input"
            onChange={this.handleFile}
          />
        </div>
      </div>
    );
    return (
      <div className="upload-page">
        <div className="upload-box">
          {this.state.file === null ? uploadControls :
            <TrackForm
              {...this.props} file={file}
              title={""} description={""}
              forgetFile={this.forgetFile}
            />
          }
        </div>
      </div>
    )
  }
}

export default Upload;