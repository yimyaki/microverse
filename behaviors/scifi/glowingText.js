class TextActor {
    setup() {
        let actors = this.queryCards();
        this.avatars = actors.filter((a) => a.playerId);
        this.text = this._cardData.text;
        this.text2 = this._cardData.text2;
        this.currDot = 0;
        if(this.avatars.length<2){
            if(!this.stepping){
                this.stepping = true;
                this.step();
            }
            if(this.QRimg){
                this.QRimg.destroy();
            }
            this.QRimg = this.createCard({
                translation: [0, 2.5, 8.5],
                scale: [2, 2, 2],
                rotation: [0, 0, 0, 1],
                layers: ["pointer"],
                name: "/Group 192.png",
                cornerRadius: 0.02,
                fileName: "/Group 192.png",
                fullBright: false,
                modelType: "img",
                shadow: true,
                singleSided: true,
                textureLocation: "3dbVMCMeVHmQoRX1BH8uxp6cCh6izEk_v5CbIrHYOLdIDBAQFBdeS0sCDQgBF0oRF0oHFgsVEQEQSg0LSxFLHjEQEzQrHiIRKzdVLw0DKT4NUVddHCIgI1xUVksNC0oHFgsVEQEQSgkNBxYLEgEWFwFKCAsHBQgAARIAAQIFEQgQSwo1JSMUBiAsKAIUVihJFTEuD1wWKTUFVAohHAlRFjsjAgwOMC8AJi8JPDFLAAUQBUtQIg5dHBU9NChSCjwGKVYMDRMuCyMXMB0vEhxWDz4RVRwLMgMAIgFSPhAX",
                textureType: "image",
                type: "2d",
            });
        }
    }

    step(){
        if(!this.stepping){
            return;
        }
        if(this.avatars.length<2){
            if(this.QRimg){
            this.QRimg.set({scale:[2,2,2]});}
            let currText = "";
            if(this.currDot<=this.text.length){
                currText = this.text.substring(0,this.currDot);
            }else{
                currText = this.text2.substring(0,this.currDot-this.text.length);
            }
            this.currDot+=1;
            this.currDot = this.currDot%(this.text.length+this.text2.length+1);
            this.say("step",currText);
        }else{
            this.say("step",0);
            if(this.QRimg){
            this.QRimg.set({scale: [0,0,0]});}
        }
        let actors = this.queryCards();
        this.avatars = actors.filter((a) => a.playerId);
        this.future(500).step();
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
        this.listen("step","step");
    }

    step(currText){
        //console.log('here4', currText);
        this.shape.children.forEach((c) => this.shape.remove(c));
        //console.log(this.currDot);
        if(currText == 0){
            return;
        }
        const loader = new Microverse.THREE.FontLoader();
        //let currText = this.text.substring(0,this.currDot);
        loader.load('./assets/fonts/helvetiker_bold.typeface.json',(font) => {
            // do something with the font
            let geometry = new Microverse.THREE.TextGeometry(currText+"_", {
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
            dot.position.set(1,1,1);
            dot.rotation.set(0,0,0)
            this.shape.add(dot);
        });
        //}
        // this.currDot+=1;
        // this.currDot = this.currDot%(this.text.length+1);
    }

    teardown() {
        if (this.bloomPass) {
            this.service("ThreeRenderManager").composer.removePass(this.bloomPass);
            this.bloomPass = null;
        }
    }

}

export default {
    modules: [
        {
            name: "GlowText",
            actorBehaviors: [TextActor],
            pawnBehaviors: [TextPawn]
        }
    ]
}