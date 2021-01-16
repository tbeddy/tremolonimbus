import React, { useState } from 'react';
import TrackCreateForm from './track_create_form';

export default props => {
  const [file, setFile] = useState(null);

  const uploadControls = (
    <div className="upload-box">
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
            accept="audio/*"
            className="hidden-input"
            onChange={e => setFile(e.currentTarget.files[0])}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="upload-page">
      {file === null ? uploadControls :
        <div className="upload-track-form-container">
          <TrackCreateForm
            {...props}
            currentUserId={props.currentUserId}
            createTrack={props.createTrack}
            file={file} title={""} description={""}
            cancelAction={() => setFile(null)}
          />
        </div>
      }
    </div>
  )
}