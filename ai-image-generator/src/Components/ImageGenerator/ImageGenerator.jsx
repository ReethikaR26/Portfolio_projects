import React, {useRef,useState} from 'react'
import default_image from '../Assets/default_image.png'
import './ImageGenerator.css'
const ImageGenerator = () => {

    const [history,setHistory] = useState([]);
    let InputRef=useRef(null);
    const [loading,setLoading] = useState(false);

    const ImageGenerator = async() => {
        if (InputRef.current.value==="") {
            return 0;
        }
        setLoading(true);
        try{const response = await fetch(
                "http://localhost:5000/api/generate",
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"},    
                    body: JSON.stringify({
                        prompt: InputRef.current.value,
                    }),
                });
                if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Failed to generate");
        }

            const imageBlob = await response.blob();

            const imageUrl = URL.createObjectURL(imageBlob);
            
            
            setHistory((prevHistory)=> [imageUrl, ...prevHistory].slice(0,4));
            
        }catch(error){
            console.error(error);
            alert("Failed to generate image");
        }
        setLoading(false);
    }

    return (
        <div className='ai-image-generator'>
            <div className="header">AI Image <span>Generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={history.length > 0 ? history[0] : default_image} alt="Generated" />
                </div>
                <div className="loading">
                    <div className={loading?"loading-bar-full":"loading-bar"}></div>
                    <div className={loading?"loading-text":"display-none"}>Loading...</div>
                </div>
            </div>
            { history.length > 1 && (
                <div className="gallery">
                    <h3>Your history</h3>
                    <div className="gallery-items">
                        {history.map((img,index) => (
                            <img
                             key={index} src={img}
                             alt={`Recent ${index}`}
                             className={index===0 ? "active-thumb" : "thumb"}
                            />
                        ))}
                    </div>
                </div>
            )
            }
            <div className="search">
                <input type="text" ref={InputRef} className="search-input" placeholder='Describe the image you want to generate..'/>
                <div className="search-btn" onClick={() => {ImageGenerator()}}>Generate</div>
            </div>
        </div>
    )
}

export default ImageGenerator
