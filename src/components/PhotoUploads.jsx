import React, { useState, useCallback } from 'react';
import { uploadPhoto } from '../store.js';
import { useDropzone } from 'react-dropzone';
import './PhotoUploads.css';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

function postImage({ image }, setImage) {
    const formData = new FormData();
    formData.append('image', image);
    // formData.append('description', description);

    uploadPhoto(formData, setImage);
}

function PhotoUploads({ image, setImage }) {
    const [file, setFile] = useState();
    const [description, setDescription] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        console.log('accepted files', acceptedFiles);
        postImage({ image: acceptedFiles[0] }, setImage);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accepts: 'image/*',
        multiple: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = postImage({ image: file });
    }

    const fileSelected = (event) => {
        const files = event.target.files[0];
        console.log('image uploaded', files);
        setFile(files);
    }

    return (
        <div className="profile-pic">
            <div className="profile-pic-header">
                <PhotoCameraIcon />
                <h4>Upload profile picture</h4>
            </div>
            <form className="profile-pic-form" onSubmit={handleSubmit}>
                {/* <input onChange={(e) => fileSelected(e)} type="file" accept="image/*"></input> */}
                {/* <button type="submit">Submit</button> */}
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <p>click to add photo</p>
                </div>
                <div className="uploaded-pic">
                    {image && (
                        <>
                            <p>Preview: </p>
                            <img src={image} />
                        </>
                    )}
                </div>
            </form>
        </div>
    )
}

export default PhotoUploads;
