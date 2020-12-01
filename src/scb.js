const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const HEADERS = {
    'content-type': 'application/json',
    'accept-language': 'EN',
    'response-channel': 'mobile',
    apikey: 'l7e441874ddbe14df7aff5fcb4e3c7bbaa', // public Key
    resourceOwnerId: 'l7e441874ddbe14df7aff5fcb4e3c7bbaa', // public key
    apisecret: 'faba04b98242486db42a7989780643e5', // private key
    endState: 'mobile_app',
    channel: 'scbeasy',
}
const GET_TOKEN_API =
    'https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token'
const DEEPLINK_API =
    'https://api-sandbox.partners.scb/partners/sandbox/v3/deeplink/transactions'
const TRANSACTION_API =
    'https://api-sandbox.partners.scb/partners/sandbox/v2/transactions'

class SCBServices {
    static async getToken(requestUID) {
        const getToken = await axios.post(
            GET_TOKEN_API,
            {
                applicationKey: 'l7e441874ddbe14df7aff5fcb4e3c7bbaa',
                applicationSecret: 'faba04b98242486db42a7989780643e5',
            },
            { headers: { ...HEADERS, requestUId: requestUID } }
        )
        return getToken.data.data.accessToken
    }
    static async createLink(amount) {
        try {
            const requestUID = uuidv4()
            const orderId = requestUID.slice(0, 8)
            const accessToken = await this.getToken(requestUID)

            const orderPayload = {
                transactionType: 'PURCHASE',
                transactionSubType: ['BP', 'CCFA'],
                sessionValidityPeriod: 60 * 5, // 5 Minute
                billPayment: {
                    paymentAmount: amount,
                    accountTo: '694448340465495',
                    ref1: 'ABCDEFGHIJ1234567890',
                    ref2: 'ABCDEFGHIJ1234567890',
                    ref3: orderId,
                },
                creditCardFullAmount: {
                    merchantId: '073704628165116',
                    terminalId: '213412430889760',
                    orderReference: orderId,
                    paymentAmount: amount,
                },
                merchantMetaData: {
                    // callbackUrl: callbackUrl,
                    merchantInfo: {
                        name: 'papoy',
                    },
                },
            }
            const scbEndPoint = await axios.post(DEEPLINK_API, orderPayload, {
                headers: {
                    ...HEADERS,
                    requestUId: requestUID,
                    authorization: `Bearer ${accessToken}`,
                },
            })
            const callbackUrl = 
                'https://liff.line.me/1655050462-nZ59d8z5/payment/success/'+
                scbEndPoint.data.data.transactionId
            const deeplinkUrl =
                scbEndPoint.data.data.deeplinkUrl +
                '?callback_url=' +
                callbackUrl
            const response = {
                transactionId: scbEndPoint.data.data.transactionId,
                deeplinkUrl: deeplinkUrl,
                orderId: orderId,
                requestUId: requestUID,
            }
            return response
        } catch (error) {
            console.log(error)
        }
    }
    static async get(tranactionId) {
        try {
            const requestUID = uuidv4()
            const accessToken = await this.getToken(requestUID)
            const payload = await axios.get(
                TRANSACTION_API + `/${tranactionId}`,
                {
                    headers: {
                        ...HEADERS,
                        requestUId: requestUID,
                        authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            return payload.data
        } catch (e) {
            throw new Error('Cannot get transaction id ' + tranactionId)
        }
    }
    static async isPaid(tranactionId) {
        try {
            const transaction = await this.get(tranactionId)
            if (transaction.data.statusCode === 1) {
                return true
            }
        } catch (e) {
            throw new Error('cannot verify isPaid ' + e.message)
        }
        return false
    }
}

export default SCBServices