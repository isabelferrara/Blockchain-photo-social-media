import React from 'react';
import Identicon from 'identicon.js';

export default function Main({ images, tipImageOwner }) {
  return (

        <main  className="flex-rows">
          <div className="content mr-auto ml-auto flex-rows">


            {/* listing images here */}
            {images.map((image, key) => {
              return (
                <div className="mt-1 insta-card flex-center" key={key} >
                  <div className="card-headers">
                    <img
                    alt="unique account icon" 
                    className='profileCardImg'                   
                      src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                    />

                    <small className="text-small">
                      {image.author.slice(0,13)+'...'}
                    </small>
                  </div>

                  <ul 
                    id="imageList" 
                    className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p className="text-center">
                          <img src={`https://ipfs.infura.io/ipfs/${image.hash}`}  className='insta-img' alt="from ipfs" />
                        </p>

                        <small>
                          {image.description}
                        </small>
                      </li>

                      <li 
                        key={key} 
                        className="list-group-item py-2">
                          <small className="float-left mt-1 text-muted">
                            TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                            </small>
                          <button
                            className="btn btn-link btn-sm float-right pt-0"
                            name={image.id}
                            onClick={(event) => {
                              let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                              tipImageOwner(event.target.name, tipAmount)
                            }}
                          >
                            TIP 0.1 ETH
                          </button>
                      </li>
                  </ul>
                </div>
              )
            })}

          </div>
        </main>
  )
}