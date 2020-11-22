import React from 'react';

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      file: null
    }

    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.forgetFile = this.forgetFile.bind(this);
  }

  handleFile(e) {
    this.setState({
      file: e.currentTarget.files[0]
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append('track[title]', this.state.title);
    fileData.append('track[uploader_id]', this.props.currentUserId);
    fileData.append('track[audio]', this.state.file);
    this.props.createTrack(fileData);
  }

  handleChange(type) {
    return e => {
      this.setState({
        [type]: e.currentTarget.value
      })
    }
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
          Drag and drop your track here
        </p>
        <div className="upload-button">
          <label
            className="input-label"
            htmlFor="upload"
          >or choose the file to upload</label>
          <input
            id="upload"
            type="file"
            className="hidden-input"
            onChange={this.handleFile}
          />
        </div>
      </div>
    );
    const uploadForm = (
      <form className="upload-form">
        <p>File: {file === null ? "Nothing selecyed" : file.name}</p>
        <label
          htmlFor="title-input"
          className="title-label"
        >Title</label>
        <input
          id="title-input"
          type="text"
          onChange={this.handleChange("title")}
        />
        <div className="submit-buttons">
          <button
            onClick={this.forgetFile}
            className="cancel-button"
          >Cancel</button>
          <button
            onClick={this.handleSubmit}
            className="save-button"
          >Save</button>
        </div>
      </form>
    );
    return (
      <div className="upload-page">
        <div className="upload-box">
        {this.state.file === null ? uploadControls : uploadForm}
        </div>
      </div>
    )
  }
}

export default Upload;