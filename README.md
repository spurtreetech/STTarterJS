# STTarterJS

Javascript SDK for usage of STTarter features

#Installation 

```
npm install sttarter
```

#Usage (NodeJS)
Get your sttarter app_key & app_secret from http://www.sttarter.com/
```
var Sttarter = require('sttarter');

var stt = new Sttarter('app_key','app_secret');

// Send SMS
stt.sendSMS("mobile_no","Message");

// Send Email 
stt.sendEMail("email_id","subject","message");

// Get Chatrooms
stt.getTopics();

```


