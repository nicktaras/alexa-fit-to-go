
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

  // https://developer.amazon.com/docs/alexa-presentation-language/apl-video.html
  // https://developer.amazon.com/es/docs/custom-skills/videoapp-interface-reference.html
  // https://developer.amazon.com/docs/alexa-presentation-language/apl-commands-media.html
  // https://github.com/alexa-labs/skill-sample-nodejs-firetv-vlogs/blob/896f0f4a93293315327a9e12dde65940ce1d3fc6/lambda/custom/videoPlayer.json#L305

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
                "id": "videoDisplay",
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
