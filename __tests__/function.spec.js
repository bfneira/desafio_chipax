const fnc = require('../function/function');
const { mockRequest, mockResponse } = require('../util/interceptor')
const controller_callrequest = require("../controller/callrequest");

  test('GET / llama un episodio y espera una respuesta ok = 200', async (done) => {
    let req = mockRequest();
    req.params.id = null;
    req = "https://rickandmortyapi.com/api/episode/27";
    const res = mockResponse();

    await fnc.CallApiRequest(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    done();
  });

  test('GET / validar si retorna un entero', async (done) => {
    let req = mockRequest();
    req.params.id = null;
    req = "https://rickandmortyapi.com/api/episode/27"
    const res = mockResponse();

    intCount = await controller_callrequest.get(req,"E",res);

    expect(intCount).toBe(1);
    done();
  });



