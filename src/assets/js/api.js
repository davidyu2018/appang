import { environment } from "../../environments/environment"
export const getBaseUrl = (domainType) => {
  let finallyBascUrl = ''
  if (domainType === 'LOCAL_FILE') {
    return finallyBascUrl = `http://${window.location.hostname}:${window.location.port}`
  }
  switch (environment.BUILD_ENVIR_FLAG) {
    case 'DEV':
      if (domainType === 'API_SOURCE') finallyBascUrl = 'http://jsonplaceholder.typicode.com'
      else if (domainType === 'IMAGE_SOURCE') finallyBascUrl = 'http://jsonplaceholder.typicode.com'
      else if (domainType === 'FILE_SOURCE') finallyBascUrl = 'http://jsonplaceholder.typicode.com'
      else finallyBascUrl = 'http://jsonplaceholder.typicode.com'
      break
    case 'UAT':
      if (domainType === 'API_SOURCE') finallyBascUrl = 'http://jsonplaceholder.typicode.com'
      else if (domainType === 'IMAGE_SOURCE') finallyBascUrl = 'http://rap2api.taobao.org'
      else if (domainType === 'FILE_SOURCE') finallyBascUrl = 'http://rap2api.taobao.org'
      else finallyBascUrl = 'http://rap2api.taobao.org'
      break
    case 'PRD':
      break
  }
  return finallyBascUrl
}