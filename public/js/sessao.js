function validarSessao() {
  let id = sessionStorage.ID_USUARIO;
  let nome = sessionStorage.NOME_USUARIO;

  if (id == null || nome == null) {
    window.location = "../login.html";
  }
}

function limparSessao() {
  sessionStorage.clear();
}