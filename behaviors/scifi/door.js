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
        this.pointA = [0,0,0];//[1.2408218526149692, -0.4389610670180847, -7.391705311856144];//[0.7482445787060128, 8.582744231334745, 10.455007034792178];
        this.pointB = [0,4,0];//[1.2408218526149692, 2.4389610670180847, -7.391705311856144];//[0.7482445787060128, 6.298663957567469, 10.455007034792178];
        if (this.ratio === undefined) this.ratio = 0.2;
        this.updatePositionBy(0);
        //this.bars = Array();
        //this.audio = new Audio('./assets/tink.wav');
        
        this.dots = [];
        this.left_button = false;
        this.right_button = false;
        this.middle_line =false;
        this.green = 0x40FF00;
        this.red = 0xFF3020;
        if (!this.checking) {
            this.checking = true;
            this.step();
        }
        this.removeObjects(); // Reset
        this.subscribe("global", "doorLoadComplete","setBool");
        this.subscribe("audio","toggleAudio", this.audioToggle);
        this.audioOn = true;

    }
    audioToggle(){
        this.audioOn = !this.audioOn;
    }

    setBool(data){
        let {scope, isComp} = data;
        if(scope == "left"){
            this.left_button=isComp;
        }
        if(scope == "right"){
            this.right_button=isComp;
        }
        if(scope== "middle"){
            this.middle_line = isComp;
        }
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
            if (Microverse.v3_magnitude(Microverse.v3_sub(a.translation,[-2,2,2.1] )) < 1.4) {  //[28, 0, 28]
                //console.log("found");
                button1 = true;
                
            }
            if (Microverse.v3_magnitude(Microverse.v3_sub(a.translation, [2,2,2.1])) < 1.4) {  //[-28, 0, 28]
                //console.log("found2");
                button2 = true;
                
            }
            if (Microverse.v3_magnitude(Microverse.v3_sub(a.translation, [1,1.5,-10])) < 1.4) {  //[-28, 0, 28]
                //console.log("found2");
                this.publish("global", "atPortal");
                
            }
        });
        if(!button1){
            this.publish("global", "change_color", {scope: 'left', color: this.red, direction: -1});
        }else{
            this.publish("global", "change_color", {scope: 'left', color: this.green, direction: 1});
            if(this.audioOn){this.say("audio");}
        }
        if(!button2){
            this.publish("global", "change_color", {scope: 'right', color: this.red, direction: -1});
        }else{
            this.publish("global", "change_color", {scope: 'right', color: this.green, direction: 1});
            if(this.audioOn){this.say("audio");}
        }
        if (button1 && button2){
                //this.publish("opendoor");
            //if(this.doorOpening)
            //this.updatePositionBy(.01);
            //console.log("pressed");
            if(this.left_button&&this.right_button){
                if(this.middle_line){
                    this.updatePositionBy(.01);
                    this.publish("global", "change_opac", {scope: 'middle_panel', opac: -0.01, direction: 1});
                    if(this.audioOn){this.say("doorAudio");}
                }
                //console.log("pressed");
                this.publish("global", "change_color", {scope: 'middle', color: this.green, direction: 1});
            }
        }else{
            if(this.ratio<1){
                this.publish("global", "change_color", {scope: 'middle', color: this.red, direction: -1});
                this.updatePositionBy(-0.01);
                this.publish("global", "change_opac", {scope: 'middle_panel', opac: 0.01, direction: 1});
            }
        }
        this.future(100).step();
    }

    removeObjects() {
    }

    updatePositionBy(ratio) { // Where The Movement Occurs
        this.ratio += ratio;
        this.ratio = Math.min(1, Math.max(0, this.ratio));
        //let pos = Microverse.v3_lerp(this.pointA, this.pointB, this.ratio);
        //console.log(pos);
        //this.set({translation: pos});//Microverse.v3_lerp(this.pointA, this.pointB, this.ratio)});
        //this.publish("doorLink", "handlePhysics", ratio); // Physics
        if(this.ratio == 1){
            let pos = Microverse.v3_lerp(this.pointA, this.pointB, this.ratio);
            this.set({translation: pos});
            this.pressed();
        }
    }

    pressed() {
        if (this.hasOpened) {return;}
        this.hasOpened = true;
        /*
        this.createCard({
            translation: [0, 1.5, -10],//[0, 9.1, 8],
            rotation: [0, -3.14, 0],
            layers: ["pointer"],
            className: "PortalActor",
            color: 0xFF66CC,
            cornerRadius: 0.05,
            depth: 0.05,
            frameColor: 8947848,
            portalURL: "?world=smallfactory",//portalURL: 'https://croquet.io/test/microverse?world=smallfactory"
            type: "2d",
            width: 1.8,
            height: 2.4,
        });*/

        this.createCard({
                name: "Gallery Card",
                behaviorModules: ["ReplaceWorld", "PortalText"],
                replaceWorldTargetURL: "https://croquet.github.io/gallery",
                TargetURL: "https://croquet.github.io/gallery",
                replaceWorldPreserveOrigin: "//(.*\\.)?croquet.(io|dev)$",
                PreserveOrigin: "//(.*\\.)?croquet.(io|dev)$",
                translation: [-1.3, 1.3, -10],//[0, 9.1, 8],
                rotation: [0, 0, 0],
                layers: ["pointer"],
                scale: [1, 1, 1],
                type: "object",
                text: "Click to Teleport",
                fullBright: true,
                frameColor: 0xcccccc,
                color: 0xffffff,
                cornerRadius: 0.05,
                depth: 0.05,
                shadow: true,
            });
        this.say("portalChanged");
    }
}

class DoorPawn {
    setup() {
        this.removeEventListener("pointerDoubleDown", "onPointerDoubleDown");
        this.addEventListener("pointerDoubleDown", "nop");
        this.audio = new Audio("./assets/audio/mixkit-sci-fi-interface-zoom-890.wav");
        this.doorAudio = new Audio("./assets/audio/mixkit-high-tech-robot-movement-2526.wav");
        this.listen("audio", "playAudio");
        this.listen("doorAudio", "playDoorAudio");
    }

    playAudio() {
        //console.log("audio");
        this.audioOn = this.actor.audioOn;
        if(this.audioOn){this.audio.play();}
    }

    playDoorAudio() {
        this.audioOn = this.actor.audioOn;
        if(this.audioOn){this.doorAudio.play();}
    }
}

class DoorButtonActor { // Buttons Move Door
    setup() {
        this.occupier = undefined;
        //this.listen("publishMove", "publishMove");
        this.listen("pressButton", "pressButton");
        //this.listen("publishFocus", "publishFocus");
        //this.subscribe(this._cardData.myScope, "focus", "focus");
        this.subscribe("global", "change_color","pressButton");
        this.scope = this._cardData.myScope;
        this.level = this._cardData.level;
    }

    // Publish Translation
    // publishMove() {
    //     if (this.occupier !== undefined) { 
    //         this.future(60).publishMove(); 
    //     }
    //     this.publish("door", "updatePositionBy", this._cardData.doorSpeed);
    // }

    // Update Translation
    pressButton(data) {
        let {scope, color, direction} = data;
        //this.translateTo(translation);
        if(this.scope == scope){
            //if(this.level == 2){
            //    this.future(10,"say","updateColor", {color: color, direction: direction});}else{
                this.say("updateColor", {color: color, direction: direction});
            //}
        }
    }

    publishColor(color, direction){
        
    }

    // Publish New Focus
    publishFocus(viewId) {
        //this.publish(this._cardData.myScope, "focus", viewId);
    }  

    // Focus Controlling Player
    focus(viewId) {
        this.occupier = viewId;
    }
}

class DoorButtonPawn {
    setup() {
        //this.shape.children.forEach((c) => this.shape.remove(c));
        //this.shape.children = [];
        if (this.dots) {
            this.dots.forEach((d) => d.removeFromParent());
        }
        let scope = this.actor._cardData.myScope;
        this.red =  0xFF3020;
        this.green = 0x40FF00;
        //this.left_dots = [];
        //this.right_dots = [];
        // if (this.shape.children.length === 0) {
        //     //for i in range....

        //     let geometry = new Microverse.THREE.CircleGeometry(.1,8);
        //     let material = new Microverse.THREE.MeshStandardMaterial({color: this.actor._cardData.color || 0xD86508});
        //     this.obj = new Microverse.THREE.Mesh(geometry, material);
        //     this.shape.add(this.obj);
        // }
        
        let sign = scope=="left"?-1:1;
        let arrLen = scope=="middle"?10:27;
        let angle = Math.PI*5/12;
        let here = [0,0]
        let dotDist = 0.3
        let geometry = new Microverse.THREE.CircleGeometry(.08,8);
        this.dots =   [...Array(arrLen).keys()].map((i) => {
            let material =  new Microverse.THREE.MeshStandardMaterial({color: this.actor._cardData.color || this.red});
            let dot = new Microverse.THREE.Mesh(geometry, material);
            dot.position.set(here[0], 0, here[1]);
            if(i<20){
                here[1]-=dotDist;
            }else{
                here[0]-= dotDist*Math.sin(sign*angle);
                here[1]-= dotDist*Math.cos(sign*angle);
            }
            dot.rotation.set(-Math.PI/2,0,0)
            this.shape.add(dot);
            return dot;
        });

        this.currDot = 0;

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

    updateColor(data) {
        
        let {color, direction} = data;
        let dotArr = this.dots;
        this.dots[this.currDot].material.color.set(color);
        this.currDot += direction;
        this.currDot = Math.max(0, Math.min(this.currDot, this.dots.length - 1));
        let scope = this.actor._cardData.myScope;
        if(scope=="left"){
        //console.log(this.currDot, direction);
            if(this.currDot>28){
                this.publish("global", "change_color", {scope: 'left_panel', color: this.green, direction: 1});
            }else{
                this.publish("global", "change_color", {scope: 'left_panel', color: this.red, direction: 1});
            }
            if(this.currDot== (this.dots.length - 1)){
                this.publish("global", "doorLoadComplete", {scope:"left", isComp:true});
            }
            if(this.currDot== (this.dots.length - 2)){
                this.publish("global", "doorLoadComplete", {scope:"left", isComp:false});
            }
        }
        if(scope=="right"){
            //console.log(this.currDot, direction);
            if(this.currDot>28){
                this.publish("global", "change_color", {scope: 'right_panel', color: this.green, direction: 1});
            }else{
                this.publish("global", "change_color", {scope: 'right_panel', color: this.red, direction: 1});
            }
            if(this.currDot== (this.dots.length - 1)){
                this.publish("global", "doorLoadComplete", {scope:"right", isComp:true});
            }
            if(this.currDot== (this.dots.length - 2)){
                this.publish("global", "doorLoadComplete", {scope:"right", isComp:false});
            }
        }
        if(scope=="middle"){
            if(this.currDot== (this.dots.length - 1)){
                this.publish("global", "change_color", {scope: 'middle_panel', color: this.green, direction: 1});
            }else{
                this.publish("global", "change_color", {scope: 'middle_panel', color: this.red, direction: 1});
            }
            if(this.currDot== (this.dots.length - 1)){
                this.publish("global", "doorLoadComplete", {scope:"middle", isComp:true});
            }
            if(this.currDot== (this.dots.length - 2)){
                this.publish("global", "doorLoadComplete", {scope:"middle", isComp:false});
            }
        }
    }
}

class ButtonLightActor { // Buttons Move Door
    setup() {
        this.occupier = undefined;
        this.listen("pressButton", "pressButton");
        //this.subscribe("global", "change_color","pressButton");
        this.scope = this._cardData.myScope;
        this.level = this._cardData.level;
    }

    pressButton(data) {
        let {scope, color, direction} = data;
        if(this.scope == scope){
            this.say("updateColor", {color: color, direction: direction});
        }
    }
}
class ButtonLightPawn {
    setup() {
        //this.shape.children.forEach((c) => this.shape.remove(c));
        //this.shape.children = [];
        if (this.dots) {
            this.dots.forEach((d) => d.removeFromParent());
        }
        //console.log(this.shape);
        this.color = 0xFF3020;
        this.opacity = 1;
        this.transparent = false;
        this.scope = this.actor._cardData.myScope;
        this.isLoaded = false;
        this.listen("updateColor", "updateColor");

        this.subscribe(this.id, "3dModelLoaded", "modelLoaded");
        this.subscribe("global", "change_color","updateColor");
        this.subscribe("global", "change_opac", "updateTransparent");
    }

    modelLoaded() {
        this.shape.children[0].traverse((mesh) => {
            if (mesh.material) {
                mesh.material.emissive.set(this.color);
                if (this.scope == 'middle_panel'){
                    mesh.material.transparent = this.transparent;
                    mesh.material.opacity = this.opacity;
                }
               //mesh.material.color.set(this.color);
               //mesh.material.emissiveIntensity.set(2);
            }
        });
        this.isLoaded = true;
    }


    updateColor(data) {
        let {scope, color, direction} = data;
        //console.log(this.scope, scope);
        if (this.scope == scope){
            
            this.color = color;
            if(this.isLoaded){
                this.modelLoaded();
            }
        }
        //let {color, direction} = data;
        //this.material.color.set(color);
    }

    updateTransparent(data) {
        let {scope, opac, direction} = data;
        //console.log(this.scope, scope);
        if (this.scope == scope){
            //console.log(opac);
            this.transparent = true;
            this.opacity = Math.min(1,Math.max(this.opacity+opac));
            if(this.isLoaded){
                //this.modelLoaded();
            }
        }
    }
}

class ReplaceWorldPawn {

    get targetURL() { return this.actor._cardData.replaceWorldTargetURL; }
    set targetURL(url) { if (this.targetURL !== url) this.say("setCardData", { replaceWorldTargetURL: url }); }
    get preserveOrigin() { return this.actor._cardData.replaceWorldPreserveOrigin; }

    setup() {
        this.addEventListener("pointerDown", "onPointerDown");
        this.subscribe("global", "atPortal", "onPointerDown");
    }

    onPointerDown() {
        document.body.style.background = "black";
        const canvas = document.getElementById("ThreeCanvas");
        canvas.style.transition = "opacity 1s";
        canvas.style.opacity = 0;
        const targetURL = this.resolveTargetURL();
        setTimeout(() => Microverse.sendToShell("world-replace", { targetURL}), 1000);
    }

    resolveTargetURL() {
        // if targetURL does not have a sessionName or password, we need to resolve it
        // we do this by appending our own sessionName and password to the URL
        debugger;
        const our = new URL(location.href);
        const target = new URL(this.targetURL, our.href);
        const targetSearchParams = target.searchParams;
        const targetHashParams = new URLSearchParams(target.hash.slice(1));
        // if the target has a sessionName or password, we don't need to resolve it
        let sessionName = targetSearchParams.get("q");
        let password = targetHashParams.get("pw");
        if (!sessionName || !password) {
            if (!sessionName) {
                sessionName = our.searchParams.get("q");
                password = '';
                targetSearchParams.set("q", sessionName);
            }
            if (!password) {
                const ourHashParams = new URLSearchParams(our.hash.slice(1));
                password = ourHashParams.get("pw");
                targetHashParams.set("pw", password);
                target.hash = targetHashParams.toString();
            }
        }
        // copy our options to the target
        for (const setting of [ "showSettings", "voiceChat", "broadcastMode" ]) {
            if (our.searchParams.has(setting)) targetSearchParams.set(setting, "true");
        }
        // stay on the origin if we are running there
        if (this.preserveOrigin && new RegExp(this.preserveOrigin).test(our.origin)) {
            // use our own origin as target origin
            target.protocol = our.protocol;
            target.host = our.host;
            // append target path to ours. this is designed to work both on /dev/ and /
            const targetPath = target.pathname.split("/"); // ["", "dir", "to", "target", "x.html"]
            targetPath.shift(); // ["dir", "to", "target", "x.html"]
            const ourPath = our.pathname.split("/"); // ["", "dev", "myapp", "y.html"]
            ourPath.splice(-2); // ["", "dev"]
            ourPath.push(...targetPath); // ["", "dev", "dir", "to", "target", "x.html"]
            target.pathname = ourPath.join("/"); // "/dev/dir/to/target/x.html"
        }
        // return the resolved URL
        return target.href;
    }

}

class TextPawn {
    setup() {

        //this.shape.children.forEach((c) => this.shape.remove(c));
        //this.shape.children = [];
        if (this.left_dots) {
            this.left_dots.forEach((d) => d.removeFromParent());
        }
        this.text = this.actor._cardData.text;
        this.material =  new Microverse.THREE.MeshStandardMaterial({emissive: this.actor._cardData.color || 0xFFFFFF, side: Microverse.THREE.DoubleSide});
        this.material.transparent = true;
        this.material.opacity = 0.27;
        this.currDot = 0;
        this.green = 0x40FF00;
        this.red = 0xFF7300;
        this.upTranslation = this.actor._translation; 
        this.shape.children.forEach((c) => this.shape.remove(c));
        const loader = new Microverse.THREE.FontLoader();
        //let currText = this.text.substring(0,this.currDot);
        loader.load('./assets/fonts/helvetiker_bold.typeface.json',(font) => {
            // do something with the font
            let geometry = new Microverse.THREE.TextGeometry(this.text, {
                font: font,
                size: .2,
                height: .01,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: .01,
                bevelSize: .005,
                bevelOffset: 0,
                bevelSegments: 5
            } );
            let dot = new Microverse.THREE.Mesh(geometry, this.material);
            dot.position.set(0,0,0);
            dot.rotation.set(0,0,0);
            let geometry2 = new Microverse.THREE.CircleGeometry(2,32);
            let dot2 = new Microverse.THREE.Mesh(geometry2, this.material);
            dot2.position.set(1,0,0);
            dot2.rotation.set(0,0,0);
            this.shape.add(dot);
            this.shape.add(dot2);
        });
    }

    teardown() {
        if (this.bloomPass) {
            this.service("ThreeRenderManager").composer.removePass(this.bloomPass);
            this.bloomPass = null;
        }
    }

}

/* Three behavior modules are exported from this file. */

export default {
    modules: [
        {
            name: "Door",
            actorBehaviors: [DoorActor],
            pawnBehaviors: [DoorPawn]
        },
        {
            name: "DoorButton",
            actorBehaviors: [DoorButtonActor],
            pawnBehaviors: [DoorButtonPawn],
        },
        {
            name: "ButtonLight",
            actorBehaviors: [],//ButtonLightActor],
            pawnBehaviors: [ButtonLightPawn],
        },
        {
            name: "ReplaceWorld",
            actorBehaviors: [],
            pawnBehaviors: [ReplaceWorldPawn],
        },
        {
            name: "PortalText",
            actorBehaviors: [],
            pawnBehaviors: [TextPawn],
        }
    ]
}

/* globals Microverse */
/*   let geom = 

this.dots =   [...Array(10).keys()].map((i) => {
   let mat = 
    let dot = new THREE.Mesh(...)
    dot.position.set(x, y, i * blah + foo);
    this.shape.add(dot);
   return dot;
});




changeColor() {
if complete:
  return
if(standing)
  this.dots[3].material.color.set(...)
else(
 this.dots[]
this.future


3:55

/* globals Microverse */