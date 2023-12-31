/**
 * 解析blob响应内容并下载
 * @param {*} res blob响应内容
 * @param {String} mimeType MIME类型
 */
export function resolveBlob(res, mimeType) {
  const aLink = document.createElement('a')
  var blob = new Blob([res.data], { type: mimeMap[mimeType] })
  // //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  var patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
  var contentDisposition = decodeURI(res.headers['content-disposition'])
  var result = patt.exec(contentDisposition)
  var fileName = result[1]
  aLink.href = URL.createObjectURL(blob)
  aLink.setAttribute('download', fileName) // 设置下载文件名称
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink)
  window.URL.revokeObjectURL(aLink.href)
}
/**
 * 代码生成并下载为zip
 * @param {String} url 链接
 * @param {String} tables 表名
 */
export function genCodeZip(url, tables) {
  pureAxios({
    url: url,
    method: 'get',
    params: { tables: tables },
    responseType: 'blob'
  }).then(res => {
    resolveBlob(res, mimeMap.zip)
  })
}