const express = require('express');
const router = express.Router();
// const dialogflow = require('dialogflow');
const config = require('../config/key');

const {SessionsClient} = require('@google-cloud/dialogflow-cx');

const projectId = config.googleProjectID
// const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode
const location = 'global';
const agentId = 'demo-v1';
// const sessionClient = new dialogflow.SessionsClient();
// const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const client = new SessionsClient();

const sessionId = Math.random().toString(36).substring(7);
const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
);
console.info(sessionPath);

// console.log(GOOGLE_APPLICATION_CREDENTIALS);

router.post('/textQuery', async (req, res) => {

    const request = {
        session: sessionPath,
        queryInput: {
            text: {           
                text: req.body.text,
                languageCode: languageCode,
            },
            languageCode: languageCode,
        },
    };

   
    const responses = await client.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.send(result)
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
    console.log('Detectestsettent');
    const responses = await client.detectIntent(request);
    console.log('Detected intent');

    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    // console.log(`  Response: ${result.fulfillmentMessages}`);

    res.send(result)
})







module.exports = router;