const express = require('express');
const router = express.Router();
const config = require('../config/key');

const {SessionsClient} = require('@google-cloud/dialogflow-cx');

const projectId = config.googleProjectID
const languageCode = config.dialogFlowSessionLanguageCode
const agentId = config.agentId

const location = 'asia-northeast1'
const client = new SessionsClient({apiEndpoint: 'asia-northeast1-dialogflow.googleapis.com'})

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
                name: req.body.event,
                
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
    // console.log('Detectestsettent');
    // const responses = await client.detectIntent(request);
    // console.log('Detected intent');

    // const result = responses[0].queryResult;
    // console.log(`  Query: ${result.queryText}`);
    // console.log(`  Response: ${result.fulfillmentText}`);
    // // console.log(`  Response: ${result.fulfillmentMessages}`);

    // res.send(result)
})







module.exports = router;