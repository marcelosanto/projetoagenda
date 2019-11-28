import validator from "validator"

export default class Contato {
  constructor(formClass) {
    this.form = document.querySelector(formClass)
  }

  init() {
    this.events()
  }

  events() {
    if (!this.form) return
    this.form.addEventListener("submit", e => {
      e.preventDefault()
      this.validate(e)
    })
  }

  validate(e) {
    const el = e.target
    const nomeInput = el.querySelector('input[name="nome"]')
    const emailInput = el.querySelector('input[name="email"]')
    const telefoneInput = el.querySelector('input[name="telefone"]')

    let error = false

    for (let errorText of this.form.querySelectorAll(".error-text")) {
      errorText.remove()
    }

    if (!nomeInput.value) {
      this.criaErro(nomeInput, "Nome nao pode ficar em branco")
      error = true
    }

    if (emailInput.value) {
      if (!validator.isEmail(emailInput.value)) {
        this.criaErro(emailInput, "E-mail inválido.")
        error = true
      }
    }

    if (!emailInput.value && !telefoneInput.value) {
      this.criaErro(
        emailInput,
        "Pelo menos um dos contatos precisa ser enviado: e-mail ou telefone."
      )
      error = true
    }

    if (!error) el.submit()
  }

  criaErro(campo, msg) {
    const div = document.createElement("div")
    div.innerHTML = msg
    div.classList.add("error-text")
    campo.insertAdjacentElement("afterend", div)
  }
}
