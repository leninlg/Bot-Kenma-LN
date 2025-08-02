# Bot-Kenma-LN
Bot de Whatsapp
# Bot-Kenma-LN 🤖

![Avatar del Bot](img).

Bot Kenma el más migajero hecho con [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) y configurado para usarse en Android mediante Termux. Incluye comandos de administración, multimedia, cariño, niveles, monedas, premium y más.

---

## 📱 Requisitos

- Dispositivo Android
- App [Termux](https://f-droid.org/packages/com.termux/)
- Node.js y Git instalados
- Cuenta de WhatsApp con sesión activa

---

## ⚙️ Instalación en Termux

### 1. Abrir Termux y actualizar paquetes

```bash
termux-setup-storage
apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn
git clone https://github.com/leninlg/Bot-Kenma-LN.git
cd Bot-Kenma-LN
npm install
mkdir -p data
touch data/bienvenida.json data/niveles.json data/monedas.json data/premium.json
touch data/afk.json data/baneados.json data/spam.json data/registro.json
npm start
