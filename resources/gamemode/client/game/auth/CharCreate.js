import * as alt from 'alt'
import * as game from 'natives';
import Browser from '../../utils/classes/Browser'

var CharCreate = new Browser('char_create')
var groundCam = null;
var fixedCam = null;
var tempCam = null;

var CharCreate_Camera = [{
    name: "Parentes",
    x: 0.0,
    y: -0.8,
    z: 0.6,
}, {
    name: "Olhos",
    x: 0.0,
    y: -0.4,
    z: 0.65,
}, {
    name: "Nariz",
    x: 0.0,
    y: -0.4,
    z: 0.65,
}, {
    name: "Queixo",
    x: 0.0,
    y: -0.4,
    z: 0.65,
}, {
    name: "Bochecha",
    x: 0.0,
    y: -0.4,
    z: 0.65,
}, {
    name: "Boca",
    x: 0.0,
    y: -0.4,
    z: 0.65,
}, {
    name: "Pescoço",
    x: 0.0,
    y: -0.4,
    z: 0.6,
}, {
    name: "Marcas",
    x: 0.0,
    y: -0.4,
    z: 0.6,
}, {
    name: "Cabelo",
    x: 0.0,
    y: -0.4,
    z: 0.7,
}, {
    name: "Barba",
    x: 0.0,
    y: -0.4,
    z: 0.6,
}, {
    name: "Maquiagem",
    x: 0.0,
    y: -0.4,
    z: 0.6,
}, {
    name: "Velhice",
    x: 0.0,
    y: -0.4,
    z: 0.6,
}, {
    name: "Torso",
    x: 0.0,
    y: -1.6,
    z: 0.3,
}, {
    name: "Corpo",
    x: 0.0,
    y: -0.4,
    z: 0.3,
}, {
    name: "Jaqueta",
    x: 0.0,
    y: -1.0,
    z: 0.3,
}, {
    name: "Camisa",
    x: 0.0,
    y: -1.0,
    z: 0.3,
}, {
    name: "Calça",
    x: 0.0,
    y: -0.8,
    z: -0.4,
}, {
    name: "Acessórios",
    x: 0.0,
    y: -1.0,
    z: 0.3,
}, {
    name: "Sapato",
    x: 0.0,
    y: -0.8,
    z: -0.7,
}, ]


alt.onServer('client/create/startCreate', async() => {
    var ped = alt.Player.local.scriptID;
    game.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
    game.setPedHeadOverlay(alt.Player.local.scriptID, 2, 1, 1);
    game.freezeEntityPosition(ped, true);
    game.setEntityHeading(ped, 200.0);
    game.setPedDefaultComponentVariation(ped);
    alt.toggleGameControls(false);
    createCamera();
    alt.setTimeout(() => {
        game.destroyCam(groundCam)
        CharCreate.create();
        CharCreate.setFocus();
        CharCreate.receive('client/browser/emitServer', (event, ...args) => {
            alt.emitServer(event, ...args);
        });
        CharCreate.receive('client/char_create/changeCamera', async(camera) => {
            interpCamera(camera)
        })
        CharCreate.receive('client/char_create/changes', async(changing, ...args) => {
            var ped = alt.Player.local.scriptID;
            var opts = args[0];
            switch (changing) {
                case "Parentes":
                    game.setPedHeadBlendData(ped, parseInt(opts[2].value), parseInt(opts[0].value), 0.0, parseInt(opts[3].value), parseInt(opts[1].value), 0.0, parseFloat(opts[4].value), parseFloat(opts[5].value), 0.0, false)
                    break;
                case "Olhos":
                    game.setPedFaceFeature(ped, 11, opts[0].value)
                    game.setPedEyeColor(ped, opts[1].value)
                    if (opts[2].value == 0) { game.setPedHeadOverlay(ped, 2, 255) }
                    game.setPedHeadOverlay(ped, 2, opts[2].value, opts[3].value)
                    game.setPedHeadOverlayColor(ped, 2, 1, opts[4].value, opts[4].value)
                    game.setPedFaceFeature(ped, 6, opts[5].value)
                    game.setPedFaceFeature(ped, 7, opts[6].value);
                    break
                case "Nariz":
                    for (let i = 0; i < 6; i++) {
                        game.setPedFaceFeature(ped, i, opts[i].value);
                    }
                    break;
                case "Queixo":
                    game.setPedFaceFeature(ped, 15, opts[0].value);
                    game.setPedFaceFeature(ped, 16, opts[1].value);
                    game.setPedFaceFeature(ped, 17, opts[2].value);
                    game.setPedFaceFeature(ped, 18, opts[3].value);
                    game.setPedFaceFeature(ped, 13, opts[4].value);
                    game.setPedFaceFeature(ped, 14, opts[5].value);
                    break;
                case "Bochecha":
                    game.setPedFaceFeature(ped, 8, opts[0].value);
                    game.setPedFaceFeature(ped, 9, opts[1].value);
                    game.setPedFaceFeature(ped, 10, opts[2].value);
                    break;
                case "Boca":
                    game.setPedFaceFeature(ped, 12, opts[0].value)
                    break;
                case "Pescoço":
                    game.setPedFaceFeature(ped, 19, opts[0].value)
                    break;
            }
        })
        CharCreate.receive('client/char_create/changes2', async(changing, ...args) => {
            var ped = alt.Player.local.scriptID;
            var opts = args[0]
            switch (changing) {
                case "Marcas":
                    game.setPedHeadOverlay(ped, 6, opts[0].value, 0.99)
                    game.setPedHeadOverlay(ped, 7, opts[1].value, 0.99)
                    game.setPedHeadOverlay(ped, 9, opts[2].value, 0.99)
                    break;
                case "Cabelo":
                    game.setPedComponentVariation(ped, 2, opts[0].value, 0, 0)
                    game.setPedHairColor(ped, opts[1].value, opts[2].value)
                    break;
                case "Barba":
                    game.setPedHeadOverlay(ped, 1, opts[0].value, 0.99)
                    game.setPedHeadOverlayColor(ped, 1, 1, opts[1].value, opts[1].value)
                    break;
                case "Maquiagem":
                    game.setPedHeadOverlay(ped, 5, opts[0].value, 0.99)
                    game.setPedHeadOverlayColor(ped, 5, 2, opts[1].value, opts[1].value)
                    game.setPedHeadOverlay(ped, 8, opts[2].value, 0.99)
                    game.setPedHeadOverlayColor(ped, 8, 2, opts[3].value, opts[3].value)
                    game.setPedHeadOverlay(ped, 4, opts[4].value, 0.99)
                    game.setPedHeadOverlayColor(ped, 4, 0, 0, 0)
                    break;
                case "Velhice":
                    game.setPedHeadOverlay(ped, 3, opts[0].value, opts[1].value)
                    game.setPedHeadOverlayColor(ped, 3, 0, 0, 0)
                    break;
                case "Torso":
                    game.setPedHeadOverlay(ped, 10, opts[0].value, 0.99)
                    game.setPedHeadOverlayColor(ped, 10, 1, opts[1].value, opts[1].value)
                    game.setPedComponentVariation(ped, 11, -1, 0, 2)
                    break;
                case "Corpo":
                    game.setPedHeadOverlay(ped, 11, opts[0].value, 0.99)
                    game.setPedHeadOverlayColor(ped, 11, 0, 0, 0)
                    game.setPedHeadOverlay(ped, 12, opts[1].value, 0.99)
                    game.setPedHeadOverlayColor(ped, 12, 0, 0, 0)
                    game.setPedComponentVariation(ped, 11, -1, 0, 2)
                    break;
            }
        })
        CharCreate.receive('client/char_create/changes3', async(changing, ...args) => {
            var ped = alt.Player.local.scriptID;
            var opts = args[0]
            switch (changing) {
                case "Jaqueta":
                    game.setPedComponentVariation(ped, 11, opts[0].value, opts[1].value, opts[1].value)
                    break;
                case "Camisa":
                    game.setPedComponentVariation(ped, 8, opts[0].value, opts[1].value, opts[1].value)
                    break;
                case "Torso":
                    game.setPedComponentVariation(ped, 3, opts[0].value, opts[1].value, opts[1].value)
                    break;
                case "Calça":
                    game.setPedComponentVariation(ped, 4, opts[0].value, opts[1].value, opts[1].value)
                    break;
                case "Sapato":
                    game.setPedComponentVariation(ped, 6, opts[0].value, opts[1].value, opts[1].value)
                    break;
                case "Acessorio":
                    game.setPedComponentVariation(ped, 7, opts[0].value, opts[1].value, opts[1].value)
                    break;
            }
        })
        CharCreate.receive('client/char_create/finish_creator', async(...args) => {
            CharCreate.destroyBrowser();
            alt.emitServer('server/game/auth/Character/finish_creator', ...args)
        })
    }, 4000)
})

alt.onServer('client/char_create/destroyAll', async() => {
    var ped = alt.Player.local.scriptID;
    game.renderScriptCams(false, false, 1, false, false)
    game.clearPedTasksImmediately(ped);
    game.destroyAllCams(true);
    alt.emitServer('server/auth/success')
})

alt.onServer('client/create/fixGender', () => {
    game.freezeEntityPosition(alt.Player.local.scriptID, true);
    game.setEntityHeading(alt.Player.local.scriptID, 200.0);
    game.setPedDefaultComponentVariation(alt.Player.local.scriptID);
    game.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
    game.setPedHeadOverlay(alt.Player.local.scriptID, 2, 1, 1);
})

function createCamera() {
    var ped = alt.Player.local.scriptID;
    groundCam = game.createCam("DEFAULT_SCRIPTED_CAMERA")
    game.attachCamToEntity(groundCam, ped, 0.5, -1.6, 0.0)
    game.setCamRot(groundCam, 0, 0.0, 0.0)
    game.setCamActive(groundCam, true)
    game.renderScriptCams(true, false, 1, true, true)
    fixedCam = game.createCam("DEFAULT_SCRIPTED_CAMERA")
    game.attachCamToEntity(fixedCam, ped, 0.5, -1.6, 0.8)
    game.setCamRot(fixedCam, -20.0, 0, 15.0)
    game.setCamActive(fixedCam, true)
    game.setCamActiveWithInterp(fixedCam, groundCam, 3900, true, true)
}

function interpCamera(cameraName) {
    var ped = alt.Player.local.scriptID;
    for (let i = 0; i < CharCreate_Camera.length; i++) {
        if (CharCreate_Camera[i].name == cameraName) {
            game.setCamActiveWithInterp(fixedCam, tempCam, 1200, true, true)
            tempCam = game.createCam("DEFAULT_SCRIPTED_CAMERA")
            game.attachCamToEntity(tempCam, ped, CharCreate_Camera[i].x, CharCreate_Camera[i].y, CharCreate_Camera[i].z)
            game.setCamActive(tempCam, true)
            game.setCamActiveWithInterp(tempCam, fixedCam, 1200, true, true)
        }
    }
}