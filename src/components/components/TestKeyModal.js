import React, {useState} from 'react';
import { createGlobalStyle } from 'styled-components';
import Modal from 'react-modal';
import * as ls from "local-storage";
const xrpl = window.xrpl

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0, 0.5)';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #212428;
    border-bottom: 0;
    box-shadow: 0 4px 20px 0 rgba(10,10,10, .8);
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: #fff;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: none !important;
  }
  header#myHeader .logo .d-3{
    display: block !important;
  }
  .jumbotron.no-bg{
    background: center bottom;
    background-size: cover;
    height: 100vh;
  }
  footer.footer-light .subfooter span img.d-1{
    display: none !important;
  }
  footer.footer-light .subfooter span img.d-3{
    display: inline-block !important;
  }
  .de_countdown{
    right: 10px;
    color: #fff;
  }
  .author_list_pp{
    margin-left:0;
  }
  footer.footer-light .subfooter{
    border-top: 1px solid rgba(255,255,255,.1);
  }
`;

const customStyles = {
  content: {
    top: '50%',
    background: "#000000",
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const TestKeyModal= ({isOpen, closeFunction}) => 
{
  let subtitle;
  const formSubmit = (e) => {
      // alert('submitted')
      // alert(values.keys)
      // throw "error"
      const pk = document.getElementById("privateKey").value
      try{
        const publicKey = xrpl.Wallet.fromSeed(pk).address
        ls.set("private_test_key", pk)
        closeFunction()
      }
      catch (error) {
        alert("Please provide a valid key")
      }
      
      e.preventDefault()
      return false
  }
//   const [modalIsOpen, setIsOpen] = useState(true);

//   if (isOpen) {
//     subtitle.style.color = '#f00';
//   }
//   const openModal = () => {
//     setIsOpen(true);
    
//   }
//   const closeModal = () => {
//     setIsOpen(false);
//   }

return (
  <div>
      <GlobalStyles />
      <Modal
        isOpen={isOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='container' style={{padding: 30, borderRadius: 26}}>
            <form onSubmit={formSubmit} >
                <p className='lead'>
                    Enter NFT DevNet Private Key
                </p>
                <input id="privateKey" className='key' />
                <input type="submit" className='lead' />
            </form>
        </div>
      </Modal>
  </div>
);
}
export default TestKeyModal;