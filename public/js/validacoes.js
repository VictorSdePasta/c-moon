function cadastrar() {
  let nomeUser = inptNome.value.trim()
  let emailUser = inptEmail.value.trim()
  let senhaUser = inptSenha.value.trim()
  let confirmarSenhaUser = inptConfirmarSenha.value.trim()

  if (nomeUser == "" || emailUser == "" || senhaUser == "" || confirmarSenhaUser == "") {
    if (nomeUser == "") { divErroNome.innerHTML = `O campo nome está vazio.` } else { divErroNome.innerHTML = `` }
    if (emailUser == "") { divErroEmail.innerHTML = `O campo email está vazio.` } else { divErroEmail.innerHTML = `` }
    if (senhaUser == "") { divErroSenha.innerHTML = `O campo senha está vazio.` } else { divErroSenha.innerHTML = `` }
    if (confirmarSenhaUser == "") { divErroConfirmar.innerHTML = `O campo confirmar senha está vazio.` } else { divErroConfirmar.innerHTML = `` }
  } else {
    divErroNome.innerHTML = ``
    divErroEmail.innerHTML = ``
    divErroSenha.innerHTML = ``
    divErroConfirmar.innerHTML = ``

    if (senhaUser != confirmarSenhaUser) {
      divErroSenha.innerHTML = `As senhas não coincidem.`
    } else if (validarNome() && validarEmail() && validarSenha()) {
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
            }, 3000);
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

          window.location = "./dashboard/feed.html";
        });

      } else {
        console.log("Houve um erro ao tentar realizar o login!");
        resposta.text().then(texto => {
          console.error(texto);
          divErro.innerHTML = `Email e/ou senha estão incorretos.`
        });
      }

    }).catch(function (erro) {
      divErro.innerHTML = `Algum erro inesperado ocorreu, tente novamente mais tarde.`
      console.log(erro);
    });
  }
}

function validarNome() {
  let nomeUser = inptNome.value.trim()

  if (nomeUser == '') {
    divErroNome.innerHTML = `O campo nome não pode estar vazio.`
    return false
  } else if (nomeUser.length < 3) {
    divErroNome.innerHTML = `O nome deve ter pelo menos 3 letras.`
    return false
  }

  divErroNome.innerHTML = ``
  return true
}

function validarEmail() {
  let emailUser = inptEmail.value.trim()
  let atPosition = emailUser.indexOf('@')
  let emailValido = false

  if (atPosition >= 0) {
    for (let i = 0; i < emailUser.length; i++) {
      if (emailUser[i] == '.' && atPosition < i) {
        emailValido = true
        break
      }
    }
  }

  if (!emailValido) {
    divErroEmail.innerHTML = `Digite um email válido.`
    return false
  }
  divErroEmail.innerHTML = ``
  return true
}

function validarSenha() {
  let senhaUser = inptSenha.value.trim()
  let temNumero = false
  let temCaracter = false
  let senhaValido = true

  for (var i = 0; i < senhaUser.length; i++) {
    if ('0123456789'.indexOf(senhaUser[i]) != -1) {
      temNumero = true
    }
  }
  
  for (var i = 0; i < senhaUser.length; i++) {
    if (`|!¹@²#³$£%¢¨¬&*()-_=+§´[{}]ªº^~<,>.:;?/°`.indexOf(senhaUser[i]) != -1) {
      temCaracter = true
    }
  }
  
  for (var i = 0; i < senhaUser.length; i++) {
    if ('`'.indexOf(senhaUser[i]) != -1) {
      temCaracter = true
    }
  }

  if (!temNumero || !temCaracter || senhaUser.toUpperCase() == senhaUser || senhaUser.toLowerCase() == senhaUser) {
    senhaValido = false
  }

  console.log(senhaUser)
  console.log(temCaracter)
  console.log(temNumero)

  if (!senhaValido) {
    divErroSenha.innerHTML = `A senha deve conter uma letra maiúscula, uma minúscula, um número e um carácter especial.`
    return false
  }

  divErroSenha.innerHTML = ``
  return true
}