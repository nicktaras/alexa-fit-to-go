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

- create a dynamically built exercise sentence (done)
- tell a joke (done)
- give a tip (done)
- can elicit for difficulty of exercise (todo)
- can progress through a sequence of exercises (done)
- can utilise data to provide a user data related tip (TODO)
- can utilise data to provide a user data related joke (TODO)
- can help a user when lost (TODO)
- can hop between conversations (Needs to be tested)
- can drive different exercises based on the level of difficulty (done)
- can apply a bit of random fun to the experience, throw in a joke, tell a fact, ask a question and reply with a witty answer (TODO)
- utilise Facebook somemore (TODO) Image API / Invite Friends intent.
- log exercise time of user each session (TODO)
- log all user responses for review (TODO)
- deploy to store (TODO)
- create deployment package using Webpack or similar to uglify, minify, zip + push code to AWS
- streamline cli effort to deploy (zip, deploy - one command)

