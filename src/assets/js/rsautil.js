var RSAUtil = {
  getRSAKeys: function () {
    var RSA = new JSEncrypt();
    var publicKey = RSA.getPublicKey();
    var privateKey = RSA.getPrivateKey();
    let obj = {
      publicKey,
      privateKey,
    };
    return obj;
  },

  encodeByRSA: function (str, publicKey) {
    let RSA = new JSEncrypt();
    RSA.setPublicKey(publicKey);
    return RSA.encrypt(str + '');
  },

  decodeByRSA: function (str, privateKey) {
    let RSA = new JSEncrypt();
    RSA.setPrivateKey(privateKey);
    return RSA.decrypt(str + '');
  },
  test: function () { },
};