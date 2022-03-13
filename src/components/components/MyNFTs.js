import React, { Component } from "react";
import Clock from "./Clock";



export default class Responsive extends Component {

    dummyData = [{
        deadline:"December, 30, 2021",
        authorLink: "ItemDetail",
        nftLink: "ItemDetail",
        bidLink: "ItemDetail",
        authorImg: "./img/author/author-1.jpg",
        previewImg: "./img/warrior.png",
        title: "Pinky Ocean",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50
    },
    ]

  constructor(props) {
    super(props);
    this.state = {
        height: 0
    };
    this.onImgLoad = this.onImgLoad.bind(this);
    }

    onImgLoad({target:img}) {
        let currentHeight = this.state.height;
        if(currentHeight < img.offsetHeight) {
            this.setState({
                height: img.offsetHeight
            })
        }
    }
    

 render() {
  return (
    <div className='row'>
        {this.props.nfts.map( (nft, index) => (
            <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
                <div className="nft__item m-0">
                    { nft.deadline &&
                        <div className="de_countdown">
                            <Clock deadline={nft.deadline} />
                        </div>
                    }
                    <div className="author_list_pp">
                        <span onClick={()=> window.open(nft.authorLink, "_self")}>                                    
                            <img className="lazy" src={nft.authorImg} alt=""/>
                        </span>
                    </div>
                    <div className="nft__item_wrap" style={{height: `${this.state.height}px`}}>
                        <span>
                            <img onLoad={this.onImgLoad} src={nft.previewImg} className="lazy nft__item_preview" alt=""/>
                        </span>
                    </div>
                    <div className="nft__item_info">
                        <span onClick={()=> window.open(nft.nftLink, "_self")}>
                            <h4>{nft.title}</h4>
                        </span>
                        <div className="nft__item_price">
                            {nft.price}<span>{nft.bid}</span>
                        </div>
                        <div className="nft__item_action">
                            <span onClick={()=> window.open(nft.bidLink, "_self")}>Collect</span>
                        </div>
                        <div className="nft__item_like">
                            <i className="fa fa-heart"></i><span>{nft.likes}</span>
                        </div>                            
                    </div> 
                </div>
            </div>  
        ))}
    </div>              
    );
}
}