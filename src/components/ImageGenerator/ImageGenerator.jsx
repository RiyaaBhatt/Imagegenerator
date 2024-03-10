import React, { useState, useRef } from 'react';
import './ImageGenerator.css';
import default_image from '../assets/default_image.svg';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    const inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
       
        const response = await fetch("https://api.openai.com/v1/images/generations",{
        method:"POST",
        headers: {
            "Authorization": "Bearer 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",
            "user-agent": "chrome",
            "Content-Type": "application/json", 
        },
        body:JSON.stringify({
            prompt:`${inputRef.current.value}`,
            n:1,
            size:"512x512",

        })

      });
      let data = await response.json();
      console.log(data);  // Add this line to inspect the structure of `data`
      if (data && data.data && data.data[0] && data.data[0].url) {
          setImage_url(data.data[0].url);
      } else {
          console.error('Unexpected structure of `data`:', data);
      }
      
    }

    return (
        <div className='ai-image-generator'>
            <div className="header">ai image <span>generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={image_url === "/" ? default_image : image_url} alt="" />
                </div>
            </div>
            <div className="search-box">
                <input type="text" className='search-input' ref={inputRef} placeholder='describe what type of t-shirt you need' />
                <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
            </div>
        </div>
    );
};

export default ImageGenerator;
