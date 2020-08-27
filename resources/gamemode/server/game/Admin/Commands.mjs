import * as alt from 'alt';
import { registerCmd } from '../../classes/ChatAPI'

registerCmd('health', (player, msg) => {
    if (player.hasGroup('admin')) {
        if (msg > 0) {
            player.health = parseInt(msg);
        } else {
            alt.emitClient(player, 'client/classes/ChatAPI/message', `~r~Precisa inserir a quantidade de vida para ser adicionada. Ex: /health 200.`, 'Global')
        }
    } else {
        alt.emitClient(player, 'client/classes/ChatAPI/message', `~r~Você não possui permissão para usar este comando.`, 'Global')
    }
});

registerCmd('armour', (player, msg) => {
    if (player.hasGroup('admin')) {
        if (msg > 0) {
            player.armour = parseInt(msg);
        } else {
            alt.emitClient(player, 'client/classes/ChatAPI/message', `~r~Precisa inserir a quantidade de armadura para ser adicionada. Ex: /armour 100.`, 'Global')

        }
    } else {
        alt.emitClient(player, 'client/classes/ChatAPI/message', `~r~Você não possui permissão para usar este comando.`, 'Global')
    }
});

registerCmd('nc', (player) => {
    if (player.hasGroup('admin')) {
        alt.emitClient(player, 'client/game/admin/Commands/noclip')
    } else {
        alt.emitClient(player, 'client/classes/ChatAPI/message', `~r~Você não possui permissão para usar este comando.`, 'Global')
    }
});

registerCmd('tpway', (player) => {
    if (player.hasGroup('admin')) {
        alt.emitClient(player, 'client/game/admin/Commands/tpway')
    } else {
        alt.emitClient(player, 'client/classes/ChatAPI/message', `~r~Você não possui permissão para usar este comando.`, 'Global')
    }
});