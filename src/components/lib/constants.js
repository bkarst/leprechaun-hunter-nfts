import * as ls from "local-storage";
const xrpl = window.xrpl
export function getConstants() {
    const secretKey = ls.get("private_test_key") || "snDQdKJ87mPVhHSUQ9SnNX5QzFmpm"
    // const secretKey = 'snDQdKJ87mPVhHSUQ9SnNX5QzFmpm'
    const publicKey = xrpl.Wallet.fromSeed(secretKey).address
    return {
        TEST_USER_SECRET: secretKey,
        TEST_USER_ADDRESS: publicKey
    }
    // export const TEST_USER_SECRET = ls.get("private_test_key")
}
// export const TEST_USER_SECRET = 'snDQdKJ87mPVhHSUQ9SnNX5QzFmpm'
export const TEST_USER_SECRET = ls.get("private_test_key")
export const TEST_USER_ADDRESS = 'rfBmSoCCU6wRFuBhdA7m7ErDCk2V5cdxpt'
// export const TEST_USER_SEQUENCE = '321102'
export const CLIENT_URL = "wss://xls20-sandbox.rippletest.net:51233"
// export const BASE_API_URL = "http://localhost:3001/"
export const BASE_API_URL = "https://leprechaun-hunter-nfts-devnet.herokuapp.com/"
export const TOKEN_URL = 'token_url'
export const HOT_SECRET = 'snAzF7S9gVamCd6xzUAuSviHYgpS4'
export const COLD_SECRET = 'shK1G34b9fgD81mK2HkemkafedMRf'
export const CURRENCY_CODE = 'GLD'