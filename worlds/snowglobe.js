// Copyright 2022 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"
    ];

    Constants.UserBehaviorDirectory = "behaviors/snowglobe";
    Constants.UserBehaviorModules = [
        "demo.js" ,"carrot.js","lights.js", "bouncingBall.js", "tutorial.js", "snowball.js", "openPortal.js", "urlLink.js", "cradle.js", // "pendulum.js"
    ];

    const frameColor = 0x888888;

    Constants.DefaultCards = [
        {
            card: {
                name: "start point",
                type: "object",
                translation: [0,7.5,-2],
                rotation: [0,-Math.PI/2,0],
                spawn: "default"
                //todo:this.lookTo(-0.3, 0, [0, 0, 0])
            }
        },
        {
            card: {
                name:"world model",
                type: "3d",
                fileName: "/memories_globe.zip",
                dataLocation: "./assets/3D/memories_globe.zip",
                singleSided: false,
                shadow: true,
                layers: ["walk"],
                translation:[0, -31.7, 0],
                dataScale:[5,5,5],

                placeholder: true,
                placeholderSize: [400, 0.1, 400],
                placeholderColor: 0x808080,
                placeholderOffset: [0, 0, 0],
            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                fileName: "/snowy_field_4k.exr",
                dataLocation: "./assets/sky/snowy_field_4k.exr",
                dataType: "exr",
            }
        },
        {
            card: {
                name: "sign",
                translation: [10, 3, -2],
                // rotation: [0, 0, 0, 1],
                layers: ["pointer"],
                behaviorModules: ["Billboard"],
                type: "3d",
                dataLocation: "./assets/3D/wooden_sign_-_low_poly.zip",
                dataScale: [.01, .01, .01],
                //modelType: "glb",
                shadow: true,
                singleSided: true,
            }
        },
        {
            card: {
                name: "Dust",
                type: "object",
                translation: [10, 5, 0],//-1], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["TutorialGif"],
                shadow: true,
                myScope: "left",
                level: 1,
                dataScale: [2, 2, 2],
                //singleSided:false,

            }
        },
        {
            card: {
                name: "snowball",
                type: "object",
                translation: [12, 5, 0],//-1], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["Snowball"],
                shadow: true,
                myScope: "left",
                level: 1,
                dataScale: [1, 1, 1],
                //singleSided:false,

            }
        },
        {
            card: {
                name: "snowball",
                type: "object",
                translation: [12, 5, -3],//-1], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["Snowball"],
                shadow: true,
                myScope: "left",
                level: 1,
                dataScale: [1, 1, 1],
                //singleSided:false,

            }
        },
        {
            card: {
                name: "snowball",
                type: "object",
                translation: [12, 5, 3],//-1], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["Snowball"],
                shadow: true,
                myScope: "left",
                level: 1,
                dataScale: [.5, .5, .5],
                //singleSided:false,

            }
        },
        {
            card: {
                name: "carrot",
                type: "3d",
                dataLocation: "./assets/3D/carrot.zip",
                dataTranslation: [1,0,0],
                translation: [10, 5, 3],//-1], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["Carrot"],
                shadow: true,
                myScope: "left",
                level: 1,
                dataScale: [.02, .02, .02],
                //singleSided:false,

            }
        },
        {
            card: {
                name: "stick",
                type: "3d",
                dataLocation: "./assets/3D/stick.zip",
                translation: [10, 5, 3],//-1], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["Carrot"],
                shadow: true,
                myScope: "left",
                level: 1,
                dataScale: [.05, .05, .05],
                //singleSided:false,

            }
        },
        {
            card: {
                name: "stick",
                type: "3d",
                dataLocation: "./assets/3D/stick.zip",
                translation: [10, 5, 2],//-1], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["Carrot"],
                shadow: true,
                myScope: "left",
                level: 1,
                dataScale: [.05, .05, .05],
                //singleSided:false,

            }
        },
        /*
        {
            card: {
                name:"pendulum",
                type: "object",
                translation: [-0.03701975732147922, 3.2368919013826734, 8.444841625884546],
                behaviorModules: ["Rapier", "Pendulum"],
                layers: ["pointer"],
                scale: [0.2, 0.2, 0.2],
                color: 0xaa6666,
            }
        },
        {
            card: {
                name: "cradle",
                type: "object",
                translation: [-9.67915341742099, 3.2368919013826734, 4.368801765942323],
                behaviorModules: ["Cradle"],
                layers: ["pointer"],
                shadow: true,
                scale: [0.2, 0.2, 0.2],
            }
        },*/
    ];
}
