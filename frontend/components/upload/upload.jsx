import React, { useState } from 'react';
import TrackForm from './track_form';

export default props => {
  const [file, setFile] = useState(null);

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
          onChange={e => setFile(e.currentTarget.files[0])}
        />
      </div>
    </div>
  );

  return (
    <div className="upload-page">
      <div className="upload-box">
        {file === null ? uploadControls :
          <TrackForm
            {...props}
            file={file} title={""} description={""}
            forgetFile={() => setFile(null)}
          />
        }
      </div>
    </div>
  )
}