import * as game from 'natives';
import * as alt from 'alt';
import scenes from '../../config/AuthScenes';
import { toggleAllHud } from '../helpers/Helper';
import Camera from './Camera';

export default class Scene {
    constructor() {
        this.player = alt.Player;
        this.cameras = {};
        this.scene = scenes;
    }

    setup(name) {
        toggleAllHud(false);
        game.triggerScreenblurFadeIn(200);
        game.setEntityCoords(
            this.player.scriptID,
            this.scene[name].startCamera[0] - 20,
            this.scene[name].startCamera[1] - 20,
            this.scene[name].startCamera[2] - 20,
            1,
            0,
            0,
            0,
        );

        this.cameras.start = new Camera(
            this.scene[name].startCamera, [0, 0, this.scene[name].direction[0]],
            this.scene[name].fov,
            'DEFAULT_SCRIPTED_CAMERA',
            true,
        );
        this.cameras.end = new Camera(
            this.scene[name].endCamera, [0, 0, this.scene[name].direction[1]],
            this.scene[name].fov,
            'DEFAULT_SCRIPTED_CAMERA',
        );

        this.cameras.select = new Camera(
            [this.scene[name].selectionPosition[0] - 3, this.scene[name].selectionPosition[1], this.scene[name].selectionPosition[2] + 0.3], [0, 0, this.scene[name].direction[1]],
            50,
            'DEFAULT_SCRIPTED_CAMERA',
        );

        this.cameras.start.interpolateToCamera(
            this.cameras.end,
            this.scene[name].transitionTime,
            1,
            1,
            true,
            this.player.scriptID,
        );
    }

    setSelectionView(entity, name, ms = 2000) {
        this.cameras.start.interpolateToCamera(
            this.cameras.select,
            2000,
        );
        this.cameras.start.stopFollow();
        game.triggerScreenblurFadeOut(ms);

        game.setEntityCoords(entity.scriptID, this.scene[name].selectionPosition[0] - 5, this.scene[name].selectionPosition[1] - 5, this.scene[name].selectionPosition[2] - 5, 0, 0, 0, true);
        game.setEntityHeading(entity.scriptID, 90);
        const interval = alt.setInterval(() => {
            game.pointCamAtPedBone(this.cameras.select.handle, entity.scriptID, 0, 0, 0, 0, true);
        }, 1);
        alt.setTimeout(() => {
            alt.clearInterval(interval);
        }, 2000);
        game.pointCamAtPedBone(this.cameras.select.handle, entity.scriptID, 0, 0, 0, 0, true);
    }

    destroy() {
        game.triggerScreenblurFadeOut(0);
        toggleAllHud(true);

        Object.entries(this.cameras).forEach(([key, value]) => {
            value.destroy(true);
        });
    }
}