// tutorial2.js
// Copyright 2022 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"
    ];

    Constants.UserBehaviorDirectory = "behaviors/scifi";
    Constants.UserBehaviorModules = [
        "lights.js", "joeTheBox.js", "simpleSpin.js","door.js"
    ];
    Constants.UseRapier = true;

    // const frameColor = 0x888888;

    Constants.DefaultCards = [
        {
            card: {
                name:"world model",
                type: "3d",
                dataLocation: "./assets/3D/scifi.glb.zip",
                dataScale:[2,2,2],
                //singleSided: true,
                shadow: true,
                layers: ["walk"],
                translation:[0, -1.7, 0],

                placeholder: true,
                placeholderSize: [100, 0.01, 100],
                placeholderColor: 0xcccccc,
                placeholderOffset: [0, -1.7, 0],
            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                dataLocation: "./assets/sky/shanghai_riverside_2k.exr",
                dataType: "exr",
            }
        },
        {
            card: {
                name: "image card",
                translation: [0, 0.4, -10],
                //rotation: [0, Math.PI / 2, 0],
                scale: [4, 4, 4],
                type: "2d",
                textureType: "image",
                textureLocation: "./assets/images/CroquetLogo_RGB.jpg",
                fullBright: true,
                frameColor: 0xcccccc,
                color: 0xbbbbbb,
                cornerRadius: 0.05,
                depth: 0.05,
                shadow: true,
            }
        },
        {
            card: {
                name:"dog",
                type: "3d",
                dataLocation: "./assets/3D/shiba.zip",
                //fileName: "/testcube_1m.glb.zip",
                layers: ["pointer"],
                translation:[-20, 0.4, -20],
                dataScale:[1,1,1],
                shadow: true,
            }
        },
        {
            card: {
                name: "door",
                //type: "object",
                type: "3d",
                modelType: "glb",
                translation: [0, 3, 10],//[-1.4447057496318962, -5.504611090090481, 30.282952880859376],
                dataLocation: "37HFPvPUY4QXMcTPpuY0scmEoR9I1QR5KegrT2iJ-RasX0NDR0QNGBhRXltSRBlCRBlURVhGQlJDGV5YGEIYTWJDQGd4TXFCeGQGfF5Qem1eAgQOT3FzcA8HBRheWBlURVhGQlJDGVpeVEVYQVJFRFIZW1hUVltTUkFTUlFWQltDGG9EQlEPYQ9_X1wHfgV8VgRBAGVzGm1fY20HAW98b19GXlJxUEFEWHp-TQMYU1ZDVhhCRURBXGdgQ19fVXNvDg9VUkdnQFpbUnhkA3Ncf2UGflZUb3hSclMPU3lm",
                behaviorModules: ["Door"],
                layers: ["pointer", "walk"],
                shadow: true,
                scale: [0.72, 0.72, 0.72],
            }
        },
        {
            card: {
                name: "start point",
                type: "object",
                translation: [-20.524493842661624, 0.06300000000000061, 22.522668218635697],
                rotation: [0, -1.4990420669195301, 0],
                spawn: "default"
            }
        }
    ];
}
