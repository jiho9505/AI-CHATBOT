const express = require('express');
const router = express.Router();
const config = require('../config/key');

const {SessionsClient} = require('@google-cloud/dialogflow-cx');

// module.exports = {
//     googleProjectID: 'propane-shell-311716',
//     dialogFlowSessionID: 'bot-session',
//     dialogFlowSessionLanguageCode: 'ko',
//     agentId: '5d4e3a8e-26e7-4f9b-b283-49abe1c9c277',
//     googleClientEmail:'jongo-113@propane-shell-311716.iam.gserviceaccount.com',
//     googlePrivateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCsr9SSt5D6WL2h\n5QjdFP8aG+yjaPnUfP7znDfKyyczcVFS18VHT6Br3OyIF4xhiRr4+xk6vRNRir1Q\nQElhIiYN6pFd1IcmPdkmWcQ9yiVMI4BOj1EH9Gro+AGe8Bq0zoyuUWQFsEEAMCJ7\nGAWBxaUyQxrZWhKfD7HqatCCJ10QySotJpSO1ktevnC/G/1GTNGAsbrsoF0u1pm4\nZXJ0X7Vy0q/8N6UnHiGqN/HP62a+X2pudJLpOykZYxOAaO8UVY62gaDvTxZcNDKh\ngvJ0Qm0AkZdpEGP0THSDONpDY0FTvVbrvH+celLsJguXY8+jqfBgG+htC1w2Rx5o\nVObKm5c9AgMBAAECggEAAPSGBfu68w+LmPol1uc3VAMkh3DctOauGFXcXyRJhrjR\nPNaRskfH+ODDdCtBLQbvncHxzUffc/uC+Y8peL6SHFCYVj8HMlh0O4iSk87q7uVh\nX83eIl+hOcGpbKIiW66qy4oKthdX/LLHdgvXd/TKaaFCZEJhyPxyvPuzRI0IMEAS\nRS11EqFoRlwXMIICaixUtnoubgdzH1VJNeTS3qe10optTk0FJyOjUl98r8Bpy8CX\nP1iB69w6U/th2V5lH0X9m5lqV2VPUtfctbJ9T05akCuB4PzLQ5H0sq2gT1NoegDP\nJr5ZPec38GRq6K7TTsxZlL173iMN4fzvD+ap7g+x1wKBgQDh09IHQC/X+53dav1t\nEZXTpBx/9PJ+z/cQvxnUpNMjZCM7mvUPJr1WIDGnSvqywsmbZXc7tli02o9wPd4d\noKIscJuSSy2qZvmk9tBO5p6LCTXG3qXAbFJ2fz70u1ewi1HQHqB1tIzR8kFEz+b8\nErMs3E+/owiU2d6A7SKFbwECYwKBgQDDwmT4lrKF6cEz69A6oDzl/G/d8+FQk4zg\nxQMLSaqZpf2ZS32WPfc+pKRwfGUxkhZWq/F/5ifh6ZSNMLb2aKzCQPBWzr/PbMyz\naCx0Yb1mApuxHj6tKTCIsMSWHfXQDRLJ2ocKFMzGz/m//9GT65mhMz59GHR20tPs\nVwVNbNFh3wKBgCLnCxIF0J8wC2EaVRrTWfXA6oq4P/ZrjALxljtwUhWpN2zR8Ugr\nM54pEaOKih6wzloPH5OCBknFcd/mH/syRX5a1SCSL/ejPLhLUTywlhZlEQOwi6um\n0kPwPLm0bsQhdD6XTTOD+TPFnmLVQxz4gurPDiBPQVdIKQSCIhC/bEeDAoGAYYgc\n3m3WjDmmdMPsfwkOzlczNRYpEAgzjFkb5yfQw7Sb4SBndc9xu9gzxYd0s3nhf1Uz\ngVGeVUQXKzE2NxZ33GCWXemsTyAZ7NjeLS31OznZcClteMCo2bGYgGJ08i9RSRiD\nZ1ZtoDBGco52UIh1hocNfy4L+JeZ1oqUrbqlp2kCgYANhFcTEW/mLDp5LVFHXGvE\nCr6Q+iZHqO/jYBTAdoky8niJ5Xmcx3amUUuD+dk7yyj56CbxOu7Emrwgu0duyv3P\n87bJ5FzVVSKKl9lsn3IgbPaK93hw+BHmbwMuJ+nF2okm1SHemenllYPFEIt2+SSY\nTtrFzQ5aicEfp0fbbhGvaQ==\n-----END PRIVATE KEY-----\n',
//     mongoURI:'mongodb+srv://jiho9505:jiho9505@cluster0.sudep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//     accessKeyId: 'AKIAJWOXIKXZHTXSLXUA', 
//     secretAccessKey: '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',
//     region: 'ap-northeast-2'
// }

const projectId = 'propane-shell-311716'
const languageCode = 'ko'
const agentId = '5d4e3a8e-26e7-4f9b-b283-49abe1c9c277'

// const projectId = config.googleProjectID
// const languageCode = config.dialogFlowSessionLanguageCode
// const agentId = config.agentId

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
                event: req.body.event,
                
            },
            languageCode: languageCode,
        },
    };
    // query_input.event.event
    const [response] = await client.detectIntent(request);
    // console.log('raaaaaaaaaaaaaaaaaaaaaaa',response)
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