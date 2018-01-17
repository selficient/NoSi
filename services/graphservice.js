/*
  Beschrijving
*/

//De functie returnd een object ()
function graphService(){

  return {

    voorbeeldRoute(req, res){
      /*
      req is de request, https://expressjs.com/en/4x/api.html#req
      res is de response, https://expressjs.com/en/4x/api.html#res

      Als je naar 'https://localhost:3000/services/graphservice/voorbeeld?vraag=WhyHelloDidntSeeYouThere'
      Zou dit je response moeten zijn:
      > WhyHelloDidntSeeYouThere
      */

      const vraag = req.query.vraag;
      res.send(vraag);

    }
  };
}

module.exports = graphService();
