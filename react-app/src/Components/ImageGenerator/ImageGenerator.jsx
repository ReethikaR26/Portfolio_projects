import React from 'react'
import default_image from '../Assets/default_image.png'
import './ImageGenerator.css'
const ImageGenerator = () => {
    return (
        <div className='ai-image-generator'>
            <div className="header">AI Image <span>Generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={default_image} alt="Default image" />
                </div>
            </div>
            <div className="search">
                <input type="text" className="search-input" placeholder='Describe the image you want to generate..'/>
                <div className="search-btn">Generate</div>
            </div>
        </div>
    )
}

export default ImageGenerator