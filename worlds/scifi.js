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
        "lights.js", "joeTheBox.js", "simpleSpin.js","door.js"//,"openPortal.js"
    ];
    Constants.UseRapier = true;

    // const frameColor = 0x888888;

    Constants.DefaultCards = [
        {
            card: {
                name:"world model",
                type: "3d",
                dataLocation: "./assets/3D/SciFi_test_0.zip",
                dataScale:[2,2,2], //[2,2,2]
                //singleSided: true,
                shadow: true,
                layers: ["walk"],
                translation:[0, -.105, 0],

                placeholder: true,
                placeholderSize: [100, 0.01, 100],
                placeholderColor: 0xcccccc,
                placeholderOffset: [0, 0, 0],
            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                dataLocation: "./assets/sky/starmap_random_2020_4k.exr",
                //rotation:[0,0,Math.PI],
                dataType: "exr",
            }
        },
        // {
        //     card: {
        //         name: "image card",
        //         translation: [0, 0.4, -12],
        //         //rotation: [0, Math.PI / 2, 0],
        //         scale: [4, 4, 4],
        //         type: "2d",
        //         textureType: "image",
        //         textureLocation: "./assets/images/CroquetLogo_RGB.jpg",
        //         fullBright: true,
        //         frameColor: 0xcccccc,
        //         color: 0xbbbbbb,
        //         cornerRadius: 0.05,
        //         depth: 0.05,
        //         shadow: true,
        //     }
        // },
        // {
        //     card: {
        //         name:"dog",
        //         type: "3d",
        //         dataLocation: "./assets/3D/shiba.zip",
        //         //fileName: "/testcube_1m.glb.zip",
        //         layers: ["pointer"],
        //         translation:[0, 0.4, 10],
        //         dataScale:[1,1,1],
        //         shadow: true,
        //     }
        // },
        {
            card: {
                name:"button",
                type: "3d",
                dataLocation: "./assets/3D/SciFi_leftbutton.zip",
                //fileName: "/testcube_1m.glb.zip",
                layers: ["pointer"],
                translation:[0, 0, 0],
                dataScale:[2,2,2],
                shadow: true,
            }
        },
        {
            card: {
                name:"button2",
                type: "3d",
                dataLocation: "./assets/3D/SciFi_rightbutton.zip",
                //fileName: "/testcube_1m.glb.zip",
                layers: ["pointer"],
                translation:[0, 0, 0],
                dataScale:[2,2,2],
                shadow: true,
            }
        },
        {
            card: {
                name: "door",
                //type: "object",
                type: "3d",
                modelType: "glb",
                translation: [0, 0, 0],//[-1.4447057496318962, -5.504611090090481, 30.282952880859376],
                dataLocation: "./assets/3D/SciFi_gate.zip",//"37HFPvPUY4QXMcTPpuY0scmEoR9I1QR5KegrT2iJ-RasX0NDR0QNGBhRXltSRBlCRBlURVhGQlJDGV5YGEIYTWJDQGd4TXFCeGQGfF5Qem1eAgQOT3FzcA8HBRheWBlURVhGQlJDGVpeVEVYQVJFRFIZW1hUVltTUkFTUlFWQltDGG9EQlEPYQ9_X1wHfgV8VgRBAGVzGm1fY20HAW98b19GXlJxUEFEWHp-TQMYU1ZDVhhCRURBXGdgQ19fVXNvDg9VUkdnQFpbUnhkA3Ncf2UGflZUb3hSclMPU3lm",
                behaviorModules: ["Door"],
                layers: ["pointer", "walk"],
                shadow: true,
                scale: [2, 2, 2],
            }
        },
        // {
        //     card: {
        //         name: "portal button",
        //         translation: [0, 0, -28],
        //         rotation: [0, 0, 0],
        //         dataLocation: "3xPWaDNEJokKGvHfdMSKcBW5v43G3vImvojJebDXkFpgEAwMCAtCV1ceERQdC1YNC1YbChcJDR0MVhEXVw1XPxwuGgEUMQs5EykbOiAcSz8AGQ4BDy0zLyEhSlcRF1YbChcJDR0MVhURGwoXDh0KCx1XHxs3SxMtTyIdVQgsHQ8ZHh0xHD4eNAISMTBKIBoANT4hLStNCkkIPj4PLVccGQwZVzwiDR00C08VDB8sLhMRNCdADEBLH0gzDh07Gi4qF0k-Pw0zFhFIKi8vTyk",
        //         modelType: "glb",
        //         dataScale: [1.2, 1.2, 1.2],
        //         behaviorModules: ["OpenArtGalleryPortalButton"],
        //         type: "3d",
        //     }
        // },
        {
            card: {
                name: "floor circle left",
                type: "object",
                translation: [-1.7, .1, -4], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["DoorButton"],
                shadow: true,
                myScope: "left",
            }
        },
        {
            card: {
                name: "floor circle left",
                type: "object",
                translation: [-1.7, .1, -6], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, Math.PI/3, 0],
                behaviorModules: ["DoorButton"],
                shadow: true,
                myScope: "left",
            }
        },
        {
            card: {
                name: "floor circle right",
                type: "object",
                translation: [1.7, .1, -4], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["DoorButton"],
                shadow: true,
                myScope: "right",
            }
        },
        {
            card: {
                name: "floor circle middle",
                type: "object",
                translation: [0, .1, -8], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["DoorButton"],
                shadow: true,
                myScope: "middle",
            }
        },
        {
            card: {
                name: "start point",
                type: "object",
                translation: [0,1.7,9],//[-20.524493842661624, 0.06300000000000061, 22.522668218635697],
                rotation: [0,0,0],//[0, -1.4990420669195301, 0],
                spawn: "default"
            }
        }
    ];
}
