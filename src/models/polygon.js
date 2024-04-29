fetch("https://api.polygon.io/v3/reference/exchanges?asset_class=crypto&locale=global&apiKey=yUt1yNqcXtPRDxFKPsoZBeBRSc0lTsAm")
  .then(function(response) {
    return response.json();
  })
  .then(function(datos) {
    console.log(datos);

  })

const polygon = {
  poly: (res,req) =>{
    res.send("hola");
  }

}
module.exports = polygon;
