exports.aplDocumentMaker = (APL) => {

  /* 

    Input: 

    APL: {
      template: 'IMAGE',
      url: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png',
      handlerInput: handlerInput
    }

  */ 

  console.log('Hello world: ');
  console.log('url: ', APL.url);
  console.log('template: ', APL.template);
  console.log('Handler input: ', APL.handlerInput.requestEnvelope);

  const { handlerInput, url, template } = APL;

  if (template === "VIDEO" && url) {
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
                "source": url,
                "autoplay": true,
                "repeatCount": 0,
                "width": handlerInput.requestEnvelope.context.Viewport.pixelWidth,
                "height": handlerInput.requestEnvelope.context.Viewport.pixelHeight,
                "align": "center",
                "scale": "best-fill"
              }
            ]
          }
        ]
      }
    }  
  } 

  if (template === "IMAGE" && url) {
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
                "source": url,
                "width": handlerInput.requestEnvelope.context.Viewport.pixelWidth,
                "height": handlerInput.requestEnvelope.context.Viewport.pixelHeight,
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