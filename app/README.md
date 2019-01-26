# Alexa-Fit-to-Go
An Alexa Skill to enable better fitness

aws lambda update-function-code --function-name ask-custom-Hello_World-cli-user --zip-file fileb://archive.zip --publish

# visual API 

https://developer.amazon.com/docs/alexa-presentation-language/apl-text.html
https://developer.amazon.com/docs/alexa-presentation-language/apl-image.html

# docs and links for video

https://cloudconvert.com/webm-to-mp4
https://www.onlineconverter.com/convert/1120a3a545180eb65dc19ac3db931d81a1

https://cloudconvert.com/webm-to-mp4

https://developer.amazon.com/docs/alexa-presentation-language/apl-video.html

# doc / speech api

//https://developer.amazon.com/docs/alexa-presentation-language/apl-support-for-the-nodejs-2-0-sdk-in-your-skill.html

http://ask-sdk-java-javadocs.s3-website-us-west-2.amazonaws.com/com/amazon/ask/response/ResponseBuilder.html

https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html

https://ask-sdk-for-nodejs.readthedocs.io/en/latest/Building-Response.html

# Tests

See the tests folder.

Run 'yarn test'.

# Build

1. To build, on root run:
node index.js

2. When complete:
delete dist.zip

TODO - add to build script: Remove file when loaded to Amazon

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

- create a dynamically built exercise sentence (Done)
- tell a joke (Done)
- give a tip (Done)
- can elicit for difficulty of exercise (Done)
- can progress through a sequence of exercises (Done)
- can drive different exercises based on the level of difficulty (Done)
- can help a user when lost (In progress)
- context switching, allow user to get tip, then go back to their exercise (Done)
- Allow them to repeat any step (Done)
- Allow them to try something else, think of what the user might want to do
- Slow down exercises
- can utilise data to provide a user data related tip
- can utilise data to provide a user data related joke 
- can apply a bit of random fun to the experience, throw in a joke, tell a fact, ask a question and reply with a witty answer
- utilise Facebook somemore
- Image API (Done)
- Invite Friends and share progress
- log exercise time of user each session
- log all user responses for review 
- deploy to store (In progress)
- create deployment package using Webpack or similar to uglify, minify, zip + push code to AWS (Done)

DevPost: 

https://devpost.com/software/fit-to-go

# SSML API examples:

Add Pause:
<break time="3s"/>

Emphasise Speech:
<emphasis level="strong">really like</emphasis> 

Lang:
<lang xml:lang="fr-FR">Paris</lang>

Prosody, speed, pitch, volume of speech:
<prosody rate="x-slow">I speak quite slowly</prosody>
<prosody pitch="x-high"> but also with a much higher pitch </prosody>

Interpret text as:
<say-as interpret-as="digits">12345</say-as>

Switch Voices in a conversation:
<speak>
    Here's a surprise you did not expect.  
    <voice name="Kendra"><lang xml:lang="en-US">I want to tell you a secret.</lang></voice>
    <voice name="Brian"><lang xml:lang="en-GB">Your secret is safe with me!</lang></voice>	
    <voice name="Kendra"><lang xml:lang="en-US">I am not a real human.</lang></voice>.
    Can you believe it?
</speak>

Whisper:
<amazon:effect name="whispered">I am not a real human.</amazon:effect>

# Alexa Dashboard:

Steps, to enable APL. CUSTOM > INTERFACE > APL ACTIVATION
https://developer.amazon.com/docs/alexa-presentation-language/apl-support-for-your-skill.html

# Exercise Inspircation:

https://www.self.com/gallery/upper-body-stretches
https://www.swimoutlet.com/guides/stretches-for-swimming

# ideas:

- add spotify or music
- teach sports, activities

# API methods: 

// Dev API options:
// speak(speechOutput: string): this;
// reprompt(repromptSpeechOutput: string): this;
// withSimpleCard(cardTitle: string, cardContent: string): this;
// withStandardCard(cardTitle: string, cardContent: string, smallImageUrl?: string, largeImageUrl?: string): this;
// withLinkAccountCard(): this;
// withAskForPermissionsConsentCard(permissionArray: string[]): this;
// withCanFulfillIntent(canFulfillIntent : CanFulfillIntent) : this;
// addDelegateDirective(updatedIntent?: Intent): this;
// addElicitSlotDirective(slotToElicit: string, updatedIntent?: Intent): this;
// addConfirmSlotDirective(slotToConfirm: string, updatedIntent?: Intent): this;
// addConfirmIntentDirective(updatedIntent?: Intent): this;
// addAudioPlayerPlayDirective(playBehavior: interfaces.audioplayer.PlayBehavior, url: string, token: string, offsetInMilliseconds: number, expectedPreviousToken?: string, audioItemMetadata? : AudioItemMetadata): this;
// addAudioPlayerStopDirective(): this;
// addAudioPlayerClearQueueDirective(clearBehavior: interfaces.audioplayer.ClearBehavior): this;
// addRenderTemplateDirective(template: interfaces.display.Template): this;
// addHintDirective(text: string): this;
// addVideoAppLaunchDirective(source: string, title?: string, subtitle?: string): this;
// withShouldEndSession(val: boolean): this;
// addDirective(directive: Directive): this;
// getResponse(): Response;
// updateRoutineState,
// updateExerciseState, 
// getNextExerciseState
// handlerInput.responseBuilder options:
// .withSimpleCard('Hello World', speechText)
// .reprompt(speechText) || .withShouldEndSession(false)
// ideas: 
// Send gifs / video to card when exercise of events are complete e.g. linked account.
