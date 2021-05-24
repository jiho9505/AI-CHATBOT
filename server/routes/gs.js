const express = require('express');
const router = express.Router();
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

const app_root_path = require('app-root-path').path;
// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const path = require("path");


const client = new textToSpeech.TextToSpeechClient();
// const log = console.log;




router.post('/tts', async (req, res) => {
 
    const text = req.body.text;

  // Construct the request
    const request = {
        input: {text: text},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: 'ko', ssmlGender: 'NEUTRAL'},
        // select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
    };
    
    // log(`__dirname`, __dirname);
    // log(`process.cwd()`, path.join(process.cwd(),'client/src/components/views/Counsel/output.mp3'));
    // log(`app_root_path`, path.join(app_root_path,'client/audio/output.mp3'));
    

    const outputFile = path.join(app_root_path,'client/src/components/views/Counsel/output.mp3')
    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);

    await writeFile(outputFile, response.audioContent, 'binary');
  
    res.send();
   
})

module.exports = router;