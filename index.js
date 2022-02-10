function addWorkCard(params) {
  const template = document.querySelector("#portfolio-card-template"); //Lo que clonamos (id)
  const container = document.querySelector(".portfolio-content"); //A donde va (class)

  template.content.querySelector(".portfolio-card-title").textContent =
    params.title;

  template.content.querySelector(".portfolio-card-text").textContent =
    params.description;

  template.content.querySelector(".portfolio-img").src = params.image;

  template.content.querySelector(".portfolio-card-link").href = params.image;

  const clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function getWorks() {
  return fetch(
    "https://cdn.contentful.com/spaces/mk4vl3fftmmq/environments/master/entries?access_token=SXu-PORzNC9pHdn90ZtvT9MQwv8TM4ufqe50AupUxNw&&content_type=work"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const fieldsCollections = data.items.map((i) => {
        return {
          title: i.fields.titulo,
          description: i.fields.descripcion,
          imageID: i.fields.imagen.sys.id,
          includes: data.includes.Asset,
        };
      });

      fieldsCollections.forEach((x) => {
        let idEncontrado = buscarAsset(x.imageID, x.includes);
        x.image = idEncontrado.fields.file.url;
      });
      return fieldsCollections;
    });
}

function buscarAsset(assetID, includes) {
  const encontrado = includes.find((inc) => {
    return inc.sys.id == assetID;
  });
  return encontrado;
}

function main() {
  getWorks().then(function (works) {
    for (const w of works) {
      addWorkCard(w);
    }
  });
  const header = document.querySelector(".seccion-header");
  headerComponent(header);

  const contactForm = document.querySelector(".seccion-contacto");
  contactComponent(contactForm);
  
  const footer = document.querySelector(".seccion-footer");
  footerComponent(footer);
}
main();
