
class XrpNFT {

    constructor({Flags, Issuer, TokenID, TokenTaxon, URI, nft_serial}){
        this.flags = Flags
        this.issuer = Issuer
        this.tokenID = TokenID
        this.tokenTaxon = TokenTaxon
        this.uri = URI
        this.nftSerial = nft_serial
        this.deadline = "December, 30, 2021"
        this.authorLink = "ItemDetail"
        this.nftLink = "ItemDetail"
        this.bidLink = "ItemDetail"
        this.authorImg = "./img/23.png"
        this.previewImg = "./img/warrior.png"
        this.title = "Leprechaun Hunter " + nft_serial
        this.price = "0.08 ETH"
        this.bid = "1/20"
        this.likes = 50
        // console.log(data)

    }

}

export default XrpNFT;