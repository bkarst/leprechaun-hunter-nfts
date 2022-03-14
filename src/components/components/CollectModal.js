import React, {useState} from 'react';
import { createGlobalStyle } from 'styled-components';
import Modal from 'react-modal';
import { collectNftRewards } from "../lib/NftHelper"
import store from '../../store';
import { useSelector, useDispatch } from 'react-redux'
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
  }
};

const CollectModal= ({isOpen, closeFunction, nft, claimableRewards}) => 
{
  let subtitle;
  const collectRewardsPending = useSelector(appState => appState.mainReducer.collectRewardsPending)
  let rewardCollectDiv = <div className='container' style={{padding: 30, borderRadius: 26, zIndex: 999}}>
        <div onClick={ () => {
            store.dispatch(collectNftRewards(nft.uri, 'taxes'));
            
            }} style={{alignItems: 'center', cursor: 'pointer', paddingLeft: 20, paddingRight: 20, height: 60, background: 'rgba(100,100,100,0.5)', borderRadius: 100, margin: 20, marginRight: 30, display: 'flex', flexDirection: 'row'}}>
            
            <img src={"./img/coin.PNG"} style={{width: 30, height: 30}}/>
                
            <div style={{margin: 4, marginLeft: 20, color: '#fff'}} >
                Collect Taxes ( +{claimableRewards} )
            </div>
            
        </div>
        <div onClick={() => store.dispatch(collectNftRewards(nft.uri, 'letgo')) } style={{alignItems: 'center', cursor: 'pointer', paddingLeft: 20, paddingRight: 20, height: 60, background: 'rgba(100,100,100,0.5)', borderRadius: 100, margin: 20, marginRight: 30, display: 'flex', flexDirection: 'row'}}>
            <img src={"./img/emerald.PNG"} style={{width: 30, height: 30}}/>
                
            <div style={{margin: 4, marginLeft: 20, color: '#fff'}} >
              Let go and defer Taxes (+10 bonus next claim)
            </div>
            
        </div>
        <div onClick={() => store.dispatch(collectNftRewards(nft.uri, 'takegold')) }  style={{alignItems: 'center', cursor: 'pointer', paddingLeft: 20, paddingRight: 20, height: 60, background: 'rgba(100,100,100,0.5)', borderRadius: 100, margin: 20, marginRight: 30, display: 'flex', flexDirection: 'row'}}>
            
            <img src={"./img/common_chest.PNG"} style={{width: 30, height: 30}}/>
                
            <div style={{margin: 4, marginLeft: 20, color: '#fff'}} >
              Take {claimableRewards * 10} Gold (%10 chance of success)
            </div>
            
        </div>
        </div>
    if (collectRewardsPending) {
        rewardCollectDiv = <div className='container' style={{padding: 30, borderRadius: 26, zIndex: 999}}>
            <div>
                Collecting Rewards...
            </div>
        </div>
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

console.log('modalnft', nft)

return (
  <div>
      <GlobalStyles />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeFunction}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
        <div style={{alignItems: 'center', paddingLeft: 20, paddingRight: 20, height: 60, borderRadius: 100, margin: 20, marginRight: 30, display: 'flex', flexDirection: 'row'}}>
          <img className="lazy" style={{width:100}} src="./img/23.PNG" alt=""/>
          <div>Choose Your Action</div>
        </div>
          {rewardCollectDiv}
        </div>
      </Modal>
  </div>
);
}
export default CollectModal;