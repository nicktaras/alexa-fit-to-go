exports.aplDocumentMaker = (APL) => {

  /* 

    Input: 

    APL: {
      template: 'IMAGE',
      url: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }

  */  

  aplDocument = undefined;

  if (APL.template === 'VIDEO') {
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
            "type": "Video",
            "source": APL.url,
            "autoplay": true,
            "repeatCount" : 0
          }
        ]
      }
    }
    
  }

  if (APL.template === 'IMAGE') {
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
            "type": "Image",
            "source": APL.url,
            "scale": "fill",
            "align": "centre",
            "height": 550,
            "width": 550
          }
        ]
      }
    }
  }

  return aplDocument;

}