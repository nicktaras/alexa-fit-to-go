# Alexa-Fit-to-Go
An Alexa Skill to enable better fitness

# Usage of App

This application is designed to provide a set of exercises as preparation for additional activities such as sport.
The exercises in this application should not substitute those already undertaken before doing an activity. 

Keep fit.

# Dev notes:

Handy command line functions:

List all lamda functions:
- aws lambda list-functions

Deploy to aws:
- aws lambda update-function-code --function-name your-func-name-here --zip-file fileb://archive.zip --publish

To re-deploy remeber to re-zip the code.

# Project Checklist

- create a dynamically built exercise sentence (done)
- tell a joke (done)
- give a tip (done)
- can progress through a sequence of exercises (TODO)
- can utilise data to provide a user data related tip (TODO)
- can utilise data to provide a user data related joke (TODO)
- can help a user when lost (TODO)
- can hop between conversations (Needs to be tested)
- can drive different exercises based on the level of difficulty (TODO)
- can apply a bit of random fun to the experience, throw in a joke, tell a fact, ask a question and reply with a witty answer (TODO)
- Utilise Facebook somemore (TODO) Image API / Invite Friends intent.
- Log exercise time of user each session (TODO)
- Log all user responses for review (TODO)
- Deploy to store (TODO)
- Create deployment package using Webpack or similar to uglify, minify, zip + push code to AWS

