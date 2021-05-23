const express = require('express');
const router = express.Router();
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');
// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const path = require("path");

const client = new textToSpeech.TextToSpeechClient();



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
    const road = '../../client/src/components/views/Counsel/output.mp3'
    console.log('PATH',path.join(__dirname,road))
    // C:\Users\문지호\Desktop\WebProject\Web_Capston\server\routes
    // '
    // path: path.join(__dirname, 'path/to/.env')
    const outputFile = path.join(__dirname,road);
    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFile, response.audioContent, 'binary');
  
    res.send();
   
})

module.exports = router;