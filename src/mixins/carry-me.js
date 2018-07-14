export default (superclass) => class extends superclass {
    holdMe (target) {
        // drop me since something else is picking me up
        this.dropMe();

        // drop whatever my current target was carrying
        if (target.objectCarried) target.objectCarried.dropMe();

        // setup new target to carry me
        this.carryTarget = target;
        target.objectCarried = this;

        // setup my carry position to be relative to the target
        this.carryRelX = target.x > this.x ? target.x - this.x : this.x - target.x;
        this.carryRelY = target.y > this.y ? target.y - this.y : this.y - target.y;
    }

    dropMe () {
        // my current carry target should know they are carrying me anymore
        if (this.carryTarget && this.carryTarget.objectCarried === this) this.carryTarget.objectCarried = null; 

        // I don't know about my carry target anymore
        this.carryTarget = null;
    }

    // NOTE! anything using this mixins will need to call super.preUpdate so we call this function
    // just this mixin does in case it is embedded in other mixins
    preUpdate (time, delta) {
        if (this.carryTarget) {
            this.setPosition(this.carryTarget.x + this.carryRelX, this.carryTarget.y + this.carryRelY);
        }

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}