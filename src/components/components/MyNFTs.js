import React, { Component } from "react";
import NFTCard from "./NFTCard";
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
            <NFTCard nft={nft} index={index} />
        ))}
    </div>              
    );
}
}