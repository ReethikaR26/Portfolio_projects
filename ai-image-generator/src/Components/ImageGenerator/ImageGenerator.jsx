import React, {useRef,useState} from 'react'
import default_image from '../Assets/default_image.png'
import './ImageGenerator.css'
const ImageGenerator = () => {

    const [ImageUrl,setImageUrl] = useState("/") ;
    let InputRef=useRef(null);
    const [loading,setLoading] = useState(false);

    const ImageGenerator = async() => {
        if (InputRef.current.value==="") {
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    Authorization:
                    "Bearer ",
                    "User-Agent":"Chrome",
                },
                body: JSON.stringify({
                    model: "gpt-image-1",
                    prompt: InputRef.current.value,
                    n:1,
                    size:"auto",
                }),
            }
        );
        let data=await response.json();
        console.log(data);
        let data_array = data.data;
        setImageUrl(data_array[0].url);
        setLoading(false);
    }

    return (
        <div className='ai-image-generator'>
            <div className="header">AI Image <span>Generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={ImageUrl==='/'?default_image:ImageUrl} alt="Default image" />
                </div>
                <div className="loading">
                    <div className={loading?"loading-bar-full":"loading-bar"}></div>
                    <div className={loading?"loading-text":"display-none"}>Loading...</div>
                </div>
            </div>
            <div className="search">
                <input type="text" ref={InputRef} className="search-input" placeholder='Describe the image you want to generate..'/>
                <div className="search-btn" onClick={() => {ImageGenerator()}}>Generate</div>
            </div>
        </div>
    )
}

export default ImageGenerator