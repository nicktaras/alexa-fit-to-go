const defaultAplDocument = require('./aplDocuments/onload.json');

exports.aplDocumentMaker = (APL) => {

  /* 

    Input: 

    APL: {
      template: 'IMAGE',
      url: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png',
      handlerInput: handlerInput
    }

  */ 

  aplDocument = defaultAplDocument;

  if (APL.template === "VIDEO" && APL.url) {
    aplDocument = {
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
            "type": "Container",
            "width": "100vw",
            "height": "100vh",
            "items": [
              {
                "type": "Frame",
                "width": "100vw",
                "height": "100vh",
                "backgroundColor": "white",
                "position": "absolute"
              },
              {
                "type": "Video",
                "source": apl.url,
                "autoplay": true,
                "repeatCount": 0,
                "width": apl.handlerInput.requestEnvelope.context.Viewport.pixelWidth,
                "height": apl.handlerInput.requestEnvelope.context.Viewport.pixelHeight,
                "align": "center",
                "scale": "best-fill"
              }
            ]
          }
        ]
      }
    }  
  } 

  if (APL.template === "IMAGE" && APL.url) {
    aplDocument = {
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
            "type": "Container",
            "width": "100vw",
            "height": "100vh",
            "items": [
              {
                "type": "Frame",
                "width": "100vw",
                "height": "100vh",
                "backgroundColor": "white",
                "position": "absolute"
              },
              {
                "type": "Image",
                "source": apl.url,
                "width": apl.handlerInput.requestEnvelope.context.Viewport.pixelWidth,
                "height": apl.handlerInput.requestEnvelope.context.Viewport.pixelHeight,
                "align": "center",
                "scale": "best-fill"
              }
            ]
          }
        ]
      }
    }  
  }

  return aplDocument;

}