const fnc = require('../function/function');
const { mockRequest, mockResponse } = require('../util/interceptor')
const controller_callrequest = require("../controller/CallRequest");
const controller_other = require("../controller/ControllerOther");
const controller_desafio = require("../controller/ControllerDesafio");

  test('GET / llama un episodio y espera una respuesta ok = 200.', async (done) => {
    let req = mockRequest();
    req.params.id = null;
    req = "https://rickandmortyapi.com/api/episode/27";
    const res = mockResponse();

    await fnc.CallApiRequest(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    done();
  });

  test('GET / función para buscar la cantidad de veces que aparece un caracter.', async (done) => {
    const res = mockResponse();

    var intCount =  await fnc.ContarCaracteres("VALOR","L", res);;

    expect(intCount).toBe(1);
    done();
  });

  test('GET / busca el lugar de origen de un personaje.', async (done) => {
    const res = mockResponse();

    var StrResponse =  await controller_other.getLocation("https://rickandmortyapi.com/api/character/2", res);;

    expect(StrResponse).toBe("Earth (C-137)");
    done();
  });

  test('GET / valida que esté funcionado el desafío 1.', async (done) => {
    let req = mockRequest();
    req.params.id = null;
    const res = mockResponse();

    await controller_desafio.getdesafio1(req, res);;
    expect(res.status).toHaveBeenCalledWith(200);
    done();
  });

  test('GET / valida que este funcionado el desafío 2.', async (done) => {
    let req = mockRequest();
    req.params.id = null;
    const res = mockResponse();

    await controller_desafio.getdesafio2(req, res);;
    expect(res.status).toHaveBeenCalledWith(200);
    done();
  });


