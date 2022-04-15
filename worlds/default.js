// Copyright 2021 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.MaxAvatars = 6;
    Constants.AvatarNames = [
        "generic/1", "generic/2", "generic/3", "generic/4", "generic/5", "generic/6",
        "alice", "newwhite", "fixmadhatter", "marchhare", "queenofhearts", "cheshirecat"
    ];

    Constants.SystemBehaviorDirectory = "behaviors/croquet";
    Constants.SystemBehaviorModules = [
        "menu.js", "elected.js", "propertySheet.js"
    ];

    Constants.UserBehaviorDirectory = "behaviors/default";
    Constants.UserBehaviorModules = [
        "demo.js", "bitcoinTracker.js", "bridge.js", "flightTracker.js", "spin.js", "lights.js"
    ];

    const frameColor = 0x888888;

    Constants.DefaultCards = [
        {
            card: {
                name:'world model',
                translation:[0, -10, -60],
                scale:[200, 200, 200],
                rotation: [0, Math.PI, 0],
                layers: ['walk'],
                type: "3d",
                dataLocation: "./assets/3D/Oil Refinery_040522_2.glb.zip",
                singleSided: true,
                shadow: true,

                placeholder: true,
                placeholderSize: [40, 1, 40],
                placeholderColor: 0x808080,
                placeholderOffset: [0, -0.463, 0],

            }
        },
        {
            card: {
                name: 'light',
                layers: ['light'],
                type: "lighting",
                behaviorModules: ["Light"],
                dataLocation: "./assets/sky/abandoned_parking_4k.jpg",
                dataType: "jpg",
            }
        },
        {
            card: {
                name: 'Perlin Demo',
                layers: ["pointer"],
                translation:[ 10, -2.75, -14],
                type: "object",
                behaviorModules: ["Perlin"],
                rotation:[ 0, -0.7071068, 0, 0.7071068 ],
            }
        },
        {
            card: {
                name: 'text editor',
                className: "TextFieldActor",
                translation: [-4, -0.5, -12],
                rotation: [0, Math.PI / 2, 0],
                multiuser: true,
                depth: 0.05,
                type: "text",
                runs: [{text: "hello"}],
                margins: {left: 20, top: 20, right: 20, bottom: 20},
                backgroundColor: 0xf4e056,
                //color: 0xf4e056,
                frameColor: frameColor,
                width: 2,
                height: 2,
                textScale: 0.002,
                shadow: true,
            }
        },
        {
            card: {
                name:'simple 3D model',
                translation: [-4, -0.5, -18],
                rotation: [Math.PI / 2, Math.PI / 2, 0],
                type: "3d",
                dataLocation: "./assets/3D/Gears.glb.zip",
                shadow: true,
                singleSided: true,
            }
        },

        /*
        {
            card: {
                name: 'video card',
                translation: [-4, -0.5, -24],
                rotation: [0, Math.PI / 2, 0],
                scale: [4, 4, 4],
                type: "2d",
                textureType: "video",
                textureLocation: "./assets/videos/fromPCtoHMD.mp4",
                textureWidth: 1024,
                textureHeight: 848,
                width: 2,
                height: 1.656,
                cornerRadius: 0.05,
                frameColor: frameColor,
                color: 0xffffff,
                depth: 0.05,
                fullBright: true
            }
        },
        */
        {
            card: {
                name: 'image card',
                translation: [-4, -0.5, -23],
                rotation: [0, Math.PI / 2, 0],
                scale: [4, 4, 4],
                type: "2d",
                textureType: "image",
                textureLocation: './assets/images/Colony.png',
                frameColor: 0x888888,
                color: 0xffffff,
                cornerRadius: 0.05,
                depth: 0.05,
                fullBright: false
            }
        },
        {
            card: {
                name: 'multiblaster',
                className: "MultiBlaster",
                translation: [-4, -0.5, -29],
                rotation: [0, Math.PI / 2, 0],
                scale: [4, 4, 4],
                layers: ['pointer'],
                multiuser: true,
                type: "2d",
                textureType: "canvas",
                textureWidth: 1024,
                textureHeight: 1024,
                frameColor: frameColor,
                cornerRadius: 0.05,
                color: 0xffffff,
                depth: 0.05,
                fullBright: true
            }
        },
        {
            card: {
                name:'bouncinglogo',
                className: "BouncingLogo",
                translation: [-4, -0.5, -35],
                rotation: [0, Math.PI / 2, 0],
                scale: [4, 4, 4],
                width: 1,
                height: 1,
                layers: ['pointer'],
                multiuser: true,
                type: "2d",
                dataLocation: "./assets/SVG/full-circle.svg",
                textureType: "dynamic",
                textureWidth: 1024,
                textureHeight: 1024,
                frameColor: frameColor,
                color: 0xffffff,
                depth: 0.05,
                fullBright: true,
            }
        },
        {
            card: {
                name:'flightTracker',
                translation: [-4, 1.5, -50],
                type: "object",
                behaviorModules: ["Elected", "FlightTracker", "Spin"],
                layers: ['pointer'],
                multiuser: true,
                color: 0xaaaaaa,
            }
        },
        {
            card: {
                name:'code editor',
                translation: [8, -1.2, 4],
                rotation: [0, -Math.PI / 2, 0],
                layers: ['pointer'],
                type: "code",
                behaviorModule: "Circle.CircleActor",
                margins: {left: 32, top: 32, right: 32, bottom: 32},
                // margins: {left: 16, top: 16, right: 16, bottom: 16},
                textScale: 0.001,
                width: 1.5,
                height: 2,
                depth: 0.05,
                frameColor: frameColor,
            }
        },
        {
            card: {
                name:'flamingo model',
                dataTranslation: [0, 3, 0],
                type: "3d",
                dataLocation: './assets/3D/Flamingo.glb.zip',
                behaviorModules: ["Circle"]
            }
        },
        {
            card: {
                name: 'drive code editor',
                translation: [83, -0.9, -113],
                rotation: [0, -Math.PI / 2, 0],
                layers: ['pointer'],
                type: "code",
                behaviorModule: "Drive.DriveActor",
                textScale: 0.001,
                margins: {left: 32, top: 32, right: 32, bottom: 32},
                width: 1.5,
                height: 2.8,
                depth: 0.05,
                frameColor: frameColor,
            },
        },
        {
            card: {
                name: 'spin code editor',
                translation: [83, -1.6, -115],
                rotation: [0, -Math.PI / 2, 0],
                layers: ['pointer'],
                type: "code",
                behaviorModule: "Spin.SpinActor",
                textScale: 0.001,
                margins: {left: 32, top: 32, right: 32, bottom: 32},
                width: 1.5,
                height: 1.7,
                depth: 0.05,
                frameColor: frameColor,
            },
        },
        {
            card: {
                name:'porsche',
                dataRotation: [-Math.PI / 2, 0, 0],
                translation: [82, -2.56, -110],
                layers: ['pointer'],
                type: "3d",
                multiuser: true,
                dataLocation: "3Rph2fVNkc0jhp42pQF7jVIX5t2yeugm3T6CFPV1F4c4OiYmIiFofX00Oz43IXwnIXwxID0jJzcmfDs9fSd9BB4aNghrYWMwFDEIFidjEzsGZSYcOxAmajgYYH07PXwxID0jJzcmfD87MSA9JDcgITd9EyUlJhYaBj8oOzFnOTocMCEwNjZ_OgZiATQGOgE_OD0BZgU9ZR4iAjoIOX02MyYzfTwzaio-MyE7NA07NT8KFQVrNWATYAA7GRllYWMFEBhiJQskIj8xfyM9ZmI",
                behaviorModules: ["Drive"]
            }
        },
        {
            card: {
                name:'earth',
                translation: [84, 1, -120],
                scale: [0.5, 0.5, 0.5],
                type: "object",
                behaviorModules: ["FlightTracker", "Spin"],
                layers: ['pointer'],
                multiuser: true,
                color: 0xaaaaaa,
            }
        },
        {
            card: {
                name:'bridge',
                type: "object",
                translation: [4, 0, 20],
                behaviorModules: ["Bridge"],
            }
        },
        {
            card: {
                name: 'bitcointracker',
                translation: [-4, -0.5, -6],
                rotation: [0, Math.PI / 2, 0],
                scale: [4, 4, 4],
                type: "2d",
                textureType: "canvas",
                textureWidth: 1024,
                textureHeight: 768,
                width: 1,
                height: 0.75,
                frameColor: frameColor,
                // color: 0xffffff,
                depth: 0.05,
                cornerRadius: 0.1,
                behaviorModules: ["Elected", "BitcoinTracker"],
            },
            id: "main",
        },
        {
            card: {
                name:'bitlogo',
                translation: [-0.35, 0.35, 0.1],
                scale: [0.25, 0.25, 0.25],
                parent: "main",
                type: "2d",
                dataLocation: './assets/SVG/BitcoinSign.svg',
                depth: 0.05,
                color: 0xffffff,
                frameColor: frameColor,
                behaviorModules: ["BitLogo"]
            }
        },
        {
            card: {
                name:'bar graph',
                translation:[0, -0.3, 0.1],
                color: 0xEEEEEE,
                frameColor: frameColor,
                type: "object",
                height: 0.4,
                parent: "main",
                behaviorModules: ["BarGraph"],
            }
        }
    ];
}