# Alexa-Fit-to-Go
An Alexa Skill to enable better fitness

aws lambda update-function-code --function-name ask-custom-Hello_World-cli-user --zip-file fileb://archive.zip --publish

# doc / api

http://ask-sdk-java-javadocs.s3-website-us-west-2.amazonaws.com/com/amazon/ask/response/ResponseBuilder.html

# Tests

See the tests folder.

Run 'yarn test'.

# Build

TODO utilise node or similar to zip up files

For now

To publish, compress all files accept from the test folder (this is too large in size).

# Usage of App

This application is designed to provide a set of exercises as preparation for additional activities such as sport.
The exercises in this application should not substitute those already undertaken before doing an activity. 

Keep fit.

# Dev notes:

Handy command line functions:

List all lamda functions:
- aws lambda list-functions

Deploy to aws:
- aws lambda update-function-code --function-name the-func-name-here --zip-file fileb://archive.zip --publish

- aws configure (if you haven't set up the cli)

To re-deploy remeber to re-zip the code.

# Project Checklist

DONE:

- create a dynamically built exercise sentence
- tell a joke
- give a tip
- can elicit for difficulty of exercise 
- can progress through a sequence of exercises
- can drive different exercises based on the level of difficulty 
- can help a user when lost
- context switching, allow user to get tip, then go back to their exercise

TODO:

- If repeat, and last step of exercise, take them to the start.
- Allow them to try something else, think of what the user might want to do
- Slow down exercises
- can utilise data to provide a user data related tip
- can utilise data to provide a user data related joke 
- can apply a bit of random fun to the experience, throw in a joke, tell a fact, ask a question and reply with a witty answer
- utilise Facebook somemore / Image API / Invite Friends intent.
- log exercise time of user each session
- log all user responses for review 
- deploy to store
- create deployment package using Webpack or similar to uglify, minify, zip + push code to AWS
- streamline cli effort to deploy (zip, deploy - one command)


DevPost: 

https://devpost.com/software/fit-to-go

APL:

//https://developer.amazon.com/docs/alexa-presentation-language/apl-support-for-the-nodejs-2-0-sdk-in-your-skill.html

- Adding APL template example:
const LaunchHandler = (input) => {
    const speechText = 'Welcome';
    const repromptText = 'Try to say hello!';
    return input.responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: myDocument,
            datasources: {}
        })
        .getResponse();
  },
};

// see: https://developer.amazon.com/docs/alexa-presentation-language/apl-text.html
https://developer.amazon.com/docs/alexa-presentation-language/apl-image.html

// Example of APL Document type.

{
  "type": "APL",
  "version": "1.0",
  "import": [
    {
      "name": "alexa-layouts",
      "version": "1.0.0"
    }
  ],
  "mainTemplate": {
    "parameters": [
      "payload"
    ],
    "items": [
      {
        "type": "Text",
        "text": "Hello World"
      }
    ]
  }
}

// SSML:
https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html

"outputSpeech": {
    "type": "SSML",
    "ssml": "<speak>This output speech uses SSML.</speak>"
}

Examples:

Add Audio
<audio src="soundbank://soundlibrary/transportation/amzn_sfx_car_accelerate_01" />

Add Pause
<break time="3s"/>

Emphasise Speech
<emphasis level="strong">really like</emphasis> 

Lang
<lang xml:lang="fr-FR">Paris</lang>

Prosody, speed, pitch, volume of speech
<prosody rate="x-slow">I speak quite slowly</prosody>
<prosody pitch="x-high"> but also with a much higher pitch </prosody>

Interpret text as
<say-as interpret-as="digits">12345</say-as>

Switch Voices in a conversation
<speak>
    Here's a surprise you did not expect.  
    <voice name="Kendra"><lang xml:lang="en-US">I want to tell you a secret.</lang></voice>
    <voice name="Brian"><lang xml:lang="en-GB">Your secret is safe with me!</lang></voice>	
    <voice name="Kendra"><lang xml:lang="en-US">I am not a real human.</lang></voice>.
    Can you believe it?
</speak>

<amazon:effect name="whispered">I am not a real human.</amazon:effect>

Steps, to enable APL. CUSTOM > INTERFACE > APL ACTIVATION
https://developer.amazon.com/docs/alexa-presentation-language/apl-support-for-your-skill.html

example from, https://github.com/alexa/skill-sample-nodejs-berry-bash/blob/master/lambda/custom/index.js

 response.addRenderTemplateDirective({
        type: pListTemplateType,
        backButton: 'hidden',
        backgroundImage,
        title,
        listItems: itemList,
    });

// test?
response.addHintDirective(pHint);

// has display check
function supportsDisplay(handlerInput) {
    var hasDisplay =
        handlerInput.requestEnvelope.context &&
        handlerInput.requestEnvelope.context.System &&
        handlerInput.requestEnvelope.context.System.device &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display
    return hasDisplay;
}

const myImage = new Alexa.ImageHelper()
  .withDescription('FooDescription')
  .addImageInstance('http://BarImageSource')
  .getImage();
  
const myTextContent = new Alexa.PlainTextContentHelper()
  .withPrimaryText('Foo')
  .withSecondaryText('Bar')
  .withTertiaryText('Baz')
  .getTextContent();

???
https://ask-sdk-for-nodejs.readthedocs.io/en/latest/Building-Response.html

//
if (supportsDisplay(handlerInput) && !testingOnSim) {