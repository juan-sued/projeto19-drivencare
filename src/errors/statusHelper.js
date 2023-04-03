const STATUS_CODE = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
  UNPROCESSABLE_ENTITY: 422,
  CONFLICT: 409,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401
});
const STATUS_TEXT = Object.freeze({
  CREATED: 'created',
  BAD_REQUEST: 'bad request',
  OK: 'Ok',
  CONFLICT: 'already exists',
  UNPROCESSABLE_ENTITY: 'unprocessable entity',
  NOT_FOUND: 'Not Found',
  UNAUTHORIZED: 'Not Authorized',
  SERVER_ERROR: 'Intern error'
});

function badRequestResponse(response, text = STATUS_TEXT.BAD_REQUEST) {
  return response.status(STATUS_CODE.BAD_REQUEST).send(text);
}

function createdResponse(response, text = STATUS_TEXT.CREATED) {
  return response.status(STATUS_CODE.CREATED).send(text);
}

function okResponse(response, content = STATUS_TEXT.OK) {
  return response.status(STATUS_CODE.OK).send(content);
}

function serverErrorResponse(response) {
  return response
    .status(STATUS_CODE.SERVER_ERROR)
    .send(STATUS_TEXT.SERVER_ERROR);
}
function notAuthorizedResponse(response, text = '') {
  return response
    .status(STATUS_CODE.UNAUTHORIZED)
    .send(STATUS_TEXT.UNAUTHORIZED + ' - ' + text);
}

function conflictResponse(response, text = '') {
  return response
    .status(STATUS_CODE.CONFLICT)
    .send(text + ' ' + STATUS_TEXT.CONFLICT);
}

function unprocessableEntityResponse(
  response,
  text = STATUS_TEXT.UNPROCESSABLE_ENTITY
) {
  return response.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(text);
}
function notFoundResponse(response, text = STATUS_TEXT.NOT_FOUND) {
  return response.status(STATUS_CODE.NOT_FOUND).send(text);
}

export {
  badRequestResponse,
  createdResponse,
  okResponse,
  serverErrorResponse,
  unprocessableEntityResponse,
  conflictResponse,
  notFoundResponse,
  notAuthorizedResponse
};
