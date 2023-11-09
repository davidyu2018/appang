class ConfigureManage {
  constructor(cacheModel) {
    this._CONFIG_LIST = [];
    this._CONFIG_HASH = {};
    this._cacheModel = cacheModel;
  }
  list() {
    return this._CONFIG_LIST;
  }
  set(name, value, option) {
    var options = option, val = null, obj = {
      propName: name,
      displayName: options['name'] || name,
      editable: options['editable'] || false,
      value: val
    };
    if (typeof name === 'object') {
      for (var i in name) {
        this.set(i, name[i], {});
      }
      return this;
    }
    if (typeof value === 'function') {
      val = options && options['notInit'] ? value : value();
    } else {
      val = value;
    }
    if (this._CONFIG_HASH[name]) {
      for (var i = 0; i < this._CONFIG_LIST.length; i++) {
        if (this._CONFIG_LIST[i]['propName'] === name) {
          this._CONFIG_LIST[i] = obj;
        }
      }
    } else {
      this._CONFIG_LIST.push(obj);
    }
    var cacheModel = this._cacheModel;
    if (cacheModel === 'window') {
      window[name] = this._CONFIG_HASH[name] = val;
    } else {
      if (cacheModel) {
        cacheModel[name] = this._CONFIG_HASH[name] = val;
      } else {
        this._CONFIG_HASH[name] = val;
      }
    }
    return this;
  }
  get(name) {
    return this._CONFIG_HASH[name] || null;
  }
  update(name, value) {
    if (this.get(name)) {
      this.set(name, value, {});
    }
    return this;
  }
  excute(name) {
    let val = this._CONFIG_HASH[name] || null;
    return val && typeof val === 'function' ? val() : val;
  }
}
export const configManger = (ConfigureManage) => {
  const privateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMRV/qnyB1L0ALor1voQA8CSbsCKfNZ6DbHqsAtg/5dKtWESM+s1jTUvdMadOtVmmodmMCva3HaxoOHVqTw1xEwJ35QGlbastTkukmg0Aa87twACuNHH4riMYaQTHDoX4ETpoxX+fT7wlTa6CxLw1zR2CVPs5mDzWQWw/0CG3ustAgMBAAECgYApPkNT4eLF+znX4fOz7f9Lybb4PV9CErujv0Ah88tdNbVqYc+EPmieXoyyWD8OqxIVFVNTMxOS33eDWUXGvyivzhP+jzyhaB+ggNVWFVVJA7GoTFVRioL0i/S92B6PFI2XB/k86/UB03pHswyQP+phFzYGW+bOgcLSjHZ7UcF+pQJBAO8k9cQWKIch2PSop2ld7mvIW7BTiJpumhauw4blK6d2ZXcjdLnLpn5tj7qhoyHuHQwxiZWM2YV6EqRhFFTFxHcCQQDSLJ0L+T+yv+/Yz97BKviPnhZw0xL+jBsO+Tn5fdNz/W70WAFroiWckYx0zGUR5bT/KQDrYgm71ZvepmVQ0ip7AkAfyzElfbCrrpNSi62eM4/EIqIWAjUSGww/YcK7B3LTU8lPmpYlMW8UNeq67Exs8WRJP7jD+jLdLQqXchSq5JQnAkEAjPB18A2Y9ZlYkZ/z1L2oKUbt7YLd/eyeSJBAnFoQbnvI5/oMGc2GQ1QnSDu4myPbGDC6+R2pQVihSdFzp5sH+QJAZ1/SPbTv+ZERRa0fVc+6S7/EDZxzXgW+cq8gMK2YI53f0BVjBaiq0F/J8w+2Lb9/0ei3YG7rWz6xgKe9CsjEJg==';
  const username = RSAUtil.decodeByRSA('OCXB14dEyYyGN2CoaOiE6X/yF9l3nk2bxznf4hbXsJE5Wwq2t1eaQOYoUX6jts2pjvPiiRCYGVEIZv/HxtfYdoJ3J3opzL+VYT5hLosYaMBO3LV/gufuoATOVGjtGSgDEe/ejNRuTqf7FjSRnWEz2y9KWyygS2VTLICKX0HwKKI=', privateKey)
  const password = RSAUtil.decodeByRSA('pm43vJIzZincNVN9ODZulhRcj6GnSy3kpEufjh40xvX7MpLPE+UQLLkouWsVg4Kzsikkxk3moCcca3apCPH5eCR3gUIu0W9Cu+N5flcRSTRkJBDdatlC/FXJb+eQwhymk1pekbUQc/MuvItGiYz0BDhTX0N3yVYC9PdCybc8CY8=', privateKey)
  const grafana = RSAUtil.decodeByRSA('WqHM2tivjnqhQ/CMv8uyQjA8m/383UjgYfataotV4GLOTnT0POxfcQRP6V2r60tvr4n6l+3eNhJYjilrK8HLk+M8jIzVhm8pfwaVXewmTfm8kHSIcVYrUetgSG5w9lHzE4ri4g6yZ6duXckMa1gB2JGHwUjHxF1JBJ4ZQYmkj0c=', privateKey);
  var configs = new ConfigureManage('window');

}