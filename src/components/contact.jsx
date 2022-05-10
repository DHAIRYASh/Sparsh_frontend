
import React, { useEffect, useRef, useState, useCallback } from "react";
import config from "./config.js";
import axios from "axios";

export const Contact = (props) => {
  
  const webcamRef = useRef(null);
  const [capturedImg, setCapturedImg] = useState(null);
  const [img, setImg] = useState(null);
  const [prediction, setPrediction] = useState("");
const[visibleJson,setVisibleJson]=useState(false);
  const [isPaused, setPause] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [jsonUrl, setJsonUrl] = useState("");
  let base64String = "";
  const ws = useRef(null);
  const [showResult, setShowResult] = useState(false);
const[finalImage,setFinalImage]=useState("");
  useEffect(() => {
    const client_id = Date.now();
    const url = `${config.WS_SERVER}/${client_id}`;
    console.log(url);
    ws.current = new WebSocket(url);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (event) => {
      if (isPaused) return;
      const message = JSON.parse(event.data);
      // console.log(message);
      setImg(message.output);
      setPrediction(message.prediction);
    };
  }, [isPaused]);

  function sendMessage(msg) {
    if (!ws.current) return;

    ws.current.send(msg);
  }

  // const videoConstraints = {
  //   width: 1280,
  //   height: 720,
  //   facingMode: "environment", // Can be "environment" or "user"
  // };

  // const capture = useCallback(() => {
  //   const capturedImg = webcamRef.current.getScreenshot();
  //   // setCapturedImg(capturedImg);
  //   console.log(capturedImg);
  //   sendMessage(capturedImg);
  // }, [webcamRef]); 

  
const imageupload=()=>{
 const img=document.getElementById('url');
  setImg(img);
  console.log(img.files[0]);
  sendMessage(img.files[0]);
}

const handleImage=(e)=>{

handleInputChange(e)

}
const handleJson=(e)=>{

  handleJsonChange(e)
  
  }
function sendData () {

  // console.log("Image  " + imageUrl)
  // console.log("JSON" + jsonUrl)
  axios.post(`http://localhost:7777/predict`,{Image:imageUrl, json:jsonUrl}).then(response=>{
    console.log(typeof response.data)
    setFinalImage (response.data.data)
  setShowResult(true)
  })

}

function handleInputChange(e) {
  let files = e.target.files;
  let reader = new FileReader();
  reader.readAsDataURL(files[0]);

  reader.onload = (e) => {
   let  s=e.target.result
 
  
      setImageUrl(

          s.replace("data:image/jpeg;base64," , "")
        )
  }

}
function handleJsonChange(e) {
  let files = e.target.files;
  let reader = new FileReader();
  reader.readAsDataURL(files[0]);

  reader.onload = (e) => {
   let  s=e.target.result
  

      setJsonUrl(

          s.replace("data:application/json;base64,","")
        )
  }

}



  return (
    <div >
      <div id='contact' >
        <div className='container' >
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>Paste any link!!!</h2>
                <p>
                  This section allows you to paste any link from web to use the skin disease detection on any desired image. 
                </p>
              </div>
              <form name='sentMessage' >
                <div className='form-group'>
                  <input
                    onChange={(e)=>handleImage(e)}
                    
                        type='file'
                       
                        id='url'
                        name='url'
                        className='form-control'
                        placeholder='URL'
                        required
                        >
                          </input>
                      
                  <p className='help-block text-danger'></p>
                </div>
                <div id='success'></div>
                
              
          {visibleJson &&    
       <>
          <input
                    type='file'
                    // onChange={handleJson}
                    id='url'
                    onChange={(e)=>handleJson(e)}
                    name='url'
                    className='form-control'
                    placeholder='URL'
                    required
                    >
                      </input>
          
        </>}
          </form>
          {visibleJson &&  <button onClick={()=>sendData()} className='btn btn-custom btn-lg' style={{marginTop:"10%"}}>Submit</button> }
         
            <a href="https://dermannotation.vivekgohel56.repl.co/"  target="_blank"> <button onClick={()=>setVisibleJson(true)}  className='btn btn-custom btn-lg' style={{marginLeft:"25%" }} >Anotate</button></a> 
              {capturedImg && <img src={capturedImg} width="50%" height="50%" />}
          
<p>
  <h3>Final Image{showResult && 
  <img height="50%" width="50%" src={"data:image/jpeg;base64," + finalImage} ></img>}</h3>
</p>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  )
}
