function cadastrar() {
  let nomeUser = inptNome.value.trim()
  let emailUser = inptEmail.value.trim()
  let senhaUser = inptSenha.value.trim()
  let confirmarSenhaUser = inptConfirmarSenha.value.trim()

  if (nomeUser == "" || emailUser == "" || senhaUser == "" || confirmarSenhaUser == "") {
    if (nomeUser == "") { divErroNome.innerHTML = `O campo nome está vazio.` }
    if (emailUser == "") { divErroEmail.innerHTML = `O campo email está vazio.` }
    if (senhaUser == "") { divErroSenha.innerHTML = `O campo senha está vazio.` }
    if (confirmarSenhaUser == "") { divErroConfirmar.innerHTML = `O campo confirmar senha está vazio.` }

    if (senhaUser != confirmarSenhaUser) {
      divErroNome.innerHTML = `As senhas não coincidem.`

      if (validar(emailUser, senhaUser)) {
        return
      }
      
      fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nomeServer: nomeUser,
          emailServer: emailUser,
          senhaServer: senhaUser
        })
      }).then(function (resposta) {
        if (resposta.ok) {
          console.log(resposta);

          resposta.json().then(json => {
            console.log(json);
            console.log(JSON.stringify(json));

            divValidacao.innerHTML = `Cadastro realizado, entre para o terror!`

            setTimeout(function () {
              window.location = "./login.html";
            }, 1000);
          });
        } else {
          console.log("Houve um erro ao tentar realizar o cadastro!");

          resposta.text().then(texto => {
            console.error(texto);
            finalizarAguardar(texto);
          });
        }
      }).catch(function (erro) {
        console.log(erro);
      })
    }
  }
}

function entrar() {
  let emailUser = inptEmail.value;
  let senhaUser = inptSenha.value;

  if (emailUser == "" || senhaUser == "") {
    divErro.innerHTML = `Email e/ou senha estão errados.`
  } else {
    fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailServer: emailUser,
        senhaServer: senhaUser
      })
    }).then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!")

      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then(json => {
          console.log(json);
          console.log(JSON.stringify(json));
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.ID_USUARIO = json.id;

          window.location = "./dashboard/cards.html";
        });

      } else {
        console.log("Houve um erro ao tentar realizar o login!");
        resposta.text().then(texto => {
          console.error(texto);
          divErro.innerHTML = `Algum erro inesperado ocorreu, tente novamente mais tarde.`
        });
      }

    }).catch(function (erro) {
      console.log(erro);
    });
  }
}

function validar(emailUser, senhaUser) {
  let emailValido = false
  let senhaValido = true
  let atPosition = emailUser.indexOf('@')

  if (atPosition <= 0) {
    for (let i = 0; i < emailUser.length; i++) {
      if (emailUser[i] == '.' && atPosition < i) {
        emailValido = true
        break
      }
    }
  }

  if (!emailValido) {
    divErroEmail.innerHTML = `Digite um email válido.`
  }

  if (senhaUser.toUpperCase() == senhaUser.toLowerCase() || senhaUser.toUpperCase() == senhaUser.toUpperCase()) {
    senhaValido = false
  }

  for (var i = 0; i < senhaUser.length; i++) {
    if ('0123456789'.indexOf(senhaUser[i]) === -1) {
      senhaValido = false
    }
    if (`\|!¹@²#³$£%¢¨¬&*()-_=+§´[{}]ªº^~<,>.:;?/°`.indexOf(senhaUser[i]) === -1) {
      senhaValido = false
    }
    if ('`'.indexOf(senhaUser[i]) === -1) {
      senhaValido = false
    }
  }

  if (!senhaValido) {
    divErroSenha.innerHTML = `A senha deve conter uma letra maiúscula, uma minúscula, um número e um carácter especial.`
  }

  if (emailValido && senhaValido) {
    return true
  }

  return false
}