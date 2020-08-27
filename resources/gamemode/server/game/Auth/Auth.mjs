import * as alt from 'alt';
import UserController from '../../controllers/UserController';
import CharacterController from '../../controllers/CharacterController';
import md5 from 'md5'
var salt = "$2a$10$lM2Aa7WU0LWgEjZBYe4PWu";

alt.onClient('server/auth/tryRegister', async(player, data) => {
    let account;
    try {
        account = await UserController.GetAccount(data.username, data.email);
        if (!account) {
            var createdAccount = await UserController.Create(data.username, data.email, md5(data.password + salt));
            if (createdAccount)
                alt.emitClient(player, 'client/auth/message', 'success')
        } else {
            alt.emitClient(player, 'client/auth/message', 'email', 'Usuário já existente')
        }
    } catch (err) {
        alt.logError('Error ao receber dados da conta ', err);
    }
})

alt.onClient('server/auth/tryLogin', async(player, data) => {
    let accLogin;
    try {
        accLogin = await UserController.Login(data.username, md5(data.password + salt));
        if (accLogin) {
            if (accLogin.whitelisted) {
                player._account.id = accLogin.id;
                alt.emitClient(player, 'client/auth/success')
            } else {
                alt.emitClient(player, 'client/auth/message', 'general', 'Você não possui whitelist.')
            }
        } else {
            alt.emitClient(player, 'client/auth/message', 'password', 'Usuário Inválido')
        }
    } catch (err) {
        alt.logError('Error ao receber dados da conta ', err);
    }
})

alt.onClient('server/auth/success', async(player) => {
    try {
        player._account.characters = await CharacterController.GetCharacters(player._account.id);
        if (player._account.characters) {
            alt.emitClient(player, 'client/auth/select', player._account.characters)
        }
    } catch (err) {
        alt.logError('Error ao receber dados do personagem ', err);
    }
})