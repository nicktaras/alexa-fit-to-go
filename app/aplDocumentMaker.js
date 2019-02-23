
exports.aplDocumentMaker = (APL) => {

    /* 
    Input: 

    APL: {
      displayContent: {
        type: "STRING"
        url:  "STRING"
      },
      handlerInput: { OBJECT }
    }

  */ 


  const { handlerInput, displayContent } = APL;
  const { url, type, repeat } = displayContent;

  if (type === "Video" && url) {
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
                "type": type,
                "source": url,
                "autoplay": true,
                "repeatCount": repeat || 0,
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

  if (type === "Image" && url) {
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
                "type": type,
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
