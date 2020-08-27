import * as game from 'natives';
import alt from 'alt';
export default class Camera {
    constructor(position, rotation, fov, name = '', active = false) {
        this.position = position;
        this.rotation = rotation;
        this.fov = fov;
        this.follow = false;

        this.handle = game.createCam(name, true);

        game.setCamCoord(this.handle, this.position[0], this.position[1], this.position[2]);
        game.setCamRot(this.handle, this.rotation[0], this.rotation[1], this.rotation[2], 2);
        game.setCamFov(this.handle, this.fov);

        if (active) this.setActive();
    }

    setActive(transitionTime = 0) {
        game.renderScriptCams(true, true, transitionTime, false, false, 0);
        game.setCamActive(this.handle, true);
    }

    interpolateToCamera(camera, duration, easeLocation = 1, easeRotation = 1, follow = false) {
        if (follow) {
            this.follow = alt.setInterval(() => {
                const pos = game.getCamCoord(this.handle);

                game.setEntityCoords(alt.Player.local.scriptID, pos.x, pos.y, pos.z, 0, 0, 0, false);
            }, 1000);
        }
        game.setCamActiveWithInterp(camera.handle, this.handle, duration, easeLocation, easeRotation);
    }

    attachCamera(ped, x, y, z) {
        if (this.handle) {
            game.attachCamToEntity(this.handle, ped, x, y, z)
        }
    }

    stopFollow() {
        if (this.follow) alt.clearInterval(this.follow);
    }

    async creatorCamera() {
        var ped = alt.Player.local.scriptID;
        var groundCam = game.createCam("DEFAULT_SCRIPTED_CAMERA")
        game.attachCamToEntity(groundCam, ped, 0.5, -1.6, 0.0)
        game.setCamRot(groundCam, 0, 0.0, 0.0)
        game.setCamActive(groundCam, true)
        game.renderScriptCams(true, false, 1, true, true)
        var fixedCam = game.createCam("DEFAULT_SCRIPTED_CAMERA")
        game.attachCamToEntity(fixedCam, ped, 0.5, -1.6, 0.8)
        game.setCamRot(fixedCam, -20.0, 0, 15.0)
        game.setCamActive(fixedCam, true)
        game.setCamActiveWithInterp(fixedCam, groundCam, 3900, true, true)
        alt.setTimeout(() => {
            game.destroyCam(groundCam)
        }, 3900)
    }

    destroy(clear) {
        if (this.follow) {
            alt.clearInterval(this.follow);
        }
        if (clear) {
            game.renderScriptCams(false, false, 0, false, false, 0);
        }
        game.destroyCam(this.handle, false);
    }
}