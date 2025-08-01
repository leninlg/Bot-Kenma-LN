// comandos/admin.js
module.exports = async (client, msg) => {
    const command = msg.body.toLowerCase();
    const chat = await msg.getChat();

    // !tag - Mencionar a todos en el grupo
    if (command === '!tag' && chat.isGroup) {
        let text = '';
        let mentions = [];

        for (let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }

        chat.sendMessage(text, { mentions });
    }

    // !kick - Expulsar a alguien
    if (command.startsWith('!kick') && chat.isGroup && msg.hasQuotedMsg) {
        const quoted = await msg.getQuotedMessage();
        const contact = await quoted.getContact();
        if (chat.participants.find(p => p.id._serialized === msg.author || msg.fromMe).isAdmin) {
            await chat.removeParticipants([contact.id._serialized]);
            msg.reply(`👢 Usuario expulsado`);
        } else {
            msg.reply('❌ Necesitas ser admin');
        }
    }

    // !add - Agregar número al grupo
    if (command.startsWith('!add') && chat.isGroup) {
        let number = command.split(' ')[1];
        if (!number) return msg.reply('⚠️ Escribe un número para agregar');
        number = number.includes('@c.us') ? number : `${number}@c.us`;

        try {
            await chat.addParticipants([number]);
            msg.reply('✅ Usuario agregado');
        } catch (e) {
            msg.reply('❌ No se pudo agregar al usuario');
        }
    }

    // !bye - Bot sale del grupo
    if (command === '!bye' && chat.isGroup) {
        msg.reply('👋 Adiós, grupo');
        await chat.leave();
    }

    // !welcome - Activar mensaje de bienvenida
    if (command === '!welcome on' && chat.isGroup) {
        const data = JSON.parse(require('fs').readFileSync('./database/welcome.json'));
        data[chat.id._serialized] = true;
        require('fs').writeFileSync('./database/welcome.json', JSON.stringify(data));
        msg.reply('✅ Mensaje de bienvenida activado');
    }

    if (command === '!welcome off' && chat.isGroup) {
        const data = JSON.parse(require('fs').readFileSync('./database/welcome.json'));
        delete data[chat.id._serialized];
        require('fs').writeFileSync('./database/welcome.json', JSON.stringify(data));
        msg.reply('🚫 Mensaje de bienvenida desactivado');
    }
};
