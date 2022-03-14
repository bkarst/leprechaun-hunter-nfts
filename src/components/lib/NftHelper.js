import { COLD_SECRET, CURRENCY_CODE, 
    TEST_USER_SECRET, CLIENT_URL, 
    TOKEN_URL, BASE_API_URL, TEST_USER_ADDRESS, getConstants } from '../lib/constants'
import { sendToken } from './CurrencyHelper';
import axios from 'axios';
import { createAsyncAction } from 'redux-promise-middleware-actions';
const xrpl = window.xrpl;

//***************************
//** Mint Token *************
//***************************

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}




// export async function collectNftRewardsVariable(uri, collectType){
const collectNftRewardsVariable = async (uri, collectType) => {
  await axios({
    method: 'post',
    url: BASE_API_URL + 'api/collect',
    data: { uri: uri, owner_public_address: getConstants().TEST_USER_ADDRESS, collect_type: collectType}
  }).then(async result => {
    if (result.data.rewarded){
      await sendToken(getConstants().TEST_USER_SECRET, result.data.rewarded);
    }
    // console.log('collectresult', result)
}).catch(function (error) {
    console.log(error);
  });;
}

export const collectNftRewards = createAsyncAction('COLLECT_REWARDS', (uri, collectType) => {
  return collectNftRewardsVariable(uri, collectType).then(result => {
    return result
  })
});

export async function mintToken() {
	const wallet = xrpl.Wallet.fromSeed(getConstants().TEST_USER_SECRET)
	const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
	await client.connect()
	console.log("Connected to Sandbox")
  
	// Note that you must convert the token URL to a hexadecimal
	// value for this transaction.
	// ----------------------------------------------------------
  const uri = xrpl.convertStringToHex(TOKEN_URL + makeid(15));
	const transactionBlob = {
		TransactionType: "NFTokenMint",
		Account: wallet.classicAddress,
		URI: uri,
		Flags: 8,
		TokenTaxon: 0 //Required, but if you have no use for it, set to zero.
	}
	// Submit signed blob --------------------------------------------------------
	const tx = await client.submitAndWait(transactionBlob,{wallet})

  console.log('minted nft', tx);
  axios({
    method: 'post',
    url: BASE_API_URL + 'api/nft',
    data: { uri: uri, owner_public_address: getConstants().TEST_USER_ADDRESS }
  }).catch(function (error) {
    console.log(error);
  });;
  
  // axios.post(, )
  // .then(function (response) {
  //   console.log(response);
  // })
  



	const nfts = await client.request({
		method: "account_nfts",
		account: wallet.classicAddress
	})
	console.log(nfts)

	// Check transaction results -------------------------------------------------
	console.log("Transaction result:", tx.result.meta.TransactionResult)
  await sendToken(getConstants().TEST_USER_SECRET, 0)
	console.log("Balance changes:",
	  JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
	client.disconnect()
    return nfts;
} //End of mintToken

//***************************
//** Get Tokens *************
//***************************


export async function getBackendTokens(){
  const tokens = await axios.get(BASE_API_URL + "api/nfts?owner_public_address=" + getConstants().TEST_USER_ADDRESS)
  // console.log('tokens', tokens)
  return tokens
}


export async function getTokens() {
	const wallet = xrpl.Wallet.fromSeed(getConstants().TEST_USER_SECRET)
	const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
	await client.connect()
	console.log("Connected to Sandbox")
	const nfts = await client.request({
		method: "account_nfts",
		account: wallet.classicAddress
	})
	console.log(nfts)
	client.disconnect()
    return nfts;
} //End of getTokens

//***************************
//** Burn Token *************
//***************************

async function burnToken(tokenId) {
  const wallet = xrpl.Wallet.fromSeed(getConstants().TEST_USER_SECRET)
  const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
  await client.connect()
  console.log("Connected to Sandbox")

  // Prepare transaction -------------------------------------------------------
  const transactionBlob = {
      "TransactionType": "NFTokenBurn",
      "Account": wallet.classicAddress,
      "TokenID": tokenId
  }

  // Submit signed blob --------------------------------------------------------
  const tx = await client.submitAndWait(transactionBlob,{wallet})
  const nfts = await client.request({
	method: "account_nfts",
	account: wallet.classicAddress
  })
  console.log(nfts)
  // Check transaction results -------------------------------------------------
  console.log("Transaction result:", tx.result.meta.TransactionResult)
  console.log("Balance changes:",
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
  client.disconnect()
}
// End of burnToken()

//********************************
//** Create Sell Offer ***********
//********************************

export async function createSellOffer(tokenId, amount) {
	const wallet = xrpl.Wallet.fromSeed(getConstants().TEST_USER_SECRET)
	const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
	await client.connect()
	console.log("Connected to Sandbox")

 // Prepare transaction -------------------------------------------------------
  const transactionBlob = {
      	"TransactionType": "NFTokenCreateOffer",
      	"Account": wallet.classicAddress,
      	"TokenID": tokenId,
      	"Amount": amount,
      	"Flags": 8
  }

  // Submit signed blob --------------------------------------------------------

  const tx = await client.submitAndWait(transactionBlob,{wallet})//AndWait


  console.log("***Sell Offers***")
  let nftSellOffers
    try {
	    nftSellOffers = await client.request({
		method: "nft_sell_offers",
		tokenid: tokenId.value
	  })
	  } catch (err) {
	    console.log("No sell offers.")
	}
  console.log(JSON.stringify(nftSellOffers,null,2))
  console.log("***Buy Offers***")
  let nftBuyOffers
  try {
    nftBuyOffers = await client.request({
	method: "nft_buy_offers",
	tokenid: tokenId.value })
  } catch (err) {
    console.log("No buy offers.")
  }
  console.log(JSON.stringify(nftBuyOffers,null,2))

  // Check transaction results -------------------------------------------------
  console.log("Transaction result:",
    JSON.stringify(tx.result.meta.TransactionResult, null, 2))
  console.log("Balance changes:",
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
  client.disconnect()
  // End of createSellOffer()
}
//********************************
//** Create Buy Offer ***********
//********************************

export async function createBuyOffer(tokenId, amount, owner) {

	const wallet = xrpl.Wallet.fromSeed(getConstants().TEST_USER_SECRET)
	const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
	await client.connect()
	console.log("Connected to Sandbox")

 // Prepare transaction -------------------------------------------------------
  const transactionBlob = {
      	"TransactionType": "NFTokenCreateOffer",
      	"Account": wallet.classicAddress,
      	"Owner": owner,
      	"TokenID": tokenId,
      	"Amount": amount,
      	"Flags": 8
  }

  // Submit signed blob --------------------------------------------------------
  const tx = await client.submitAndWait(transactionBlob,{wallet})

  console.log("***Sell Offers***")
  let nftSellOffers
    try {
	    nftSellOffers = await client.request({
		method: "nft_sell_offers",
		tokenid: tokenId.value
	  })
	  } catch (err) {
	    console.log("No sell offers.")
	}
  console.log(JSON.stringify(nftSellOffers,null,2))
  console.log("***Buy Offers***")
  let nftBuyOffers
  try {
    nftBuyOffers = await client.request({
	method: "nft_buy_offers",
	tokenid: tokenId.value })
  } catch (err) {
    console.log("No buy offers.")
  }
  console.log(JSON.stringify(nftBuyOffers,null,2))


  // Check transaction results -------------------------------------------------
  console.log("Transaction result:",
    JSON.stringify(tx.result.meta.TransactionResult, null, 2))
  console.log("Balance changes:",
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
  client.disconnect()
  // End of createBuyOffer()
}

//***************************
//** Cancel Offer ***********
//***************************

export async function cancelOffer(tokenId, tokenOfferIndex) {

	const wallet = xrpl.Wallet.fromSeed(getConstants().TEST_USER_SECRET)
	const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
	await client.connect()
	console.log("Connected to Sandbox")

	const tokenID = tokenOfferIndex
	const tokenIDs = [tokenID]

 // Prepare transaction -------------------------------------------------------
  const transactionBlob = {
      	"TransactionType": "NFTokenCancelOffer",
      	"Account": wallet.classicAddress,
      	"TokenIDs": tokenIDs
  }

  // Submit signed blob --------------------------------------------------------
  const tx = await client.submitAndWait(transactionBlob,{wallet})


  console.log("***Sell Offers***")
  let nftSellOffers
    try {
	    nftSellOffers = await client.request({
		method: "nft_sell_offers",
		tokenid: tokenId.value
	  })
	  } catch (err) {
	    console.log("No sell offers.")
	}
  console.log(JSON.stringify(nftSellOffers,null,2))
  console.log("***Buy Offers***")
  let nftBuyOffers
  try {
    nftBuyOffers = await client.request({
	method: "nft_buy_offers",
	tokenid: tokenId.value })
  } catch (err) {
    console.log("No buy offers.")
  }
  console.log(JSON.stringify(nftBuyOffers,null,2))

  // Check transaction results -------------------------------------------------

  console.log("Transaction result:",
    JSON.stringify(tx.result.meta.TransactionResult, null, 2))
  console.log("Balance changes:",
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))

  client.disconnect()
  // End of cancelOffer()
}
//***************************
//** Get Offers *************
//***************************

export async function getOffers(tokenId) {

	const wallet = xrpl.Wallet.fromSeed(getConstants().TEST_USER_SECRET)
	const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
	await client.connect()
	console.log("Connected to Sandbox")
    console.log("***Sell Offers***")
    let nftSellOffers
      try {
	    nftSellOffers = await client.request({
		method: "nft_sell_offers",
		tokenid: tokenId
	  })
	  } catch (err) {
	    console.log("No sell offers.")
	}
    console.log(JSON.stringify(nftSellOffers,null,2))
    console.log("***Buy Offers***")
    let nftBuyOffers
    try {
      nftBuyOffers = await client.request({
  	  method: "nft_buy_offers",
	  tokenid: tokenId })
    } catch (err) {
      console.log("No buy offers.")
  }
  console.log(JSON.stringify(nftBuyOffers,null,2))
  client.disconnect()
  // End of getOffers()
}
//***************************
//** Accept Sell Offer ******
//***************************

async function acceptSellOffer(tokenOfferIndex) {

	const wallet = xrpl.Wallet.fromSeed(getConstants().TEST_USER_SECRET)
	const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
	await client.connect()
	console.log("Connected to Sandbox")

 // Prepare transaction -------------------------------------------------------
  const transactionBlob = {
      	"TransactionType": "NFTokenAcceptOffer",
      	"Account": wallet.classicAddress,
      	"SellOffer": tokenOfferIndex,
  }
  // Submit signed blob --------------------------------------------------------
  const tx = await client.submitAndWait(transactionBlob,{wallet})
  const nfts = await client.request({
	method: "account_nfts",
	account: wallet.classicAddress
  })
  console.log(JSON.stringify(nfts,null,2))

  // Check transaction results -------------------------------------------------
  console.log("Transaction result:",
    JSON.stringify(tx.result.meta.TransactionResult, null, 2))
  console.log("Balance changes:",
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
  client.disconnect()
  // End of acceptSellOffer()
}
//***************************
//** Accept Buy Offer ******
//***************************

export async function acceptBuyOffer(tokenOfferIndex) {

	const wallet = xrpl.Wallet.fromSeed(getConstants().TEST_USER_SECRET)
	const client = new xrpl.Client(CLIENT_URL)
	await client.connect()
	console.log("Connected to Sandbox")

 // Prepare transaction -------------------------------------------------------
  const transactionBlob = {
      	"TransactionType": "NFTokenAcceptOffer",
      	"Account": wallet.classicAddress,
      	"BuyOffer": tokenOfferIndex
  }
  // Submit signed blob --------------------------------------------------------
  const tx = await client.submitAndWait(transactionBlob,{wallet})
  const nfts = await client.request({
	method: "account_nfts",
	account: wallet.classicAddress
  })
  console.log(JSON.stringify(nfts,null,2))

  // Check transaction results -------------------------------------------------
  console.log("Transaction result:",
      JSON.stringify(tx.result.meta.TransactionResult, null, 2))
  console.log("Balance changes:",
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
  client.disconnect()
  // End of submitTransaction()
}