import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import Decentragram from '../abis/Decentragram.json'
import Navbar from './Navbar'
import Main from './Main'
import SideMenu from './SideMenu';

// if there is no arguement then the default value is used as like in npm documentation

export default function App() {
  const [account, setAccount] = useState('');
  const [decentragram, setDecentragram] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(1)

//https://ipfs.infura.io/ipfs/hash

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const loadBlockchainData = async () => {
    // load accounts
    await loadWeb3();
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    // Get network id
    // network id differs, for ganache it's 5777, for eth 1 and so on
    const networkId = await web3.eth.net.getId()
    const networkData = Decentragram.networks[networkId]
    // checks if the contract is available or not in current chain network
    if (networkData) {
      const decentragram = new web3.eth.Contract(Decentragram.abi, networkData.address)
      setDecentragram(decentragram)
      const imageCount = await decentragram.methods.imageCount().call();
      let allImage=images
  
      // load images
      for(let i = 1; i <= imageCount; i++){
        const image= await decentragram.methods.images(i).call()
        allImage.push(image)
        setImages(allImage)
      }
      setLoading(0)
    }
    else window.alert('Decentragram contract is not deployed n current chain network')
  }


  const tipImageOwner = async (id, tipAmount) => {
    setLoading(true)
    decentragram.methods.tipImageOwner(id)
    .send({
      from: account, 
      value: tipAmount
    })
    .on('transactionHash', hash => {
      setLoading(false)
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navbar account={account} />
      <div className='d-flex flex-row'>
        
     
      <SideMenu  setLoading={setLoading} account={account} decentragram={decentragram}/>
      {
        loading ?
          (<h3 style={{ marginTop: "50px", textAlign: "center" }}>Loading...</h3>) :
          <Main            
            images={images}
            tipImageOwner={tipImageOwner}
          />
      }
       </div>
    </div>
  )
}
