function addWorkCard(params) {
  const template = document.querySelector("#portfolio-card-template"); //Lo que clonamos (id)
  const container = document.querySelector(".portfolio-content"); //A donde va (class)

  template.content.querySelector(".portfolio-card-title").textContent =
    params.title;

  template.content.querySelector(".portfolio-card-text").textContent =
    params.description;

  template.content.querySelector(".portfolio-img").src = params.image;

  template.content.querySelector(".portfolio-card-link").href = params.url;

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
          url: i.fields.url,
          imageID: i.fields.imagen.sys.id,
          includes: data.includes.Asset,
        };
      });

      fieldsCollections.forEach((x)=>{
        let idEncontrado = buscarAsset(x.imageID, x.includes);
        x.image = idEncontrado.fields.file.url
      })
      return fieldsCollections;
    });
}

function buscarAsset(assetID, includes){
  const encontrado = includes.find((inc)=>{
    return inc.sys.id==assetID
  })
  return encontrado
}


function main() {
  getWorks().then(function (works) {
    for (const w of works) {
      addWorkCard(w);
    }
  });
}
main();

// https://images.ctfassets.net/{space_id}/{asset_id}/{unique_id}/{name}

//"url": "//images.ctfassets.net/mk4vl3fftmmq/17jXaOkUE7NcfF4G3Dupgc/8b9770439c5f1458e9f4184beb353ccd/fb38364f5493e59037964f95bd7b89bb.jpg",
//"url": "//images.ctfassets.net/mk4vl3fftmmq/6JyDipUbbxguAPIEXOvVlg/32c6988ad5ba59cffe1da39051a117da/be4a80fcfcfd9c2e3901470bf20f3aa4.jpg",
//"url": "//images.ctfassets.net/mk4vl3fftmmq/m1AS9WZVA4JoCZeoiYdj7/d41426e1ca57232c3087000c2b7443d4/ebdb66d4df954219b8bd943d9d1356a6.jpg",
// images.ctfassets.net/mk4vl3fftmmq/ + fields.imagen.sys.id +

//data.includes.asset.fields.file.url
