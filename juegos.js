// comandos/juegos.js
module.exports = async (client, msg) => {
    const command = msg.body.toLowerCase();

    // Piedra, papel o tijera con estrategia para que el bot gane ~60%
    if (command.startsWith('!ppt')) {
        const opciones = ['piedra', 'papel', 'tijera'];
        const usuario = command.split(' ')[1];
        if (!usuario || !opciones.includes(usuario)) {
            return msg.reply('Uso: !ppt piedra|papel|tijera');
        }

        // Estrategia para que el bot gane más veces (~60%)
        function opcionGanadora(userChoice) {
            switch(userChoice) {
                case 'piedra': return 'papel';    // papel gana a piedra
                case 'papel': return 'tijera';    // tijera gana a papel
                case 'tijera': return 'piedra';   // piedra gana a tijera
            }
        }

        // Decide si el bot gana (60%) o elige al azar (40%)
        const random = Math.random();
        let bot;
        if (random < 0.6) {
            bot = opcionGanadora(usuario);
        } else {
            bot = opciones[Math.floor(Math.random() * opciones.length)];
        }

        if (usuario === bot) {
            msg.reply(`Empate! Ambos eligieron ${bot}`);
        } else if (
            (usuario === 'piedra' && bot === 'tijera') ||
            (usuario === 'papel' && bot === 'piedra') ||
            (usuario === 'tijera' && bot === 'papel')
        ) {
            msg.reply(`Ganaste! Yo elegí ${bot}`);
        } else {
            msg.reply(`Perdiste! Yo elegí ${bot}`);
        }
    }

    // Lanzar dado
    else if (command === '!dado') {
        const dado = Math.floor(Math.random() * 6) + 1;
        msg.reply(`🎲 Salió un ${dado}`);
    }

    // Adivinanza random
    else if (command === '!adivinanza') {
        const adivinanzas = [
            { pregunta: "Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera.", respuesta: "pera" },
            { pregunta: "Oro parece, plata no es. ¿Qué es?", respuesta: "el plátano" },
            { pregunta: "Tiene agujas y no cose. ¿Qué es?", respuesta: "el reloj" },
            { pregunta: "Cien hermanos tenemos, y todos en fila van, pero ninguno se encuentra, porque todos en el mismo lugar están.", respuesta: "los dientes" },
            { pregunta: "No es cama ni es león y desaparece en cualquier rincón.", respuesta: "el camaleón" }
        ];
        const adivinanza = adivinanzas[Math.floor(Math.random() * adivinanzas.length)];
        msg.reply(`❓ Adivinanza:\n${adivinanza.pregunta}\n\nEscribe !respuesta [tu respuesta]`);
        client.adivinanzaActual = { chatId: msg.from, respuesta: adivinanza.respuesta.toLowerCase() };
    }

    // Comprobar respuesta adivinanza
    else if (command.startsWith('!respuesta')) {
        if (!client.adivinanzaActual || client.adivinanzaActual.chatId !== msg.from) {
            return msg.reply('No hay una adivinanza activa para este chat.');
        }
        const respuestaUsuario = command.split(' ').slice(1).join(' ').toLowerCase();
        if (respuestaUsuario === client.adivinanzaActual.respuesta) {
            msg.reply('🎉 ¡Correcto! ¡Ganaste!');
            client.adivinanzaActual = null;
        } else {
            msg.reply('❌ Incorrecto, intenta de nuevo.');
        }
    }

    // Verdad o reto - Verdades
    else if (command === '!verdad') {
        const verdades = [
            "¿Cuál es tu mayor miedo?",
            "¿Has mentido alguna vez a tu mejor amigo?",
            "¿Cuál es tu secreto más vergonzoso?",
            "¿Quién fue tu primer crush?",
            "¿Cuál es el hábito más raro que tienes?",
            "¿Qué cosa harías si fueras invisible un día?"
        ];
        const verdad = verdades[Math.floor(Math.random() * verdades.length)];
        msg.reply(`🤫 Verdad:\n${verdad}`);
    }

    // Verdad o reto - Retos
    else if (command === '!reto') {
        const retos = [
            "Envía un emoji sin usar las manos",
            "Habla en rimas por 5 minutos",
            "Imita a un animal y grábate",
            "Baila sin música durante 30 segundos",
            "Cuenta un chiste malo y espera que alguien se ría",
            "Envía un mensaje en mayúsculas por 10 minutos",
            "Haz 10 saltos en tu lugar",
            "Publica una foto graciosa de tu cara",
            "Canta el coro de tu canción favorita",
            "Haz un dibujo en 30 segundos y compártelo"
        ];
        const reto = retos[Math.floor(Math.random() * retos.length)];
        msg.reply(`🎲 Reto:\n${reto}`);
    }
};
