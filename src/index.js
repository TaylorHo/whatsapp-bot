// INÍCIO DEPENDENCIAS/PACOTES
const fs = require("fs");
const path = require('path');
const qrcode = require('qrcode-terminal');
const { Client } = require("whatsapp-web.js");
const Bot = require("./bot");
// FIM DEPENDENCIAS/PACOTES

// INÍCIO LOGIN/AUTENTICAÇÃO/INICIALIZAÇÃO
const SESSION_FILE_PATH = path.resolve(__dirname, 'session.json');
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ session: sessionCfg });
client.initialize();

client.on("qr", (qr) => {
  for (var i = 0; i < 60; i++) {
    console.log(" ");
  }
  console.log("AUTENTICAÇÃO POR QR CODE NECESSÁRIA");
  for (var i = 0; i < 4; i++) {
    console.log(" ");
  }
  qrcode.generate(qr, {small: true});
  for (var i = 0; i < 10; i++) {
    console.log(" ");
  }
});

client.on("authenticated", (session) => {
  sessionCfg = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
    if (err) {
      console.error(err);
    }
  });
});

client.on("auth_failure", (msg) => {
  console.error("FALHA NA AUTENTICAÇÃO, TENTE NOVAMENTE...", msg);
});

client.on("ready", () => {
  for (var i = 0; i < 60; i++) {
    console.log(" ");
  }

  console.log("   ██╗    ██╗██╗  ██╗ █████╗ ████████╗███████╗ █████╗ ██████╗ ██████╗         ██████╗  ██████╗ ████████╗ \n\   ██║    ██║██║  ██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔══██╗        ██╔══██╗██╔═══██╗╚══██╔══╝ \n\   ██║ █╗ ██║███████║███████║   ██║   ███████╗███████║██████╔╝██████╔╝        ██████╔╝██║   ██║   ██║   \n\   ██║███╗██║██╔══██║██╔══██║   ██║   ╚════██║██╔══██║██╔═══╝ ██╔═══╝         ██╔══██╗██║   ██║   ██║   \n\   ╚███╔███╔╝██║  ██║██║  ██║   ██║   ███████║██║  ██║██║     ██║             ██████╔╝╚██████╔╝   ██║   \n\    ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝             ╚═════╝  ╚═════╝    ╚═╝   ");

  for (var i = 0; i < 6; i++) {
    console.log(" ");
  }
});

client.on("disconnected", (reason) => {
  console.log("VOCÊ FOI DESCONECTADO.", reason);
});
// FIM LOGIN/AUTENTICAÇÃO/INICIALIZAÇÃO

// INÍCIO FUNÇÕES UTILIZADAS
function getData(t) {
  var date = new Date(t * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();

  var formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime;
}

function logMsg(t, who, msg){
  console.log("["+ getData(t) +"] " + who + ": " + msg);
}

// FIM FUNÇÕES UTILIZADAS


// INÍCIO DA TRATATIVA DE MENSAGENS
var haveMsg = [];
var confirmSend = [];
const bot = new Bot();

client.on("message", async (msg) => {
  
  const chat = msg.getChat();
  const pessoa = (await chat).name;

  if(haveMsg.indexOf(msg.from) > -1){
    // conversa iniciada

    if(confirmSend.indexOf(msg.from) > -1){
      

    } else {
      confirmSend.push(msg.from);
      // client.sendMessage(msg.from, bot.interprete(msg.body));
      (await chat).markUnread((await chat).id);
    }
    
  } else {
    // enviar primeira mensagem
    haveMsg.push(msg.from);
    // client.sendMessage(msg.from, bot.firstMsg(msg.timestamp, (await chat).name));
  }
  
  if (msg.type == "chat") { // é uma mensagem no chat
    logMsg(msg.timestamp, pessoa, msg.body);
  }
  else if (msg.type == "ptt"){ // é uma mensagem de áudio
    logMsg(msg.timestamp, pessoa, '#### Áudio Recebido ####');
  }
  else if (msg.type == "image"){ // é uma mensagem de áudio
    logMsg(msg.timestamp, pessoa, '#### Foto Recebida ####');
  }
  else if(msg.isStatus == false) { // outros tipos e que não sejam status
    console.log(msg);
  }
});


client.on("change_battery", (batteryInfo) => {
  const { battery, plugged } = batteryInfo;
  const sts = plugged == false ? `Bateria: ${battery}%` : `Bateria: ${battery}% - Carregando`;
  console.log(sts);
});
