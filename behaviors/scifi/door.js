/*

    Important Note: When changing the height or width of the links and joints,
    you must account for many things. This includes the collider, the translations
    of the links, the impulse joint creation, and the actual size of the material. 
    Some of these need to be doubled and others need to be halved or even fourthed,
    so look into the documentation to help figure it out. I've provided some comments
    below to help assist you in changing these values. Also, the code is somewhat
    modified for two connections, so see previous commits for the one connection code.
    
    (cd = Microverse.RAPIER.ColliderDesc.ball(0.85))
    (let translation = [0, 34.135389925172704 - i * 2, 0])
    (card.call("Rapier$RapierActor", "createImpulseJoint", "ball" ...))
    (let s = [0.1, 2.3])

*/

class DoorActor {
    setup() { // Start With Logic, Continue With Physics Implementation
        this.ratio = 0;
        this.pointA = [0.7482445787060128, 8.582744231334745, 10.455007034792178];
        this.pointB = [0.7482445787060128, 6.298663957567469, 10.455007034792178];
        if (this.ratio === undefined) this.ratio = 0.2;
        this.updatePositionBy(0);
        console.log("foo3");
        // this.doorBase = this.createCard({ // Create Base
        //     name: "doorBase",
        //     translation: [0, 0, 0],
        //     scale: [0.9, 0.9, 0.9],
        //     dataScale: [3.384158349075, 3.384158349075, 3.384158349075],
        //     parent: this,
        //     modelType: "glb",
        //     //dataLocation: "37HFPvPUY4QXMcTPpuY0scmEoR9I1QR5KegrT2iJ-RasX0NDR0QNGBhRXltSRBlCRBlURVhGQlJDGV5YGEIYTWJDQGd4TXFCeGQGfF5Qem1eAgQOT3FzcA8HBRheWBlURVhGQlJDGVpeVEVYQVJFRFIZW1hUVltTUkFTUlFWQltDGG9EQlEPYQ9_X1wHfgV8VgRBAGVzGm1fY20HAW98b19GXlJxUEFEWHp-TQMYU1ZDVhhCRURBXGdgQ19fVXNvDg9VUkdnQFpbUnhkA3Ncf2UGflZUb3hSclMPU3lm",
        //     //dataLocation: "35H7xJVLhQNFxNMt5HZigey3PXGNeREIgL3fy_PNJaOsXUFBRUYPGhpTXFlQRhtARhtWR1pEQFBBG1xaGkAadm19f1NxelhAfFNccGxaWntsQmVjTHpXXgVTBxpWWlgbUE1UWEVZUBtBR1BDWkcbWExYXFZHWkNQR0ZQGmABZQcHckV0cnJDXlRReGB3B3JMam0DeUwEGGENWgNhZAxaB1NgWUB0B2waUVRBVBpDQGJqeEV7ZmNQc2JZAWIHAndQVEZ8fURQY0NlBmp_UAd-DH9FZXRXUkRC",
        //     doorHandlesEvent: true,
        //     noSave: true,
        //     shadow: true,
        //     type: "3d",
        // });
        if (!this.checking) {
            this.checking = true;
            this.step();
        }
        this.removeObjects(); // Reset

    }

    step() {
        if (!this.checking) {return;}
        let actors = this.queryCards();
        let avatars = actors.filter((a) => a.playerId);
        //let triggers = actors.filter((a) => a..);
        let button1 = false;
        let button2 = false;
        avatars.forEach((a) => {
            //console.log(Microverse.v3_magnitude(Microverse.v3_sub(a.translation, [-14, 0, 14])));
             if (Microverse.v3_magnitude(Microverse.v3_sub(a.translation, [28, 0, 28])) < 3) {
                console.log("found");
                 button1 = true;
            }
            if (Microverse.v3_magnitude(Microverse.v3_sub(a.translation, [-28, 0, 28])) < 3) {
                console.log("found2");
                button2 = true;
            }
        });
        if (button1 && button2){
                 //this.publish("opendoor");
                 this.updatePositionBy(.01);
                 console.log("pressed");
        }
        this.future(100).step();
    }

    removeObjects() {
    }

    updatePositionBy(ratio) { // Where The Movement Occurs
        this.ratio += ratio;
        this.ratio = Math.min(1, Math.max(0, this.ratio));
        let pos = Microverse.v3_lerp(this.pointA, this.pointB, this.ratio);
        console.log(pos);
        this.set({translation: pos});//Microverse.v3_lerp(this.pointA, this.pointB, this.ratio)});
        //this.publish("doorLink", "handlePhysics", ratio); // Physics
    }
}

class DoorPawn {
    setup() {

        this.removeEventListener("pointerDoubleDown", "onPointerDoubleDown");
        this.addEventListener("pointerDoubleDown", "nop");
    }
}
/*
class DoorButtonActor { // Buttons Move Door
    setup() {
        this.occupier = undefined;
        this.listen("publishMove", "publishMove");
        this.listen("pressButton", "pressButton");
        this.listen("publishFocus", "publishFocus");
        this.subscribe(this._cardData.myScope, "focus", "focus");
    }

    // Publish Translation
    publishMove() {
        if (this.occupier !== undefined) { 
            this.future(60).publishMove(); 
        }
        this.publish("door", "updatePositionBy", this._cardData.doorSpeed);
    }

    // Update Translation
    pressButton(data) {
        let {translation, color} = data;
        this.translateTo(translation);
        this.say("updateColor", color);
    }

    // Publish New Focus
    publishFocus(viewId) {
        this.publish(this._cardData.myScope, "focus", viewId);
    }  

    // Focus Controlling Player
    focus(viewId) {
        this.occupier = viewId;
    }
}
*/
/*
class DoorButtonPawn {
    setup() {
        this.shape.children.forEach((c) => this.shape.remove(c));
        this.shape.children = [];

        if (this.shape.children.length === 0) {

            let shape = new Microverse.THREE.Shape();
            shape.moveTo(0, 0);
            shape.lineTo(-0.08, 0); // Start of First Curve
            shape.quadraticCurveTo(-0.1, 0, -0.1, 0.025); // End of First Curve
            shape.lineTo(-0.1, 0.2);
            shape.quadraticCurveTo(-0.1, 0.25, -0.125, 0.25);
            shape.lineTo(-0.15, 0.25);
            shape.quadraticCurveTo(-0.25, 0.25, -0.15, 0.35);
            shape.lineTo(-0.05, 0.45);
            shape.quadraticCurveTo(0, 0.5, 0.05, 0.45);
            shape.lineTo(0.15, 0.35);
            shape.quadraticCurveTo(0.25, 0.25, 0.15, 0.25);
            shape.lineTo(0.125, 0.25);
            shape.quadraticCurveTo(0.1, 0.25, 0.1, 0.2);
            shape.lineTo(0.1, 0.025);
            shape.quadraticCurveTo(0.1, 0, 0.08, 0); 
            shape.lineTo(0, 0);

            let extrudeSettings = {
                bevelEnabled: true,
                bevelThickness: 0,
                bevelSize: 0,
                bevelOffset: 0,
                bevelSegments: 0,
                depth: 0.15,
                steps: 5,
            }

            let geometry = new Microverse.THREE.ExtrudeGeometry(shape, extrudeSettings);
            let material = new Microverse.THREE.MeshStandardMaterial({color: this.actor._cardData.color || 0xD86508});
            this.obj = new Microverse.THREE.Mesh(geometry, material);
            this.obj.castShadow = this.actor._cardData.shadow;
            this.obj.receiveShadow = this.actor._cardData.shadow;
            this.shape.add(this.obj);

            // let geometryB = new Microverse.THREE.BoxGeometry(0.2, 0.25, 0.2);
            // let geometryT = new Microverse.THREE.BoxGeometry(0.2, 0.2, 0.2);
            // let material = new Microverse.THREE.MeshStandardMaterial({color: this.actor._cardData.color || 0xD86508});

            // this.objB = new Microverse.THREE.Mesh(geometryB, material);
            // this.objT = new Microverse.THREE.Mesh(geometryT, material);

            // if (this.actor._cardData.doorSpeed > 0) { this.objT.translateY(0.1); }
            // else { this.objT.translateY(-0.1); } 
            // this.objT.rotation.z = Math.PI / 4;

            // this.objB.castShadow = this.actor._cardData.shadow;
            // this.objB.receiveShadow = this.actor._cardData.shadow;
            // this.shape.add(this.objB);

            // this.objT.castShadow = this.actor._cardData.shadow;
            // this.objT.receiveShadow = this.actor._cardData.shadow;
            // this.shape.add(this.objT);
        }

        this.addEventListener("pointerDown", "start");
        this.addEventListener("pointerUp", "stop");
        this.listen("updateColor", "updateColor");

        this.upTranslation = this.actor._translation; // Storing Current and Pressed Translations (Avoids Errors)
        this.downTranslation = [this.actor._translation[0], this.actor._translation[1], this.actor._translation[2] - 0.1];
    }

    start() {
        if (this.actor.occupier === undefined) {
            this.say("pressButton", {translation: this.downTranslation, color: 0x313333});
            this.say("publishFocus", this.viewId);
            this.say("publishMove");
        }
    }

    stop() {
        if (this.actor.occupier === this.viewId) {
            this.say("pressButton", {translation: this.upTranslation, color: 0xD86508});
            this.say("publishFocus", undefined);
        }
    }

    updateColor(color) {
        this.obj.material.color.set(color);
    }
}*/

/* Three behavior modules are exported from this file. */

export default {
    modules: [
        {
            name: "Door",
            actorBehaviors: [DoorActor],
            pawnBehaviors: [DoorPawn]
        },
        // {
        //     name: "DoorButton",
        //     actorBehaviors: [DoorButtonActor],
        //     pawnBehaviors: [DoorButtonPawn],
        // }
    ]
}

/* globals Microverse */
