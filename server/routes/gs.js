const express = require('express');
const router = express.Router();
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

router.post('/tts', async (req, res) => {
 
    const text = req.body.text;

  // Construct the request
    const request = {
        input: {text: text},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: 'ko-KR', ssmlGender: 'NEUTRAL'},
        // select the type of audio encoding
        audioConfig: {audioEncoding: 'LINEAR16', speakingRate : 1},
    };
    
    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    // const writeFile = util.promisify(fs.writeFile);

    // await writeFile(outputFile, response.audioContent, 'binary');
    
    res.send(response.audioContent)
   
})

module.exports = router;