module.exports = class Bot {

  interprete(msg){
    const repeat = ['aa', 'aaa', 'aaaa', 'ii', 'iii', 'iiii', 'ee', 'eee', 'eeee', 'oo', 'ooo', 'oooo', 'uu', 'uuu', 'uuuu'];

    this.msg = msg.replace(repeat, '');

    if(this.isQuestion(this.msg) == true){
      return "Vou ver e já te retorno, Ok?";
    } else {
      return "Vou informá-lo, só um momento.";
    }

  }

  isQuestion(msg){
    var ans = msg.indexOf("?") > -1 ? true : false;
    return ans;
  }

  firstMsg(t, p){
    if(this.getHour(t) == 'manha'){
      var turno = "Bom Dia";
    }
    else if(this.getHour(t) == 'tarde'){
      var turno = "Boa Tarde";
    }
    else {
      var turno = "Boa Noite";
    }

    if(p.indexOf("5") > -1){
      return turno + ", no momento ele está ocupado, mas vou relatar seu contato. Enquanto isso, posso lhe ajudar com algo? 🤔";
    } else {
      return turno + " " + p + ", no momento ele está ocupado, mas vou relatar seu contato. Enquanto isso, posso lhe ajudar com algo? 🤔";
    }

    
    
  }

  getHour(t) {
    var date = new Date(t * 1000);
    var hour = date.getHours();

    if(hour < 12){
      var tipo = 'manha';
    }
    else if(hour < 18){
      var tipo = 'tarde';
    }
    else {
      var tipo = 'noite';
    }
  
    return tipo;
  }

  
}