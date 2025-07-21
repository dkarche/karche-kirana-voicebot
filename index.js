// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const VoiceResponse = require('twilio').twiml.VoiceResponse;

app.use(express.urlencoded({ extended: false }));

app.post('/voice', (req, res) => {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    input: 'speech',
    language: 'mr-IN',
    speechTimeout: 'auto',
    action: '/handle_speech'
  });

  gather.say('नमस्कार! Karche Kirana Store मध्ये स्वागत आहे. तुम्ही विचारू शकता - noodles कितीला आहेत, rice किती आहे, delivery आहे का?');

  res.type('text/xml');
  res.send(twiml.toString());
});

app.post('/handle_speech', (req, res) => {
  const twiml = new VoiceResponse();
  const speechResult = req.body.SpeechResult?.toLowerCase() || '';

  if (speechResult.includes('rice') || speechResult.includes('तांदूळ')) {
    twiml.say('तांदूळ शंभर रुपये किलो आहेत.');
  } else if (speechResult.includes('noodles') || speechResult.includes('नूडल्स')) {
    twiml.say('नूडल्स शंभर रुपये आहेत.');
  } else if (speechResult.includes('delivery')) {
    twiml.say('हो, आम्ही होम डिलिव्हरी करतो सकाळी ९ ते रात्री ९ पर्यंत.');
  } else {
    twiml.say('माफ करा, मला समजलं नाही. कृपया पुन्हा सांगा.');
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(port, () => {
  console.log(`Voice bot running at http://localhost:${port}`);
});
