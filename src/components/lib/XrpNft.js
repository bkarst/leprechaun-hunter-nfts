import axios from 'axios';
import { BASE_API_URL } from "../lib/constants"

class XrpNFT {

    constructor(source, data){
        if (source == 'server') {
            console.log('data', data)
            this.fromServer(data)
        }
        else if (source == 'xrpl'){ 
            this.fromXRPL(data)
        }
        this.deadline = "December, 30, 2021"
        this.authorLink = "ItemDetail"
        this.nftLink = "ItemDetail"
        this.bidLink = "ItemDetail"
        this.authorImg = "./img/23.png"
        this.previewImg = "./img/warrior.png"
        this.title = "Leprechaun Hunter "
        this.price = "0.08 ETH"
        this.bid = "1/20"
        this.likes = 50
        // console.log(data)
    }

    fromServer ({ nft_id, uri, nft_type, current_period_rewards, rewards_due, total_rewarded, owner_public_address, claimable_on}) {

        this.nft_id = nft_id
        this.nft_id = nft_id
        this.uri = uri
        this.nft_id = nft_id
        this.nft_type = nft_type
        this.current_period_rewards = current_period_rewards
        this.rewards_due = rewards_due
        this.total_rewarded = total_rewarded
        this.owner_public_address = owner_public_address
        this.claimable_on = claimable_on

    }

    fromXRPL ({Flags, Issuer, TokenID, TokenTaxon, URI, nft_serial}) {
        this.flags = Flags
        this.issuer = Issuer
        this.tokenID = TokenID
        this.tokenTaxon = TokenTaxon
        this.uri = URI
        this.nftSerial = nft_serial
    }

    async syncBackendData(){
        console.log("syncing backend")
        var a = this
        await axios.get(BASE_API_URL + '/api/nft/show/' + this.URI).then(data => {
            if (data.nft){
                console.log('data.nft', data.nft)
            }
            else {
                a.setHidden()
            }
        }
        ).catch(error => {this.hidden = true});
        return this
    }

    setURI(uri){
        this.uri = uri
    }

    setHidden(){
        this.hidden = true
    }

}

export default XrpNFT;