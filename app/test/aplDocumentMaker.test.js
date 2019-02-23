const { aplDocumentMaker } = require('./../aplDocumentMaker');

// Apply a constant math random value for the purpose of this test.

test('ensures application can build an apl document object', () => { 
  const output = aplDocumentMaker({
    handlerInput: { 
      requestEnvelope: { 
        context: { 
          Viewport: { 
            width: 300, 
            height: 300
          }
        }
      }
    },
    url: 'https://raw.githubusercontent.com/nicktaras/alexa-go-fit/master/assets/image/intro.png',
    template: 'IMAGE'
  });
  expect(output).toEqual({
    "import": [ 
      {
        "name": "alexa-layouts",
        "version": "1.0.0",
      },
    ],
    "mainTemplate": {
      "items": [
        {
          "height": "100vh",
          "items": [
           {
              "backgroundColor": "white",
              "height": "100vh",
              "position": "absolute",
              "type": "Frame",
              "width": "100vw",
            },
           {
              "align": "center",
              "height": undefined,
              "scale": "best-fill",
              "source": "https://raw.githubusercontent.com/nicktaras/alexa-go-fit/master/assets/image/intro.png",
              "type": "Image",
              "width": undefined,
            },
          ],
          "type": "Container",
          "width": "100vw",
        },
      ],
      "parameters": [
        "payload",
      ],
    },
    "type": "APL",
    "version": "1.0",
    }  
  );
});
