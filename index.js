const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const qrcode = require('qrcode-terminal');

function readJSON(path) {
    try {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch (e) {
        fs.writeFileSync(path, '{}');
        return {};
    }
}

const bienvenida = readJSON('./data/bienvenida.json');
const despedida = readJSON('./data/despedida.json');
const reglas = readJSON('./data/reglas.json');
const advertencias = readJSON('./data/advertencias.json');
const cumpleaños = readJSON('./data/cumpleaños.json');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('🤖 Bot listo!');
});

function mentionUser(mention) {
    return mention ? `@${mention.replace(/@c.us/, '')}` : '';
}

client.on('message', async msg => {
    const chat = await msg.getChat();
    const contact = await msg.getContact();

    if (!msg.body.startsWith('!')) return;

    const args = msg.body.split(' ');
    const command = args[0].toLowerCase();
    const mention = msg.mentionedIds[0];

    // COMANDOS DE ADMINISTRACIÓN
    if (command === '!grupo') {
        if (!chat.isGroup) return msg.reply('Este comando solo funciona en grupos.');
        if (!chat.participants.find(p => p.id._serialized === contact.id._serialized)?.isAdmin)
            return msg.reply('Solo los administradores pueden usar este comando.');

        const action = args[1];
        if (action === 'abrir') {
            await chat.setMessagesAdminsOnly(false);
            msg.reply('✅ El grupo ha sido abierto para todos.');
        } else if (action === 'cerrar') {
            await chat.setMessagesAdminsOnly(true);
            msg.reply('🔒 El grupo ha sido cerrado para solo administradores.');
        } else {
            msg.reply('Uso: !grupo abrir / cerrar');
        }
    }

    else if (command === '!setreglas') {
        const nuevasReglas = msg.body.slice(10).trim();
        reglas[chat.id._serialized] = nuevasReglas;
        fs.writeFileSync('./data/reglas.json', JSON.stringify(reglas, null, 2));
        msg.reply('✅ Reglas del grupo actualizadas.');
    }

    else if (command === '!reglas') {
        const reglasGrupo = reglas[chat.id._serialized];
        if (reglasGrupo) msg.reply(`📜 Reglas del grupo:\n${reglasGrupo}`);
        else msg.reply('No se han establecido reglas aún.');
    }

    else if (command === '!setbienvenida') {
        const bienvenidaTexto = msg.body.slice(15).trim();
        bienvenida[chat.id._serialized] = bienvenidaTexto;
        fs.writeFileSync('./data/bienvenida.json', JSON.stringify(bienvenida, null, 2));
        msg.reply('✅ Mensaje de bienvenida configurado.');
    }

    else if (command === '!bienvenida') {
        const bienvenidaGrupo = bienvenida[chat.id._serialized];
        if (bienvenidaGrupo) msg.reply(`👋 Mensaje de bienvenida:\n${bienvenidaGrupo}`);
        else msg.reply('No se ha configurado la bienvenida aún.');
    }

    else if (command === '!setdespedida') {
        const despedidaTexto = msg.body.slice(14).trim();
        despedida[chat.id._serialized] = despedidaTexto;
        fs.writeFileSync('./data/despedida.json', JSON.stringify(despedida, null, 2));
        msg.reply('✅ Mensaje de despedida configurado.');
    }

    else if (command === '!despedida') {
        const despedidaGrupo = despedida[chat.id._serialized];
        if (despedidaGrupo) msg.reply(`👋 Mensaje de despedida:\n${despedidaGrupo}`);
        else msg.reply('No se ha configurado la despedida aún.');
    }

    else if (command === '!warn') {
        if (!mention) return msg.reply('Debes mencionar a un usuario para advertir.');
        advertencias[mention] = (advertencias[mention] || 0) + 1;
        fs.writeFileSync('./data/advertencias.json', JSON.stringify(advertencias, null, 2));
        const userContact = await client.getContactById(mention);
        msg.reply(`⚠️ Usuario advertido. Total de advertencias: ${advertencias[mention]}`, null, { mentions: [userContact] });
    }

    else if (command === '!verwarn') {
        if (!mention) return msg.reply('Debes mencionar a un usuario.');
        const cantidad = advertencias[mention] || 0;
        const userContact = await client.getContactById(mention);
        msg.reply(`⚠️ ${userContact.pushname || userContact.number} tiene ${cantidad} advertencias.`, null, { mentions: [userContact] });
    }

    // COMANDOS DE CARIÑO CON MENCIÓN REAL

    else if (command === '!abrazo') {
        if (mention) {
            const userContact = await client.getContactById(mention);
            msg.reply(`🤗 Un abrazo para ${userContact.pushname || userContact.number} https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif`, null, { mentions: [userContact] });
        } else {
            msg.reply('🤗 ¡Aquí tienes un abrazo virtual! https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif');
        }
    }

    else if (command === '!beso') {
        if (mention) {
            const userContact = await client.getContactById(mention);
            msg.reply(`😘 Un beso para ${userContact.pushname || userContact.number} https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif`, null, { mentions: [userContact] });
        } else {
            msg.reply('😘 ¡Te mando un beso virtual! https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif');
        }
    }

    else if (command === '!apapacho') {
        if (mention) {
            const userContact = await client.getContactById(mention);
            msg.reply(`🫂 Un apapacho para ${userContact.pushname || userContact.number} 💖 https://media.giphy.com/media/3oz8xIsloV7zOmt81G/giphy.gif`, null, { mentions: [userContact] });
        } else {
            msg.reply('🫂 ¡Aquí tienes un apapacho especial! 💖 https://media.giphy.com/media/3oz8xIsloV7zOmt81G/giphy.gif');
        }
    }

    else if (command === '!mimos') {
        if (mention) {
            const userContact = await client.getContactById(mention);
            msg.reply(`🐱 Mimos para ${userContact.pushname || userContact.number} 💆 https://media.giphy.com/media/KOVlHmbBA09XO/giphy.gif`, null, { mentions: [userContact] });
        } else {
            msg.reply('🐱 ¡Te mando mimos! 💆 https://media.giphy.com/media/KOVlHmbBA09XO/giphy.gif');
        }
    }

    else if (command === '!tequiero') {
        if (mention) {
            const userContact = await client.getContactById(mention);
            msg.reply(`💗 ${userContact.pushname || userContact.number}, ¡te quiero mucho! https://media.giphy.com/media/fHtb1JPbfph72/giphy.gif`, null, { mentions: [userContact] });
        } else {
            msg.reply('💗 ¡Te quiero mucho! https://media.giphy.com/media/fHtb1JPbfph72/giphy.gif');
        }
    }

    // NUEVO: comando !tag para mencionar a todos en un grupo
    else if (command === '!tag') {
        if (!chat.isGroup) return msg.reply('Este comando solo funciona en grupos.');
        const participants = chat.participants.map(p => p.id._serialized);
        // Obtener contactos para mencionar
        const mentions = [];
        for (const id of participants) {
            const c = await client.getContactById(id);
            mentions.push(c);
        }
        let texto = '📢 Mención a todos:\n';
        mentions.forEach(u => {
            texto += `@${u.number} `;
        });
        msg.reply(texto.trim(), null, { mentions: mentions });
    }

    // COMANDOS NUEVOS SIMPLES

    else if (command === '!hora') {
        const fecha = new Date();
        const hora = fecha.toLocaleTimeString('es-MX', { hour12: false });
        msg.reply(`🕒 La hora actual es: ${hora}`);
    }

    else if (command === '!fecha') {
        const fecha = new Date();
        const fechaFormateada = fecha.toLocaleDateString('es-MX');
        msg.reply(`📅 La fecha de hoy es: ${fechaFormateada}`);
    }

    else if (command === '!clima') {
        const ciudad = args.slice(1).join(' ');
        if (!ciudad) return msg.reply('Por favor, escribe una ciudad. Ejemplo: !clima CDMX');

        const climaSimulado = `🌤️ El clima en ${ciudad} está soleado con 25°C.`;
        msg.reply(climaSimulado);
    }

    else if (command === '!flip') {
        const texto = args.slice(1).join(' ');
        if (!texto) return msg.reply('Envía un texto para invertirlo. Ejemplo: !flip hola');
        const textoInvertido = texto.split('').reverse().join('');
        msg.reply(`🔄 Texto invertido: ${textoInvertido}`);
    }

    else if (command === '!info') {
        msg.reply('🤖 Soy un bot de WhatsApp creado con whatsapp-web.js.\n' +
                  'Desarrollado por tu nombre.\n' +
                  'Para ver los comandos disponibles, escribe !ayuda');
    }

    else if (command === '!ayuda') {
        const listaComandos = `
Lista de comandos disponibles:
!grupo abrir/cerrar - Administrar grupo
!setreglas [texto] - Establecer reglas
!reglas - Ver reglas
!setbienvenida [texto] - Establecer bienvenida
!bienvenida - Ver bienvenida
!setdespedida [texto] - Establecer despedida
!despedida - Ver despedida
!warn @usuario - Advertir usuario
!verwarn @usuario - Ver advertencias
!abrazo @usuario - Enviar abrazo
!beso @usuario - Enviar beso
!apapacho @usuario - Enviar apapacho
!mimos @usuario - Enviar mimos
!tequiero @usuario - Enviar mensaje de amor
!tag - Mencionar a todos en el grupo
!hora - Hora actual
!fecha - Fecha actual
!clima [ciudad] - Clima simulado
!flip [texto] - Invierte texto
!info - Info del bot
!ayuda - Mostrar comandos
`;
        msg.reply(listaComandos);
    }
});
