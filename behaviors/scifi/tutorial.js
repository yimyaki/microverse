class TutorialGifPawn {
    setup() {

        //this.shape.children.forEach((c) => this.shape.remove(c));
        //this.shape.children = [];
        if (this.left_dots) {
            this.left_dots.forEach((d) => d.removeFromParent());
        }
        let scope = this.actor._cardData.myScope;
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
        let arrLen = scope=="middle"?5:10;
        let angle = Math.PI*4/12;
        let here = [0,0]
        let dotDist = 0.3
        let geometry = new Microverse.THREE.RingGeometry(.08,.1,32);
        this.left_dots =   [...Array(arrLen).keys()].map((i) => {
            let material =  new Microverse.THREE.MeshStandardMaterial({emissive: this.actor._cardData.color || 0xFF7300, side: Microverse.THREE.DoubleSide});
            let dot = new Microverse.THREE.Mesh(geometry, material);
            dot.position.set(here[0], here[1], 0);
            if(i<5){
                here[1]+=dotDist;
            }else{
                here[0]+= dotDist*Math.sin(sign*angle);
                here[1]+= dotDist*Math.cos(sign*angle);
            }
            dot.rotation.set(0,0,0)
            this.shape.add(dot);
            return dot;
        });

        this.currDot = 0;
        this.green = 0x40FF00;
        this.red = 0xFF7300;

        //this.listen("updateColor", "updateColor");

        this.upTranslation = this.actor._translation; // Storing Current and Pressed Translations (Avoids Errors)
        //this.downTranslation = [this.actor._translation[0], this.actor._translation[1], this.actor._translation[2] - 0.1];
        if(!this.stepping){
            this.stepping = true;
            this.step();
        }
    }

    step(){
        if(!this.stepping){
            return;
        }
        //console.log("something", this.currDot);
        if(this.currDot == 0){
            console.log("okok");
            this.left_dots.forEach((d)=>{
                d.material.emissive.set(this.red);
                //console.log(":)");
            });
        }
        //console.log(this.currDot);
        this.left_dots[this.currDot].material.emissive.set(this.green);
        this.currDot+=1;
        this.currDot = this.currDot%this.left_dots.length;
        this.future(400).step();
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
            name: "TutorialGif",
            actorBehaviors: [],
            pawnBehaviors: [TutorialGifPawn]
        }
    ]
}