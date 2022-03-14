import { createAsyncAction } from 'redux-promise-middleware-actions';

import { HOT_SECRET, COLD_SECRET, 
    TEST_USER_SECRET, 
    CLIENT_URL, 
    CURRENCY_CODE, 
    TOKEN_URL } from '../lib/constants'
    
const xrpl = window.xrpl;

// Stand-alone code sample for the "issue a token" tutorial:
// https://xrpl.org/issue-a-fungible-token.html

// Dependencies for Node.js.
// In browsers, use <script> tags as in the example demo.html.
  
  // Connect ---------------------------------------------------------------------
  export async function createFungibleToken() {
    const client = new xrpl.Client(CLIENT_URL)
    console.log("Connecting to nft-devnet...")
    await client.connect()
  
    // Get credentials from the Testnet Faucet -----------------------------------
    console.log("Requesting addresses from the nft-devnet faucet...")
    const hot_wallet = xrpl.Wallet.fromSeed(HOT_SECRET)
    // const hot_wallet = (await client.fundWallet()).wallet
    const cold_wallet = xrpl.Wallet.fromSeed(COLD_SECRET)
    // const cold_wallet = (await client.fundWallet()).wallet
    console.log(`Got hot address ${hot_wallet.address} and cold address ${cold_wallet.address}.`)
  
    // Configure issuer (cold address) settings ----------------------------------
    const cold_settings_tx = {
      "TransactionType": "AccountSet",
      "Account": cold_wallet.address,
      "TransferRate": 0,
      "TickSize": 5,
      "Domain": "6C65707265636861756E68756E7465726E6674732E636F6D", // "example.com"
      "SetFlag": xrpl.AccountSetAsfFlags.asfDefaultRipple,
      // Using tf flags, we can enable more flags in one transaction
      "Flags": (xrpl.AccountSetTfFlags.tfDisallowXRP |
               xrpl.AccountSetTfFlags.tfRequireDestTag)
    }
  
    const cst_prepared = await client.autofill(cold_settings_tx)
    const cst_signed = cold_wallet.sign(cst_prepared)
    console.log("Sending cold address AccountSet transaction...")
    const cst_result = await client.submitAndWait(cst_signed.tx_blob)
    if (cst_result.result.meta.TransactionResult == "tesSUCCESS") {
      console.log(`Account set cold succeeded: https://nft-devnet.xrpl.org/transactions/${cst_signed.hash}`)
    } else {
      throw `Error sending transaction: ${cst_result}`
    }
  
  
    // Configure hot address settings --------------------------------------------
  
    const hot_settings_tx = {
      "TransactionType": "AccountSet",
      "Account": hot_wallet.address,
      "Domain": "6C65707265636861756E68756E7465726E6674732E636F6D", // "leprechaunhunternfts.com"
      // enable Require Auth so we can't use trust lines that users
      // make to the hot address, even by accident:
        //   "SetFlag": xrpl.AccountSetAsfFlags.asfRequireAuth,
      "Flags": (xrpl.AccountSetTfFlags.tfDisallowXRP |
                xrpl.AccountSetTfFlags.tfRequireDestTag)
    }
  
    const hst_prepared = await client.autofill(hot_settings_tx)
    const hst_signed = hot_wallet.sign(hst_prepared)
    console.log("Sending hot address AccountSet transaction...")
    const hst_result = await client.submitAndWait(hst_signed.tx_blob)
    if (hst_result.result.meta.TransactionResult == "tesSUCCESS") {
      console.log(`Account Set hot: https://nft-devnet.xrpl.org/transactions/${hst_signed.hash}`)
    } else {
      throw `Error sending transaction: ${hst_result.result.meta.TransactionResult}`
    }
  
    // Create trust line from hot to cold address --------------------------------
    
    const trust_set_tx = {
      "TransactionType": "TrustSet",
      "Account": hot_wallet.address,
      "LimitAmount": {
        "currency": CURRENCY_CODE,
        "issuer": cold_wallet.address,
        "value": "10000000000000" // Large limit, arbitrarily chosen
      }
    }
  
    const ts_prepared = await client.autofill(trust_set_tx)
    const ts_signed = hot_wallet.sign(ts_prepared)
    console.log("Creating trust line from hot address to issuer...")
    const ts_result = await client.submitAndWait(ts_signed.tx_blob)
    if (ts_result.result.meta.TransactionResult == "tesSUCCESS") {
      console.log(`Trustset hot: https://nft-devnet.xrpl.org/transactions/${ts_signed.hash}`)
    } else {
      throw `Error sending transaction: ${ts_result.result.meta.TransactionResult}`
    }
  
  
    // Send token ----------------------------------------------------------------
    const issue_quantity = "3840"
    const send_token_tx = {
      "TransactionType": "Payment",
      "Account": cold_wallet.address,
      "Amount": {
        "currency": CURRENCY_CODE,
        "value": issue_quantity,
        "issuer": cold_wallet.address
      },
      "Destination": hot_wallet.address,
      "DestinationTag": 1 // Needed since we enabled Require Destination Tags
                          // on the hot account earlier.
    }
  
    const pay_prepared = await client.autofill(send_token_tx)
    const pay_signed = cold_wallet.sign(pay_prepared)
    console.log(`Sending ${issue_quantity} ${CURRENCY_CODE} to ${hot_wallet.address}...`)
    const pay_result = await client.submitAndWait(pay_signed.tx_blob)
    if (pay_result.result.meta.TransactionResult == "tesSUCCESS") {
      console.log(`Payment to hot succeeded: https://nft-devnet.xrpl.org/transactions/${pay_signed.hash}`)
    } else {
      throw `Error sending transaction: ${pay_result.result.meta.TransactionResult}`
    }


  
    // Check balances ------------------------------------------------------------
    console.log("Getting hot address balances...")
    const hot_balances = await client.request({
      command: "account_lines",
      account: hot_wallet.address,
      ledger_index: "validated"
    })
    console.log(hot_balances.result)
  
    console.log("Getting cold address balances...")
    const cold_balances = await client.request({
      command: "gateway_balances",
      account: cold_wallet.address,
      ledger_index: "validated",
      hotwallet: [hot_wallet.address]
    })
    console.log(JSON.stringify(cold_balances.result, null, 2))
  
    client.disconnect()
  } // End of main()
  
  export async function sendToken(userSecret, quantity ) {
    const recipientWallet = xrpl.Wallet.fromSeed(userSecret)
    const client = new xrpl.Client(CLIENT_URL)
    console.log("Connecting to nft-devnet...")
    await client.connect()
  


    // Get credentials from the Testnet Faucet -----------------------------------
    console.log("Requesting addresses from the nft-devnet faucet...")

    const cold_wallet = xrpl.Wallet.fromSeed(COLD_SECRET)


    // const trust_set_tx = {
    //     "TransactionType": "TrustSet",
    //     "Account": recipientWallet.address,
    //     "LimitAmount": {
    //       "currency": CURRENCY_CODE,
    //       "issuer": cold_wallet.address,
    //       "value": "10000000000000" // Large limit, arbitrarily chosen
    //     }
    //   }
    
    //   const ts_prepared = await client.autofill(trust_set_tx)
    //   const ts_signed = recipientWallet.sign(ts_prepared)
    //   console.log("Creating trust line from hot address to issuer...")
    //   const ts_result = await client.submitAndWait(ts_signed.tx_blob)
    //   if (ts_result.result.meta.TransactionResult == "tesSUCCESS") {
    //     console.log(`Trustset hot: https://nft-devnet.xrpl.org/transactions/${ts_signed.hash}`)
    //   } else {
    //     throw `Error sending transaction: ${ts_result.result.meta.TransactionResult}`
    //   }

    if (quantity <= 0) {
      client.disconnect()
      return
    }
    const issue_quantity = quantity.toString()
    const send_token_tx = {
      "TransactionType": "Payment",
      "Account": cold_wallet.address,
      "Amount": {
        "currency": CURRENCY_CODE,
        "value": issue_quantity,
        "issuer": cold_wallet.address
      },
      "Destination": recipientWallet.address,
    }
  
    const pay_prepared = await client.autofill(send_token_tx)
    const pay_signed = cold_wallet.sign(pay_prepared)
    console.log(`Sending ${issue_quantity} ${CURRENCY_CODE} to ${recipientWallet.address}...`)
    const pay_result = await client.submitAndWait(pay_signed.tx_blob)
    if (pay_result.result.meta.TransactionResult == "tesSUCCESS") {
      console.log(`Transaction succeeded: https://nft-devnet.xrpl.org/transactions/${pay_signed.hash}`)
    } else {
        console.log(pay_result)
    //   throw `Error sending transaction: ${pay_result.result.meta.TransactionResult}`
    }
    client.disconnect()
  }

const checkBalance = async (publicAddress) => {
    const client = new xrpl.Client(CLIENT_URL)
    console.log("Connecting to nft-devnet...")
    await client.connect()
  
    // Get credentials from the Testnet Faucet -----------------------------------
    console.log("Requesting addresses from the nft-devnet faucet...")
    // const hot_wallet = xrpl.Wallet.fromSeed(HOT_SECRET)
    // const hot_wallet = (await client.fundWallet()).wallet
    const cold_wallet = xrpl.Wallet.fromSeed(COLD_SECRET)
    console.log("Getting hot address balances...")
    const hot_balances = await client.request({
      command: "account_lines",
      account: publicAddress,
      ledger_index: "validated"
    })
    console.log(hot_balances.result);
  
    console.log("Getting cold address balances...")
    const cold_balances = await client.request({
      command: "gateway_balances",
      account: cold_wallet.address,
      ledger_index: "validated",
      hotwallet: [publicAddress]
    })
    console.log(JSON.stringify(cold_balances.result, null, 2))
    client.disconnect()
    const gldBalance = hot_balances.result.lines.filter(line => line.currency == 'GLD')
    console.log('gldBalance', gldBalance)
    
    if (gldBalance.length > 0) {
        return gldBalance[0].balance
    }
    else {
        return 0
    }
}

export const getBalance = createAsyncAction('GET_BALANCE', (publicAddress) => {
  return checkBalance(publicAddress).then(result => {
    return result 
  })
});