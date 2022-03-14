import React, { Component } from "react";
import Clock from "./Clock";
import CollectModal from "./CollectModal";


export default class NFTCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
        height: 0,
        isOpen: false
    };
    this.onImgLoad = this.onImgLoad.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    }

    onImgLoad({target:img}) {
        let currentHeight = this.state.height;
        if(currentHeight < img.offsetHeight) {
            this.setState({
                height: img.offsetHeight
            })
        }
    }

    openModal(){
        this.setState({isOpen: true})
    }

    closeModal(){
        this.setState({isOpen: false})
    }
    

 render() {

    const nft = this.props.nft
    const index = this.props.index
    let claimable
    let claimButton = <span><h4>Hunting...</h4></span>
    if (nft.claimable_on) {
        claimable = Date.parse(nft.claimable_on) < Date.now()
    }
    if (claimable) {
        claimButton = <span onClick={this.openModal}>Collect</span>
    }
    console.log('cardnft', nft)


  return (
            <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
                <CollectModal
                    isOpen={this.state.isOpen}
                    closeFunction={this.closeModal} 
                    nft={nft}
                />
                <div className="nft__item m-0">
                    { nft.deadline && !claimable && 
                        <div className="de_countdown">
                            <Clock deadline={nft.claimable_on} />
                        </div>
                    }
                    {claimable && 
                        <div className="author_list_pp">
                            <span>
                                <img className="lazy" src={nft.authorImg} alt=""/>
                            </span>
                        </div>
                    }
                    <div className="nft__item_wrap" style={{height: `${this.state.height}px`}}>
                        <span>
                            <img onLoad={this.onImgLoad} src={nft.previewImg} className="lazy nft__item_preview" alt=""/>
                        </span>
                    </div>
                    <div className="nft__item_info">
                        <span onClick={()=> window.open(nft.nftLink, "_self")}>
                            <h4>{nft.title}</h4>
                        </span>
                        
                        <div className="nft__item_action">
                            {claimButton}
                        </div>
                        <div className="nft__item_like">
                            <i className="fa fa-heart"></i><span>{nft.likes}</span>
                        </div>                            
                    </div> 
                </div>
            </div>  
    
    );
}
}