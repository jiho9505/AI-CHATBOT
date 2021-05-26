const express = require('express');
const router = express.Router();
const {SessionsClient} = require('@google-cloud/dialogflow-cx');
const config = require('../config/key.js')

const projectId = 'propane-shell-311716'
// const languageCode = 'ko'
// const agentId = '5d4e3a8e-26e7-4f9b-b283-49abe1c9c277'
const location = 'asia-northeast1'
const client = new SessionsClient({apiEndpoint: 'asia-northeast1-dialogflow.googleapis.com'})

// const projectId = config.googleProjectID
const languageCode = config.dialogFlowSessionLanguageCode
const agentId = config.agentId

const sessionId = Math.random().toString(36).substring(7);
const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
);

router.post('/textQuery', async (req, res) => {

    const request = {
        session: sessionPath,
        queryInput: {
            text: {           
                text: req.body.text,
                
            },
            languageCode: languageCode,
        },
    };

    const [response] = await client.detectIntent(request);
    for (const message of response.queryResult.responseMessages) {
        if (message.text) {
        res.send(message.text.text)
        }
    }
  
})

router.post('/eventQuery', async (req, res) => {
   
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                event: req.body.event,
                
            },
            languageCode: languageCode,
        },
    };

    const [response] = await client.detectIntent(request);
 
    for (const message of response.queryResult.responseMessages) {
        if (message.text) {
        res.send(message.text.text)
        }
    }
})

// const projectId = config.googleProjectID
// const languageCode = config.dialogFlowSessionLanguageCode
// const agentId = config.agentId

module.exports = router;