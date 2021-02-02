interface responseBody {
  code: Number;
  msg: string;
  data: any;
  _status?: Number;
  _headers?: any;
}
const responseBody: responseBody = {
  code: 200,
  msg: '',
  data: {}
}

export const builder: any = (data, msg, code = 200, headers) => {
  responseBody.data = data
  if (msg !== undefined && msg !== null) {
    responseBody.msg = msg
  }
  if (code !== undefined && code !== 200) {
    responseBody.code = code
    responseBody._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  // console.log()
  return responseBody
}

export const getQueryParameters: any = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}
