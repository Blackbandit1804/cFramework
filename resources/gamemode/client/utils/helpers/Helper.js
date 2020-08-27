import * as alt from 'alt';
import * as game from 'natives';

var cursorStatus = false;
var controlStatus = true;
const [_, screenWidth, screenHeight] = game.getActiveScreenResolution();
const maxCountLoadTry = 255;;
let hudCallback = null;


export function getSpeed() {
    var ped = alt.Player.local.scriptID;
    let vel = game.getEntityVelocity(ped)
    return Math.sqrt(vel.x * vel.x + vel.y * vel.y + vel.z * vel.z)
}

/*
//wordwrap not implemented
export function drawText(text, xPos, yPos, scale, r, g, b, alpha, font, justify, shadow, outline, wordwrap) {
    const height = 1080.0;
    const ratio = screenWidth / screenHeight;
    const width = height * ratio;
    const x = xPos / width;
    const y = yPos / height;

    game.setTextScale(1.0, scale);
    game.setTextFont(font);
    game.setTextColour(r, g, b, alpha);
    game.setTextJustification(justify);

    if (justify == 2) game.setTextWrap(0.0, x);
    if (shadow)    game.setTextDropshadow(0, 0, 0, 0, 255);
    if (outline)    game.setTextOutline();

    game.beginTextCommandDisplayText("STRING");
    game.addTextComponentSubstringPlayerName(text);

    game.endTextCommandDisplayText(x, y);
}

export function createBlip(x, y, z, sprite, name, color, scale, shortRange){
    let blip = new alt.PointBlip(x, y, z);
    blip.sprite = sprite;
    blip.color = color;
    blip.scale = scale;
    blip.name = name;
    blip.shortRange = shortRange;
};*/

export function drawMarker(type, x, y, z, scale, r, g, b, alpha, bobUpAndDown, seguirCamera, rotate) {
    game.drawMarker(type, x, y, z, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, scale, scale, scale, r, g, b, alpha, bobUpAndDown, seguirCamera, rotate, 0, 0, 0, 0);
};

export function gameControls(value) {
    controlStatus = value;
    alt.toggleGameControls(value);
    return controlStatus;
}

export function toggleCursor() {
    if (cursorStatus) { alt.toggleGameControls(controlStatus); } else { alt.toggleGameControls(!controlStatus) }
    cursorStatus = !cursorStatus;
    alt.showCursor(cursorStatus)
    return cursorStatus;
}
/*
export function ShowMessage(gtaMessage, value){
  game.beginTextCommandDisplayHelp(gtaMessage);
  game.endTextCommandDisplayHelp(0, 0, 1, value);
}

export function drawRect(xPos, yPos, width, height, r, g, b, a) {
    const w = width / screenWidth;
    const h = height / screenHeight;
    const x = xPos / screenWidth + w * 0.5;
    const y = yPos / screenHeight + h * 0.5;

    game.drawRect(x, y, w, h, r, g, b, a);
}

export function getHandleResult(handle){
    let handleResult = game.getShapeTestResult(handle);
    if(handleResult[1] === false){
        return false;
    }
    else{
        let ret = {
            endCoords:handleResult[2],
            surfaceNormal:handleResult[3],
            entityId:handleResult[4],
        };
        return ret;
    }
}

export function getFrontVehicle(){
    let player = getLocalPlayer();
    let pos = player.pos;
    let forward = game.getEntityForwardVector(player.scriptID);
    let handle = game.startShapeTestRay(pos.x,pos.y,pos.z - 0.5,pos.x + forward.x,pos.y + forward.y,pos.z - 0.5, 2,player.scriptID,0);
    let handleRslt = getHandleResult(handle);
    if(handleRslt !== false){
        return handleRslt.entityId;
    }
    return false;
}

export function loadModelAsync(model)
{
  return new Promise((resolve, reject) => {
    if(typeof model === 'string') {
      model = game.getHashKey(model);
    }
  
    if(!game.isModelValid(model))
      return resolve(false);

    if(game.hasModelLoaded(model))
      return resolve(true);

    game.requestModel(model);

    let interval = alt.setInterval(() => {
      if(game.hasModelLoaded(model)) {
        alt.clearInterval(interval);
        return resolve(true);
      }
    }, 0);
  });
}

export async function loadAnim(dict) {
  return new Promise(resolve => {
      game.requestAnimDict(dict);

      let count = 0;
      let inter = alt.setInterval(() => {
          if (count > maxCountLoadTry) {
              alt.clearInterval(inter);
              return;
          }

          if (game.hasAnimDictLoaded(dict)) {
              resolve(true);
              alt.clearInterval(inter);
              return;
          }

          count += 1;
      }, 5);
  });
}
*/
export function toggleAllHud(state = false) {
    if (state && hudCallback !== null) {
        return alt.clearEveryTick(hudCallback);
    }

    hudCallback = alt.everyTick(() => {
        game.hideHudAndRadarThisFrame();
    });

    return true;
}