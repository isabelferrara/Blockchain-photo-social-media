import React, { useState } from 'react';


// config for IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
})

const SideMenu = ({setLoading, account, decentragram}) => {
    const [imageDescription, setImageDescription] = useState('')
    const [buffer, setBuffer] = useState(null)
    const [isUploaded, setIsUploaded] = useState(false)
    const [image, setImage] = useState('')

    const uploadImage = (description) => {    
        // adding file to ipfs
        ipfs.add(buffer, (err, result) => {
          if (err) {
            return console.log(err)
          }
          setLoading(true);
          decentragram.methods
            .uploadImage(result[0].hash, description)
            .send({ from: account })
            .on('transactionHash', hash => {
              setLoading(0)
            })
        })
      }
    
    const captureFile = e => {
        e.preventDefault();
        const file = e.target.files[0]
        setImage(URL.createObjectURL(e.target.files[0]))

        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          setBuffer(Buffer(reader.result))
          setIsUploaded(true)
        }
      }

    const submitFile = () => {
        uploadImage(imageDescription);
        setImageDescription('')
      }

    return (
        <div className='sider'>
             <h3>Hello, there!</h3>
            <form className='siderContainer mx-auto mt-2'>

              {!isUploaded && 
              <div class="wrapper">
                <div className="file-upload">
                    <input type="file" accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={captureFile}/>
                                    <svg viewBox="0 0 448 512" width="100" title="arrow-up">
                <path fill='coral' d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z" />
                </svg>
                </div>
                <h5 className='fontUpload'>Upload an image</h5>
                </div>
                }
              {isUploaded &&
              <>
              <div className="form-group mr-sm-2 flex-center">
                <br></br>
               { isUploaded && <img src={image} alt='preview' className='displayImage'/>}

                <input
                  id="imageDescription"
                  disabled={!isUploaded}
                  type="text"
                  value={imageDescription}
                  onChange={(e) => setImageDescription(e.target.value)}
                  className="form-control inputUploaded"
                  placeholder="Image description..."
                  required />
              </div>
              <button
                type="submit"
                className="mainBtn"
                onClick={() => submitFile()}
              >Upload!</button>
              <button
                type="submit"
                className="secondaryBtn"
                onClick={() => setIsUploaded(false)}
              >Pick other image!</button>
            
              </>
            }
            </form>
        </div>
    )
}

export default SideMenu
