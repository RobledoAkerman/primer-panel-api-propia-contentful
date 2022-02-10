function contactComponent(element) {
  const componentEl = document.createElement("div");
  componentEl.innerHTML = `
    <div class="seccion__contacto">
      <div class="contacto__contenedor-form">
        <h2 class="contacto__title">Escribime</h2>

        <form action="" class="form">
          <div class="contacto__fieldset">
            <label for="nombre" class="label">Nombre</label>
            <input id="nombre" name="nombre" class="input-nombre" type="text" />
          </div>
          <div class="contacto__fieldset">
            <label for="email" class="label">Email</label>
            <input id="email" name="email" class="input-email" type="email" />
          </div>
          <div class="contacto__fieldset">
            <label for="mensaje" class="label">Mensaje</label>
            <textarea id="mensaje" name="mensaje" class="input-mensaje"></textarea>
          </div>
          <button class="boton">Enviar</button>
        </form>
      </div>
    </div>
    `;
  element.appendChild(componentEl);
}

function postData() {
  const form = document.querySelector(".seccion-contacto");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    const mensaje = `
    Enviado por: ${value.nombre}; <br><br>
    Email: ${value.email}<br><br>
    mensaje:
    ${value.mensaje};
    `;

    fetch("https://apx-api.vercel.app/api/utils/dwf", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        to: "danielaakerman14@gmail.com",
        message: mensaje,
      }),
    })
      .then(() => {
        alert("Gracias por escribirme!");
        document.querySelectorAll(".form__input").forEach((input) => {
          input.value = "";
        });
      })
      .catch((err) => {
        alert("Ha ocurrido un error, intentalo nuevamente");
      });
  });
}
postData();
