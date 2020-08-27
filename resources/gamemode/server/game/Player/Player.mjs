import * as alt from 'alt';
import { rp } from '../../services/Server';

alt.on('playerConnect', async(player) => {
    if (rp.ready === 0 || player.name == "Player") player.kick('Seu nome está padrão, altere nas configurações da plataforma, caso esteja com outro nome, desconsidere esta mensagem.');
    alt.log(`${player.name} entrou no servidor.`);
    alt.emitClient(player, 'client/game/auth/auth')
    player.dimension = Math.floor(Math.random() * 15000);
});

alt.on('playerDisconnect', async(player, reason) => {
    if (!player._spawned) return false;
    alt.log(`${player.name} desconectou do servidor => ${reason}.`);
    player.save(reason);
});