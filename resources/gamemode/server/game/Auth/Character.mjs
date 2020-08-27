import * as alt from 'alt';
import CharacterController from '../../controllers/CharacterController';
import md5 from 'md5'

alt.onClient('server/auth/character/createCharacter', async(player) => {
    player.model = 'mp_m_freemode_01';
    player.spawn(152.19, -1001.41, -100.0, 0);
    alt.emitClient(player, 'client/create/startCreate')
})

alt.onClient('server/auth/character/changeGender', async(player, model) => {
    player.model = alt.hash(model);
    player.pos = new alt.Vector3(152.19, -1001.41, -99.0);
    alt.emitClient(player, 'client/create/fixGender')
})

alt.onClient('server/game/auth/Character/finish_creator', async(player, ...args) => {
    let character;
    let character_model;
    try {
        character = await CharacterController.CreateCharacter(player._account.id, args[0], args[1], args[2]);
        if (character) {
            character_model = await CharacterController.CreateModels(character.id, args[3], args[4], args[5], args[6], args[7])
            if (character_model) {
                alt.emitClient(player, 'client/char_create/destroyAll')
            }
        }
    } catch (err) {
        alt.logError('Error ao criar o personagem ', err);
    }
})

alt.onClient('server/auth/character/selectedPlayer', async(player, char_id) => {
    let character;
    let character_models;
    try {
        character = await CharacterController.GetCharacter(char_id);
        character_models = await CharacterController.Get_Models(char_id);
        if (character && character_models) {
            player._cID = char_id;
            player._cName = character.character_name;
            player._cash = character.cash;
            player._bank = character.bank;
            player._groups = JSON.parse(character.groups);
            player._sex = character.sex;
            player._hunger = character.hunger;
            player.health = character.health;
            player._thirst = character.thirst;
            player.dimension = 0;
            player.model = character.sex;
            player._position = JSON.parse(character.position);
            alt.emitClient(player, 'client/browser/received/hud', player._hunger, player._thirst)
            alt.emitClient(player, 'client/game/auth/CharSelect/player_customs', character_models);
            player.spawn(player._position.x, player._position.y, player._position.z, 0)
        }
    } catch (err) {
        alt.logError('Error ao receber dados do personagem', err);
    }
})

alt.onClient('server/game/auth/character/hungerandthirst', async(player, hunger, thirst) => {
    try {
        if (hunger <= 0) hunger = 0;
        if (thirst <= 0) thirst = 0;
        if (hunger >= 100) hunger = 100;
        if (thirst >= 100) thirst = 100;
        player._hunger = hunger;
        player._thirst = thirst;
        player.save()
    } catch (err) {
        alt.logError('Error ao salvar dados do personagem. ', err);
    }
})