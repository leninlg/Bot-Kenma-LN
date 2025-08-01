// comandos/acciones.js
module.exports = async (client, msg) => {
    const texto = msg.body.toLowerCase();
    const args = texto.split(' ');
    const command = args[0];
    const mention = msg.mentionedIds && msg.mentionedIds.length > 0 ? msg.mentionedIds[0] : null;
    const mentionUser = id => id ? `@${id.replace(/@c.us/, '')}` : '';

    // Mapa de comandos a [texto de respuesta base, url gif]
    const comandos = {
        '.angry': ['😠 está enojado!', 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif'],
        '.enojado': ['😠 está enojado!', 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif'],

        '.bath': ['🛁 está bañándose!', 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'],
        '.bañarse': ['🛁 está bañándose!', 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'],

        '.bite': ['😬 mordió a alguien!', 'https://media.giphy.com/media/12XDYvMJNcmLgQ/giphy.gif'],
        '.morder': ['😬 mordió a alguien!', 'https://media.giphy.com/media/12XDYvMJNcmLgQ/giphy.gif'],

        '.bleh': ['😛 sacó la lengua!', 'https://media.giphy.com/media/fsyRzjON6M4BG/giphy.gif'],
        '.lengua': ['😛 sacó la lengua!', 'https://media.giphy.com/media/fsyRzjON6M4BG/giphy.gif'],

        '.blush': ['😊 se sonrojó!', 'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif'],
        '.sonrojarse': ['😊 se sonrojó!', 'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif'],

        '.bored': ['😒 está aburrido!', 'https://media.giphy.com/media/10LKovKon8DENq/giphy.gif'],
        '.aburrido': ['😒 está aburrido!', 'https://media.giphy.com/media/10LKovKon8DENq/giphy.gif'],

        '.coffe': ['☕ disfrutando un café!', 'https://media.giphy.com/media/l0MYB8Ory7Hqefo9a/giphy.gif'],
        '.cafe': ['☕ disfrutando un café!', 'https://media.giphy.com/media/l0MYB8Ory7Hqefo9a/giphy.gif'],

        '.cry': ['😭 está llorando...', 'https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif'],
        '.llorar': ['😭 está llorando...', 'https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif'],

        '.cuddle': ['🤗 está acurrucándose!', 'https://media.giphy.com/media/wnsgren9NtITS/giphy.gif'],
        '.acurrucarse': ['🤗 está acurrucándose!', 'https://media.giphy.com/media/wnsgren9NtITS/giphy.gif'],

        '.dance': ['💃 está bailando!', 'https://media.giphy.com/media/3o7qDP2LoQvT8pV0rS/giphy.gif'],
        '.bailar': ['💃 está bailando!', 'https://media.giphy.com/media/3o7qDP2LoQvT8pV0rS/giphy.gif'],

        '.drunk': ['🥴 está borracho!', 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif'],
        '.borracho': ['🥴 está borracho!', 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif'],

        '.facepalm': ['🤦 está haciendo palmada en la cara!', 'https://media.giphy.com/media/3og0IPxMM0erATueVW/giphy.gif'],
        '.palmada': ['🤦 está haciendo palmada en la cara!', 'https://media.giphy.com/media/3og0IPxMM0erATueVW/giphy.gif'],

        '.happy': ['😁 está feliz!', 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'],
        '.feliz': ['😁 está feliz!', 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'],

        '.hello': ['👋 dice hola!', 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'],
        '.hola': ['👋 dice hola!', 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'],

        '.hug': ['🤗 abraza!', 'https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif'],
        '.abrazar': ['🤗 abraza!', 'https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif'],

        '.kill': ['🔪 intentó matar a alguien!', 'https://media.giphy.com/media/RXGNsyRb1hDJm/giphy.gif'],
        '.matar': ['🔪 intentó matar a alguien!', 'https://media.giphy.com/media/RXGNsyRb1hDJm/giphy.gif'],

        '.kiss': ['😘 besa!', 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'],
        '.besar': ['😘 besa!', 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'],

        '.kiss2': ['😍 besa amorosamente!', 'https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif'],
        '.besar2': ['😍 besa amorosamente!', 'https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif'],

        '.laugh': ['😂 se está riendo!', 'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif'],
        '.reirse': ['😂 se está riendo!', 'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif'],

        '.lick': ['😋 está lamiendo!', 'https://media.giphy.com/media/WGqTG6tAGIh7S/giphy.gif'],
        '.lamer': ['😋 está lamiendo!', 'https://media.giphy.com/media/WGqTG6tAGIh7S/giphy.gif'],

        '.love2': ['😍 está enamorada!', 'https://media.giphy.com/media/3oz8xKaR836UJOYeOc/giphy.gif'],
        '.enamorada': ['😍 está enamorada!', 'https://media.giphy.com/media/3oz8xKaR836UJOYeOc/giphy.gif'],

        '.patt': ['🐾 acaricia!', 'https://media.giphy.com/media/L2z7dnOduqEow/giphy.gif'],
        '.acariciar': ['🐾 acaricia!', 'https://media.giphy.com/media/L2z7dnOduqEow/giphy.gif'],

        '.poke': ['👉 pica!', 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif'],
        '.picar': ['👉 pica!', 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif'],

        '.pout': ['😒 hace pucheros!', 'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif'],
        '.pucheros': ['😒 hace pucheros!', 'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif'],

        '.ppcouple': ['💑 pareja linda! ❤️ https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif'],

        '.pregg': ['🤰 está embarazada!', 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif'],
        '.embarazar': ['🤰 está embarazada!', 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif'],

        '.punch': ['👊 golpea!', 'https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif'],
        '.golpear': ['👊 golpea!', 'https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif'],

        '.run': ['🏃 corre rápido!', 'https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif'],
        '.correr': ['🏃 corre rápido!', 'https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif'],

        '.sad': ['😢 está triste...', 'https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif'],
        '.triste': ['😢 está triste...', 'https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif'],

        '.scared': ['😨 está asustada!', 'https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif'],
        '.asustada': ['😨 está asustada!', 'https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif'],

        '.seduce': ['😉 está seduciendo...', 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif'],
        '.seducir': ['😉 está seduciendo...', 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif'],

        '.shy': ['😳 está tímida!', 'https://media.giphy.com/media/XfpQ9xCnlsV5a/giphy.gif'],
        '.timida': ['😳 está tímida!', 'https://media.giphy.com/media/XfpQ9xCnlsV5a/giphy.gif'],

        '.slap': ['👋 da una bofetada!', 'https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif'],
        '.bofetada': ['👋 da una bofetada!', 'https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif'],

        '.sleep': ['😴 está durmiendo...', 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif'],
        '.dormir': ['😴 está durmiendo...', 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif'],

        '.smoke': ['🚬 está fumando...', 'https://media.giphy.com/media/3o6Zt8MgUuvSbkZYWc/giphy.gif'],
        '.fumar': ['🚬 está fumando...', 'https://media.giphy.com/media/3o6Zt8MgUuvSbkZYWc/giphy.gif'],

        '.think': ['🤔 está pensando...', 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'],
        '.pensando': ['🤔 está pensando...', 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'],
    };

    if (comandos[command]) {
        const [text, gif] = comandos[command];
        if (mention) {
            msg.reply(`${text.replace('!', '')} ${mentionUser(mention)} ${gif}`);
        } else {
            msg.reply(`${text} ${gif}`);
        }
    }
};
