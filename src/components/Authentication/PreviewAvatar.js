import React from 'react'

function PreviewAvatar({avatar}) {
    const [preview, setPreview] = React.useState(null);

    const reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onload = () => {
        setPreview(reader.result);
    };


  return (
    <div>
        
        {preview ? <img src={preview} alt="preview" /> : "No image selected"}
    </div>
  )
}

export default PreviewAvatar;