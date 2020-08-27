import * as alt from 'alt';
import * as game from 'natives';

let noclip = false
let noclip_speed = 3.5
alt.onServer('client/game/admin/Commands/noclip', () => {
    var ped = alt.Player.local.scriptID;
    noclip = !noclip
    if (noclip) {
        game.setEntityInvincible(ped, true)
        game.setEntityVisible(ped, false, false)
    } else {
        game.setEntityInvincible(ped, false)
        game.setEntityVisible(ped, true, false)
    }
})

alt.everyTick(() => {
    if (noclip) {
        var ped = alt.Player.local.scriptID;
        const myPos = game.getEntityCoords(ped, true)

        let heading = game.getGameplayCamRelativeHeading() + game.getEntityHeading(ped);
        let pitch = game.getGameplayCamRelativePitch();
        let Camx = -Math.sin(heading * Math.PI / 180.0);
        let Camy = Math.cos(heading * Math.PI / 180.0)
        let Camz = Math.sin(pitch * Math.PI / 180.0)
        let len = Math.sqrt(Camx * Camx + Camy * Camy + Camz * Camz);
        if (len !== 0) {
            Camx = Camx / len
            Camy = Camy / len
            Camz = Camz / len
        }
        let newPosX;
        let newPosY;
        let newPosZ;

        game.setEntityVelocity(ped, 0.0001, 0.0001, 0.0001)

        if (game.isControlPressed(0, 21)) {
            noclip_speed = 10.0
        } else if (game.isControlPressed(0, 32)) {
            noclip_speed = 0.2
        } else {
            noclip_speed = 1.0
        }

        if (game.isControlPressed(0, 32)) {
            newPosX = myPos.x + noclip_speed * Camx
            newPosY = myPos.y + noclip_speed * Camy
            newPosZ = myPos.z + noclip_speed * Camz
        }

        if (game.isControlPressed(0, 269)) {
            newPosX = myPos.x - noclip_speed * Camx
            newPosY = myPos.y - noclip_speed * Camy
            newPosZ = myPos.z - noclip_speed * Camz
        }

        game.setEntityCoordsNoOffset(ped, newPosX, newPosY, newPosZ, true, true, true);
    }
})


alt.onServer('client/game/admin/Commands/tpway', () => {
    var ped = alt.Player.local.scriptID;
    let veh = game.getVehiclePedIsUsing(ped)
    if (game.isPedInAnyVehicle(ped)) {
        ped = veh
    }
    var waypoint = game.getFirstBlipInfoId(8);
    if (game.doesBlipExist(waypoint)) {
        var coords = game.getBlipInfoIdCoord(waypoint);
        let ground
        let z = 0;
        let groundFound = false
        let groundCheckHeights = [0.0, 50.0, 100.0, 150.0, 200.0, 250.0, 300.0, 350.0, 400.0, 450.0, 500.0, 550.0, 600.0, 650.0, 700.0, 750.0, 800.0, 850.0, 900.0, 950.0, 1000.0, 1050.0, 1100.0]

        for (let i = 0; i < groundCheckHeights.length; i++) {
            game.setEntityCoordsNoOffset(ped, coords.x, coords.y, groundCheckHeights[i], 0, 0, 1)
            game.requestCollisionAtCoord(coords.x, coords.y, coords.z)
            while (!game.hasCollisionLoadedAroundEntity(ped)) {
                game.requestCollisionAtCoord(coords.x, coords.y, coords.z)
            }

            [ground, z] = game.getGroundZFor3dCoord(coords.x, coords.z, groundCheckHeights[i])
            if (ground) {
                z += 1.0
                groundFound = true
                break;
            }
        }

        game.requestCollisionAtCoord(coords.x, coords.y, z)
        while (!game.hasCollisionLoadedAroundEntity(ped)) {
            game.requestCollisionAtCoord(coords.x, coords.y, z)
        }
        game.setEntityCoordsNoOffset(ped, coords.x, coords.y, z + 2, 0, 0, 1)
    }
})