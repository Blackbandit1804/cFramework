import * as alt from 'alt';
import * as game from 'natives';

let Clothes_Components = { jacket: 11, shirt: 8, torso: 3, legs: 4, shoes: 6, acessory: 7 }
    // Appearence
let Nose_Components = { nWidth: 0, nHeight: 1, nLength: 2, nBridge: 3, nTip: 4, nShift: 5 }
let Chin_Components = { cLength: 15, cPosition: 16, cWidth: 17, cShape: 18, jWidth: 13, jHeight: 14 }
let Cheek_Components = { cbHeight: 8, cbWidth: 9, cWidth: 10 }

let Marks_Components = { coModel: 6, sunModel: 7, freckModel: 9 }

export function UpdateClothes(clothes) {
    var ped = alt.Player.local.scriptID;
    game.setEnablePedEnveffScale(ped, true);
    game.setPedHeatscaleOverride(ped, 0.0)
    game.setPedEnveffScale(ped, 0.0)
    for (const [ClotheName, ClotheID] of Object.entries(clothes)) {
        for (const [ComponentName, ComponentID] of Object.entries(Clothes_Components)) {
            if (ClotheName == ComponentName) {
                game.setPedComponentVariation(ped, ComponentID, ClotheID.id, ClotheID.texture, ClotheID.texture)
            }
        }
    }
};

export function UpdateParent(parents) {
    var ped = alt.Player.local.scriptID;
    game.setPedHeadBlendData(ped, parents.mother, parents.father, 0.0, parents.motherVal, parents.fatherVal, 0.0, parents.similarity, parents.skinSimilarity, 0.0, false)
};

export function UpdateFeature(features) {
    var ped = alt.Player.local.scriptID;
    game.setPedFaceFeature(ped, 11, features.eyeOpening)
    game.setPedEyeColor(ped, features.eyeColors)
    if (features.eb == 0) { game.setPedHeadOverlay(ped, 2, 255) }
    game.setPedHeadOverlay(ped, 2, features.eb, features.ebdensy)
    game.setPedHeadOverlayColor(ped, 2, 1, features.ebcor, features.ebcor)
    game.setPedFaceFeature(ped, 6, features.ebHeight)
    game.setPedFaceFeature(ped, 7, features.ebWidth);
};

export function UpdateAppearence(appearence) {
    var ped = alt.Player.local.scriptID;
    for (const [apprName, apprValue] of Object.entries(appearence)) {
        if (apprName == "nose") {
            for (const [noseId, noseValue] of Object.entries(apprValue)) {
                for (const [componentName, componentId] of Object.entries(Nose_Components)) {
                    if (noseId == componentName) {
                        game.setPedFaceFeature(ped, componentId, noseValue);
                    }
                }
            }
        }
        if (apprName == "chin") {
            for (const [chinId, chinValue] of Object.entries(apprValue)) {
                for (const [componentName, componentId] of Object.entries(Chin_Components)) {
                    if (chinId == componentName) {
                        game.setPedFaceFeature(ped, componentId, chinValue);
                    }
                }
            }
        }
        if (apprName == "cheek") {
            for (const [cheekId, cheekValue] of Object.entries(apprValue)) {
                for (const [componentName, componentId] of Object.entries(Cheek_Components)) {
                    if (cheekId == componentName) {
                        game.setPedFaceFeature(ped, componentId, cheekValue);
                    }
                }
            }
        }
        if (apprName == "lips") {
            game.setPedFaceFeature(ped, 12, apprValue.lips)
        }

        if (apprName == "neck") {
            game.setPedFaceFeature(ped, 19, apprValue.neckWidth)
        }
    }
};

export function UpdateStyles(styles) {
    var ped = alt.Player.local.scriptID;
    for (const [apprName, apprValue] of Object.entries(styles)) {
        switch (apprName) {
            case "marks":
                for (const [marksId, marksValue] of Object.entries(apprValue)) {
                    for (const [componentName, componentId] of Object.entries(Marks_Components)) {
                        if (marksId == componentName) {
                            game.setPedHeadOverlay(ped, componentId, marksValue, 0.99);
                        }
                    }
                }
                break;
            case "hair":
                game.setPedComponentVariation(ped, 2, apprValue.hairModel, 0, 0)
                game.setPedHairColor(ped, apprValue.fhColor, apprValue.shColor)
                break;
            case "beard":
                game.setPedHeadOverlay(ped, 1, apprValue.beardModel, 0.99)
                game.setPedHeadOverlayColor(ped, 1, 1, apprValue.beardColor, apprValue.beardColor)
                break;
            case "makeup":
                game.setPedHeadOverlay(ped, 5, apprValue.blushModel, 0.99)
                game.setPedHeadOverlayColor(ped, 5, 2, apprValue.blushColor, apprValue.blushColor)
                game.setPedHeadOverlay(ped, 8, apprValue.lipsModel, 0.99)
                game.setPedHeadOverlayColor(ped, 8, 2, apprValue.lipsColor, apprValue.lipsColor)
                game.setPedHeadOverlay(ped, 4, apprValue.makeModel, 0.99)
                game.setPedHeadOverlayColor(ped, 4, 0, 0, 0)
                break;
            case "age":
                game.setPedHeadOverlay(ped, 3, apprValue.ageingModel, apprValue.ageingValue)
                game.setPedHeadOverlayColor(ped, 3, 0, 0, 0)
                break;
            case "torso":
                game.setPedHeadOverlay(ped, 10, apprValue.chestModel, 0.99)
                game.setPedHeadOverlayColor(ped, 10, 1, apprValue.chestColor, apprValue.chestColor)
                game.setPedComponentVariation(ped, 11, -1, 0, 2)
                break;
            case "body":
                game.setPedHeadOverlay(ped, 11, apprValue.blModel, 0.99)
                game.setPedHeadOverlayColor(ped, 11, 0, 0, 0)
                game.setPedHeadOverlay(ped, 12, apprValue.bl2Model, 0.99)
                game.setPedHeadOverlayColor(ped, 12, 0, 0, 0)
                game.setPedComponentVariation(ped, 11, -1, 0, 2)
                break;
        }
    }
};