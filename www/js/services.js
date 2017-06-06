angular.module('starter.services', [])

.factory('Products', function() {
  // Might use a resource here that returns a JSON array

  var operators = [{
    id: 0,
	cmd: 'pulsa',
    kode: 'S',
	name: 'TELKOMSEL',
	info: 'Paket pulsa & data',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACEUExURf///zIuMaqvsiAcHhcWFgECAd8AAt4HEyQhIywoKoCChUpKTNcAA77CxnZ4emdqbOgDDLa6vpucoEE+P97h5Do4Ov/+/lNUV/KeoeqGiRYECPnKy+Fzd/729ZWRlPcDE3wHDPTy8uZFSPa3tkxqasfIytsdJ+cyNd5TWTwAAO3MysTZ1GuJ7VEAAAFeSURBVDjL7ZTrboMwDIUd4qROAoFCWxilrPfd3v/9FkI31q5TIu3nZgkR0KfjY8cJwF+KeRILMoX5IoZMiBShjUGVIn6CvAyTVnHj3+H0qKqm6QbLAfLZPZ1M5VmEmtA9AWzSNJXFiwioygZgd4AVwMrUJex+BBd9s5q+KiSy/V0fWWUSpzfBbGibqb+TNScFHtw0Dy6azRvRQC9vJRmysehOynQozJUm0Ciiqr/upuGocL13y72cjfG4FQSZ5ZhfoYYvrYV96rKfR7CYzVqhXTqD+itZcuUdPQC8phfRYiuYV7n2qlF9DN36M78YRCGrTzdWvQD0E+qcov91uw2aedVSTWjr0TvzlfhOl2jXUhZDbMf8dyMbyqW2P9RC4PGY54FxIe6amGVRh4Wq2FNdEbvkzUOoVjQyLKi6YG6HnaSJuDM0d2NHrY5xy9yFwau4u4UhX2aRXdBz+I9fxjuTJRH0MoEBKwAAAABJRU5ErkJggg=='
  }, {
    id: 1,
	cmd: 'pulsa',
    kode: 'XL',
    name: 'XL',
	info: 'Paket pulsa & data',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAGJUExURf///wUydwI6ggA/iQBDjgQ2e8/W4wM3fgBGkQA7gwE/hgI4gAA8hgBAiwU0eQAzfAkwdP//AQ0rbAA7mwsucQAcZwJGmC1HbwolaAMrcQA/lRNTmAQpbAIudQBDkQw5fQofYQAXYA84eInIN3KuSJLPRKDUYiVHgozKQf/9xjVLcgEPVRIzcgA+jo7ONwAicpPPUAA+oB5cm/381/76nP/5TWhnZmJiYD5Pdyw/dyJLiAAbbRBLigE7kQ9Pkv/9aP/+rfn4tfz6v0dWfSlDfRgtaiNKh5zTVVB8l63bd/z765bQW/r6zv373sHjjW9vbYCBgGl2mcDFzuvv8pbYMQAzhjVrjO/xEv//e/39NP/2F/z3ebHcgsrppHZ2dfb4+dvg5ZCRkJSet1qRVqa8OqTdQQVIpanhRC5pp2miaqTbauXrG5+muFVhhaiqqpqcnNHU1bK1tTVdYEqDXBFHgGSLhcLPJbHoQG6XrypZgWWQr+TqtAAfhPrxBHSaheruov/0AOboaZPEQV6vxKMAAAKjSURBVDjL7ZRZV9pAGIbJ1myTEAlQIJBGJSBqUGQp1IILCFbEfd+tVat23/fln/cbY3vqQC9673M1Oec5czIz7/t5PDdc8bBYKtVqyWSyXr+HqddhnazVSqXFA8IcsEKhaDgcoyivi0rFYuFoNGR1V6+Zy1OWz+fXKJWTZVpEIkDLPKdSmt8XGrim3poK+f1YBI9hFIVhGAmJIGOXUAf9Ki+LjMIKl+jCUTzCKopE8yrVTaga97e5Zq/EHcQoDKI5Uu2heBoprKvqZ8fpdNwrSywriTIXIFRVRowTiUSCQSFYeW/3puMxVWRN/AttKo2cyghgZIKVU7svHQ9zoLKMKBPqHU6U9EddwOa3TPC0YdugSqbAKogeJVReZMyTi66t/NjG45HjxLAdH/Ii0zSdDiocSjcu8tu58YlUI5FoxAd73twHJLGTKmTWxnITk6nsXPNBYrivrxdYeb0a6KQK+vT45GyrNTu8A64NbjrdE+ukmoKQ+ZTKzsy05ppz7r4rR6PR7rYbYPD9Zz5gNZtN7OzunDdh40DoH+rlD2Rbs6nvzd1d2LjxKhANk0/gxe96dazU5ETu5/n06BAQDVOkSkFa9JH1y8v6PJ7bzl+cfYlRkFhKDbTHxTHW3Sc42RjLb/34+nGVhsxypDqoqXzZfdi3uj69iVfvygiHUCXz6qc4+n7FMIygDqcLwsKoOBKCaGuk6tOgLquoXHZY02RNiGPZgT1xZQh1CpcQqoUkBQIOQL8g1lAXzddWQ3BVDvqFJAlKyCCEO4tNQvWUfpebl2na7TaIquZvK7dnybLcieH18rwM8DA08MwIWdYiMYiWFqvVYrG/v//2H+CjWKw+fbJ/3dxffvHy+eHC3vx8oXAXUygU5vcWFg6fLR0s30z0/+YXxPxy0V9XpiIAAAAASUVORK5CYII='
  }, {
    id: 2,
	cmd: 'pulsa',
    kode: 'I',
    name: 'INDOSAT',
	info: 'Paket pulsa & data',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADnUExURf///78+AONgAODKMwCcveI+AOA7AODAAACgwN+7AOBAAKhcMgCWueEzAOFVBd1EBNwyAM42ANtoN5xgRdytjWm/1t4sAMpWDgGnz9c9ALrb5TyzyOPeo+TlyiSlw+PYfRGjwQCgx+bKBHZ4dsNtCOHSbqTV39+/FeLSxuLAqeDQU063zYPJ1uCaAC6ZsrNnGrVMHtzJuePit9Wkg/n7+5TS2t1LEtqVcd60Hld0d9SSBJVSSuKtAN8UAOHajtaWedQOAODu8N6IY9+uRJOgnWGBg93IF+BwADqTpMZEDbp+JeTbyMFrMqPImzYAAAFwSURBVDjL7ZRZc4IwFIUTwAAJgshqsYqKu1Wr1qrd9+X//6BeoJ3pDEsz08f2PGa+Se49594g9Gd0esONGrc2J2m71TonWq8SY8RFjgip1NZc6LhGKWcFNqDEKAGOgsAZbNJSKa00ksNVXxT7GXSgSaDWDCE9Rk2EmuJQBYnZa1uSoiiSFjoeoYTWHkRVlUFqM4vehTGrKOESm4agn8iJ1HZutVLMduZvGEdfqNovaC2uwZ+bGHuAdoEcXhfaMJX81x7D2BC8xQHYZollsz1jlrWMFsy6iHal9rcP7MJiCw941puXgMfPanf3HglCAy/Zk9/RzgpJEZzsXuoxavZ8cFkqYFepk99QRdGmuXcOP01/EXRA950kEM3JQePXZYh8okOulepjIGlJ1INs76oczwY46cEQUhfSc0IYIa2V09NkkuZ97qaTFWftTIPZT6O95V+Yey50syXUXXMuN+FdbuiL+8tAxtWY+3uz0b9+qQ9grh6yz+loGQAAAABJRU5ErkJggg=='
  }, {
    id: 3,
	cmd: 'pulsa',
    kode: 'T',
    name: 'THREE',
	info: 'Paket pulsa & data',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAFrUExURf///yIeXHyBsanQ6i4dXRgSUQZRtJCx1WOYzD9On1h+tjhvtgI5m0OV1AE8q3FgmJ+RvvT5/GRakrvC2EM7dsLn9vD1+pCgy9rr9J7J5YWgyhBpxQIcdRdmvAAxkneWxrCfynxwozsuaqyqzjWs542KuL/b7YCHvjk+jiec4Xe+5nmx26a828zW6Pn8/qrK5AAojGmu3iZsvMfk8dTi7kuKyaGz08rL3qGZw4TR8VtGgiMQU6fY75SXxLS50Z6rzzIsek1Ihrji9L/Q45TU8WV7vElTiU1UngBFsbXV6pu931pgqFmg1zRYpRBZthBNpGyCvQAifBdBkZCqzidgrYvA4rDj9k6+7Eak4Dg0hjGEzmOm3CNtyDWHyGZipgkYXhWU3a+y1FVjrVq35p3W7yhDl1NqspG229Pq87LF4HSkzlWKyzp8xebv9r+91HZpnVxThm/K7yQncRWD2Mf1/UJjq1RjnAAsf0dYo98VXx4AAAHjSURBVDjL7dTVbuNAFAbgMWMcdtBxmJkb2EDDnDQpM1O6DI+/foA4lnrVix5ppLn49M+cOdIA8FnvL94IQPO21QTAvB2aH8HtTejyMuT1HsR5vzzc7a9UKptN1TIe/wyFvDtGRE5GkRWOc+nUy+vo9CR16D3Yr8hlJkgHy73mcE4IS9nhm+87cqGDFcssl7mJIOAc1zsNH7Zkad7qz/oz2fU6k7JNcG4UNu7L9rUb3SMIQlpmlYD3JpW4dqDwsk8WspfOMZWMMaIgCYRkyUiS+dWMEArU8jIlGQc7FU5SCvP6gjwv7POkw8HiZ4iCtYqDB5FeOJJs+tiS2G71+T0xSj4zyemZpZ/dbNZ6EGjPQF7axmj7nFymVRlS5ppgSP2j7uOSrdHzv2MkN+oT2o3yqhEcDrvWaBxkn8Z3dpomIo8EvzHVh0Fw1XclHc+bqLF9ZmcSvHVjKtBAENyAPQCYrinq7kJckAktvVEWCnUU0p2fB7oURQXhP6bf1lisJtOVDnUVDfWjo2CwDnc6s7YYNck8qMdZdmtchoavikGBi871fdtUkKFvTjWKlb6qv3ncOgz60Q1Utwyq6Cyh5TJqQDEMM9Rg/bahapwadcmNug0uX9Gj+GdoXGqdTv32+Xl+wPoPFsxLGMLq6N0AAAAASUVORK5CYII='
  },{
    id: 4,
	cmd: 'pulsa',
    kode: 'AX',
    name: 'AXIS',
	info: 'Paket pulsa & data',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADqUExURf///90Qefj29eQQe44ZePnFAp87i//1AN0Se5EdeP/7AumHu+MwjMqZwogdd/rYKP7kHNwFcv70Genoydy+1+dMnL15r/nKFNoHgvrQJNmkyvShy/bxWooUcpQlffq+ALcXee/wqfTyeu3gp/i92+ppq6dNlP/rBL1ySa5QVaE5YvHd6+yRwbkshc+tzPLq8vvVBPnJH9CZJvzXF/DaDOm00+lepfDei6ZamsKQu+/TSLlEkvPTUvTrbN8hbLNkpfSZI86WPMd6NLdfRt0jhPPaXfFurs0UevfqQOHLkeZKVc9pPLNgguM+lHHftyoAAAFbSURBVDjL7ZRpV4JAFIZHYhjBCEQSMJHUkkVxX3PX9vr/v6cZtNLOmZvf6/l0D/Pw3ssAg9CfonBDqfPXhe9yesUQuGrdNPeVOm1kKA1ALajNpJrEj7eU4YDrUjW/ZPI4vkwY8oelas2VxpIbn+9o8WMn+VrJdd2L67M0I1XgbwJNLYmyTNUUI5sBNvRLTUJBVZWO1Aagmjv1aa8OoFcqyUxN757qHjJbTBVlFmrb4KioKcnJqLZtLxZZ8JPK01RRtFOvK9xuP4D9l5IcRW+rTq+NsZeDVPU9DLcbXdccC3szsH+wDaNAo6bTwV4VMtebMForuqZpTscC+790g6Cv+Lre6zl0AgH4YbrdvkJ8X5/nRpoFqnd9RSHEf06UmYX5A1QIFQkpft7InzVHyKGJEObugPHDRNURtz2jcniJk1pmolE+5eQxjpsDFE+NpO2NyokHnzEX0D+/8QE2DCL6DGgz8QAAAABJRU5ErkJggg=='
  }, {
    id: 5,
	cmd: 'pulsa',
    kode: 'SM',
    name: 'SMARTFREN',
	info: 'Paket pulsa',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEdUExURf///9IYIccZI9kUH+IUHdofJP2xBOkXH+g0O+cRGus8IfJYGOIUEfUMCd0FDPF4EeIcI+G1uvhBEeWrsdtCSP7FA+4uEecyH/mQB+NQEN+aoOG8weoiJr0VHd+mqt4nMOcXI9MNFcwgI9ZQVuRYXcMHEc1wdPdlFN8uPOoIDvteCfVODfubCfN4BeWTmeg+ReGAhufd0bk9ROaipeXBw/G2V+CHkOBmZNgmEPyoAO5SGtw+D+5sDuY8MNOVnPq/Hfz7+uyrfMwrNu1APenKt+BQOvSFJsqGfP7cBObLx//rAOMCCeuVX+QpGNpdK+4aFMkzGew7GcBNVPGGZOvWpfaeLurYrO9vK6AYIPLo6+pSN+/elOyVAuaAEO3EcxdRqEQAAAGGSURBVDjL7ZTVcsJAFIaJEk8IxLAEd3dpcSte9/d/jDItTCUpyRVXfFe7Z77ZOeffnbXZzpwOj9OdzWZLDjMvj3m9Gr5D49SQ+3/PHbbj9gMaDAWCUWPxsg/Bmt2L7cjlchgWRwDQVzQSfREAgRPh8nfJb6xGN0EEgTHnz5o/APqudWatpSAUlf9VK6gAGNHlsF7KLPV14nCBTjszm617I0JA0PPXLNMpNDP4XJaSSfSqMb7vkTwBBfRpYXxy+7zvRIzJQloQUDnGIX6d6UzQNLMfaLSUJHI6FVBUvvDop0eYxPyQdTQCQFy6IXQqBaPsGYaOTA6baigev6vcFoyviUkwj0VrTylcD4JgyGHJHTVJCZ5bch1iM0ZoWnhmwX1IkWyzuaXi1SdTdzjOpFm23W71XTvyx+UeqyhtVt4EKBimLo673dUr2ki/QfjaK9EDky5e3iuZTEoUeZ6nS6Y9LxSFTCVjBF41z2LVkgiC0PCyuTqp1zkN5mpWrsMfUlWX5/xxnogPr20sZonmaDsAAAAASUVORK5CYII='
  }, {
    id: 6,
	cmd: 'pln',
    kode: 'PLN',
    name: 'PLN',
	info: 'Token listrik',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACZUExURf////8YAV9drjY11e/0ifH0fvv8Jf//AP8AAAAA/xMY+P9uAeTmM+7xLPz4CP+sAf//alBVxf/iAcbOTZKXhaWlb/9VACAX4/y8CPkNDdbROQsL//LxEiko7f4rArW1Y/9BAHNynm1+qLwAXosAh7u/V4KEk/vSC2Byte3xmentvu/Hi/2IAt4tLI67jLAAac9aR9oAOv+JAAzWANUAAAEsSURBVDjL7dTZcoMgFAbgAE04gGBxiXWLmmbrvrz/wxUa6zhTNNzkLv+FC/PNeM5BXSxuuW5W9C8PgNB6uFvOUQQAyotGRgL1oq9GIi+qNoaGl6iqlG0KYGiqmqAJ4WQvLX3bJk0hg4ZkWDmoZIxnnLEvQ1kfnrHs/j8NWFpRddC2//e4SU76lBxpjB10pfr59/1HoUBiqq24w1i2hgqxbu0cAOPUSTtbXQaj5GaBOGtltea7Xj3m9sAJYw4qA1uhARsRnncXze9W+338PYe25Gma1GUdB1IGRbr9NLTY1xxXri0wdZV27Ny29wGwY3bB2VaZmsd1mhCN0ziHHOsDpYVzCwI6Chpemdmv4DwJ4U8jbyqoL0XUl0ahN53/tp7uRnkZrpbPt7/pdfMDC10aaD/K4VgAAAAASUVORK5CYII='
  }, {
	id: 7,
	cmd: 'game',
	kode: 'FIFA',
	name: 'PAKET GAME FIFA, DRAGONICA',
	info: 'Paket game',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAClUExURf////Lz9OTp6r/FybrAxLe+we3x8rzDxr3Dx7vCxX2Ki+/z9dXa3LK7vsXLzsLIy8rQ03WDg9LX2ff4+ZChoqOwsvv8/Nvh5Ozv8OHk5e72+I2dnp2qrPD8/5amp9re34qYmau0tu7gx70xI/73/r/b3h+rWvOVAxl3tHit0PGkKeHDwshdUtiemNSJg/C5YZTSrz2Lv+/Ggk26e33Kn37LoE67fQG3ue4AAAJCSURBVDjL7ZTZjqMwEEUNlJcCg9kMJkASsvfePdv/f9qUYRJNHvpxHkbqawTS0U3JrroOY1/6l6qCT1XdGYM2V/wTqbwNbsamNQAg/xIqWsujEMB0zR+nRvCAA+DVq2jJK1SAevFuEBGM7rpOG65I5PFWhGiBQIaNdzqOyEsnqqZyruR4rXqFYobckdX/qE1EaAsbiqTFxYsLfLg8LBAyxkSqsHRO6CIutKC6OB9LehgcL5fLMfAQU8E0oAmTpNqQdVNRIeO9ysOgaj8uH+24SgiCZhlg7kLkUxzHE8fQ5eiPBQTf38Pjw7F7eelcDpgx6khZTXERexXxVJUQkQj+OJ1+HoLxdb9/HUuQilFPdFUvTvLWlZbDdjtIffh+Ov06uPF5v38eNU2IgYQy0XHhzfTSSan6ouhVGRxPp+M4jk/7/dOqBAUslZCFScU6OlbXVEmYgTEmIhgcDu7t/ObGcUVQpSylCbbCJXOzEifa61g93J3P590CyRpxRRWE6LbFthMizFDOa4a7x/PjzkOQPGLdoCTkYULjK10S5reEzXD3bbdANXSssWkkKS203yCkaFBcfLMoNB6uaJ8EZZRaytam5tRbjLIsi+grI26HwfKI9iANQSMphrz20Wqw5pHy+aCJUs2p3pLqyafRU2JRWuMc2Ib3FjzxT7qufd4cr9e+N0tubc+v18Cs+2FKvYbatgtsbT3MaBr6tWlutytEu677vq+tuV25wNgZrS2Gd3fWbco8z0t3x2a0cV9/ff+hfgMbEzFsEYRVKgAAAABJRU5ErkJggg=='
  }, {
	id: 8,
	cmd: 'game',
	kode: 'GARENA',
	name: 'PAKET GAME GARENA',
	info: 'Paket game',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAClUExURf////Lz9OTp6r/FybrAxLe+we3x8rzDxr3Dx7vCxX2Ki+/z9dXa3LK7vsXLzsLIy8rQ03WDg9LX2ff4+ZChoqOwsvv8/Nvh5Ozv8OHk5e72+I2dnp2qrPD8/5amp9re34qYmau0tu7gx70xI/73/r/b3h+rWvOVAxl3tHit0PGkKeHDwshdUtiemNSJg/C5YZTSrz2Lv+/Ggk26e33Kn37LoE67fQG3ue4AAAJCSURBVDjL7ZTZjqMwEEUNlJcCg9kMJkASsvfePdv/f9qUYRJNHvpxHkbqawTS0U3JrroOY1/6l6qCT1XdGYM2V/wTqbwNbsamNQAg/xIqWsujEMB0zR+nRvCAA+DVq2jJK1SAevFuEBGM7rpOG65I5PFWhGiBQIaNdzqOyEsnqqZyruR4rXqFYobckdX/qE1EaAsbiqTFxYsLfLg8LBAyxkSqsHRO6CIutKC6OB9LehgcL5fLMfAQU8E0oAmTpNqQdVNRIeO9ysOgaj8uH+24SgiCZhlg7kLkUxzHE8fQ5eiPBQTf38Pjw7F7eelcDpgx6khZTXERexXxVJUQkQj+OJ1+HoLxdb9/HUuQilFPdFUvTvLWlZbDdjtIffh+Ov06uPF5v38eNU2IgYQy0XHhzfTSSan6ouhVGRxPp+M4jk/7/dOqBAUslZCFScU6OlbXVEmYgTEmIhgcDu7t/ObGcUVQpSylCbbCJXOzEifa61g93J3P590CyRpxRRWE6LbFthMizFDOa4a7x/PjzkOQPGLdoCTkYULjK10S5reEzXD3bbdANXSssWkkKS203yCkaFBcfLMoNB6uaJ8EZZRaytam5tRbjLIsi+grI26HwfKI9iANQSMphrz20Wqw5pHy+aCJUs2p3pLqyafRU2JRWuMc2Ib3FjzxT7qufd4cr9e+N0tubc+v18Cs+2FKvYbatgtsbT3MaBr6tWlutytEu677vq+tuV25wNgZrS2Gd3fWbco8z0t3x2a0cV9/ff+hfgMbEzFsEYRVKgAAAABJRU5ErkJggg=='
  },{
	id: 9,
	cmd: 'game',
	kode: 'GEMSCOOL',
	name: 'PAKET GAME GEMSCOOL, CABAL',
	info: 'Paket game',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAClUExURf////Lz9OTp6r/FybrAxLe+we3x8rzDxr3Dx7vCxX2Ki+/z9dXa3LK7vsXLzsLIy8rQ03WDg9LX2ff4+ZChoqOwsvv8/Nvh5Ozv8OHk5e72+I2dnp2qrPD8/5amp9re34qYmau0tu7gx70xI/73/r/b3h+rWvOVAxl3tHit0PGkKeHDwshdUtiemNSJg/C5YZTSrz2Lv+/Ggk26e33Kn37LoE67fQG3ue4AAAJCSURBVDjL7ZTZjqMwEEUNlJcCg9kMJkASsvfePdv/f9qUYRJNHvpxHkbqawTS0U3JrroOY1/6l6qCT1XdGYM2V/wTqbwNbsamNQAg/xIqWsujEMB0zR+nRvCAA+DVq2jJK1SAevFuEBGM7rpOG65I5PFWhGiBQIaNdzqOyEsnqqZyruR4rXqFYobckdX/qE1EaAsbiqTFxYsLfLg8LBAyxkSqsHRO6CIutKC6OB9LehgcL5fLMfAQU8E0oAmTpNqQdVNRIeO9ysOgaj8uH+24SgiCZhlg7kLkUxzHE8fQ5eiPBQTf38Pjw7F7eelcDpgx6khZTXERexXxVJUQkQj+OJ1+HoLxdb9/HUuQilFPdFUvTvLWlZbDdjtIffh+Ov06uPF5v38eNU2IgYQy0XHhzfTSSan6ouhVGRxPp+M4jk/7/dOqBAUslZCFScU6OlbXVEmYgTEmIhgcDu7t/ObGcUVQpSylCbbCJXOzEifa61g93J3P590CyRpxRRWE6LbFthMizFDOa4a7x/PjzkOQPGLdoCTkYULjK10S5reEzXD3bbdANXSssWkkKS203yCkaFBcfLMoNB6uaJ8EZZRaytam5tRbjLIsi+grI26HwfKI9iANQSMphrz20Wqw5pHy+aCJUs2p3pLqyafRU2JRWuMc2Ib3FjzxT7qufd4cr9e+N0tubc+v18Cs+2FKvYbatgtsbT3MaBr6tWlutytEu677vq+tuV25wNgZrS2Gd3fWbco8z0t3x2a0cV9/ff+hfgMbEzFsEYRVKgAAAABJRU5ErkJggg=='
  },{
	id: 10,
	cmd: 'game',
	kode: 'LYTO',
	name: 'PAKET GAME LYTO',
	info: 'Paket game',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAClUExURf////Lz9OTp6r/FybrAxLe+we3x8rzDxr3Dx7vCxX2Ki+/z9dXa3LK7vsXLzsLIy8rQ03WDg9LX2ff4+ZChoqOwsvv8/Nvh5Ozv8OHk5e72+I2dnp2qrPD8/5amp9re34qYmau0tu7gx70xI/73/r/b3h+rWvOVAxl3tHit0PGkKeHDwshdUtiemNSJg/C5YZTSrz2Lv+/Ggk26e33Kn37LoE67fQG3ue4AAAJCSURBVDjL7ZTZjqMwEEUNlJcCg9kMJkASsvfePdv/f9qUYRJNHvpxHkbqawTS0U3JrroOY1/6l6qCT1XdGYM2V/wTqbwNbsamNQAg/xIqWsujEMB0zR+nRvCAA+DVq2jJK1SAevFuEBGM7rpOG65I5PFWhGiBQIaNdzqOyEsnqqZyruR4rXqFYobckdX/qE1EaAsbiqTFxYsLfLg8LBAyxkSqsHRO6CIutKC6OB9LehgcL5fLMfAQU8E0oAmTpNqQdVNRIeO9ysOgaj8uH+24SgiCZhlg7kLkUxzHE8fQ5eiPBQTf38Pjw7F7eelcDpgx6khZTXERexXxVJUQkQj+OJ1+HoLxdb9/HUuQilFPdFUvTvLWlZbDdjtIffh+Ov06uPF5v38eNU2IgYQy0XHhzfTSSan6ouhVGRxPp+M4jk/7/dOqBAUslZCFScU6OlbXVEmYgTEmIhgcDu7t/ObGcUVQpSylCbbCJXOzEifa61g93J3P590CyRpxRRWE6LbFthMizFDOa4a7x/PjzkOQPGLdoCTkYULjK10S5reEzXD3bbdANXSssWkkKS203yCkaFBcfLMoNB6uaJ8EZZRaytam5tRbjLIsi+grI26HwfKI9iANQSMphrz20Wqw5pHy+aCJUs2p3pLqyafRU2JRWuMc2Ib3FjzxT7qufd4cr9e+N0tubc+v18Cs+2FKvYbatgtsbT3MaBr6tWlutytEu677vq+tuV25wNgZrS2Gd3fWbco8z0t3x2a0cV9/ff+hfgMbEzFsEYRVKgAAAABJRU5ErkJggg=='
  },{
	id: 11,
	cmd: 'game',
	kode: 'MEGAXUS',
	name: 'PAKET GAME MEGAXUS',
	info: 'Paket game',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAClUExURf////Lz9OTp6r/FybrAxLe+we3x8rzDxr3Dx7vCxX2Ki+/z9dXa3LK7vsXLzsLIy8rQ03WDg9LX2ff4+ZChoqOwsvv8/Nvh5Ozv8OHk5e72+I2dnp2qrPD8/5amp9re34qYmau0tu7gx70xI/73/r/b3h+rWvOVAxl3tHit0PGkKeHDwshdUtiemNSJg/C5YZTSrz2Lv+/Ggk26e33Kn37LoE67fQG3ue4AAAJCSURBVDjL7ZTZjqMwEEUNlJcCg9kMJkASsvfePdv/f9qUYRJNHvpxHkbqawTS0U3JrroOY1/6l6qCT1XdGYM2V/wTqbwNbsamNQAg/xIqWsujEMB0zR+nRvCAA+DVq2jJK1SAevFuEBGM7rpOG65I5PFWhGiBQIaNdzqOyEsnqqZyruR4rXqFYobckdX/qE1EaAsbiqTFxYsLfLg8LBAyxkSqsHRO6CIutKC6OB9LehgcL5fLMfAQU8E0oAmTpNqQdVNRIeO9ysOgaj8uH+24SgiCZhlg7kLkUxzHE8fQ5eiPBQTf38Pjw7F7eelcDpgx6khZTXERexXxVJUQkQj+OJ1+HoLxdb9/HUuQilFPdFUvTvLWlZbDdjtIffh+Ov06uPF5v38eNU2IgYQy0XHhzfTSSan6ouhVGRxPp+M4jk/7/dOqBAUslZCFScU6OlbXVEmYgTEmIhgcDu7t/ObGcUVQpSylCbbCJXOzEifa61g93J3P590CyRpxRRWE6LbFthMizFDOa4a7x/PjzkOQPGLdoCTkYULjK10S5reEzXD3bbdANXSssWkkKS203yCkaFBcfLMoNB6uaJ8EZZRaytam5tRbjLIsi+grI26HwfKI9iANQSMphrz20Wqw5pHy+aCJUs2p3pLqyafRU2JRWuMc2Ib3FjzxT7qufd4cr9e+N0tubc+v18Cs+2FKvYbatgtsbT3MaBr6tWlutytEu677vq+tuV25wNgZrS2Gd3fWbco8z0t3x2a0cV9/ff+hfgMbEzFsEYRVKgAAAABJRU5ErkJggg=='
  },{
	id: 12,
	cmd: 'game',
	kode: 'STEAM',
	name: 'PAKET GAME STEAM INDO (DOTA)',
	info: 'Paket game',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAClUExURf////Lz9OTp6r/FybrAxLe+we3x8rzDxr3Dx7vCxX2Ki+/z9dXa3LK7vsXLzsLIy8rQ03WDg9LX2ff4+ZChoqOwsvv8/Nvh5Ozv8OHk5e72+I2dnp2qrPD8/5amp9re34qYmau0tu7gx70xI/73/r/b3h+rWvOVAxl3tHit0PGkKeHDwshdUtiemNSJg/C5YZTSrz2Lv+/Ggk26e33Kn37LoE67fQG3ue4AAAJCSURBVDjL7ZTZjqMwEEUNlJcCg9kMJkASsvfePdv/f9qUYRJNHvpxHkbqawTS0U3JrroOY1/6l6qCT1XdGYM2V/wTqbwNbsamNQAg/xIqWsujEMB0zR+nRvCAA+DVq2jJK1SAevFuEBGM7rpOG65I5PFWhGiBQIaNdzqOyEsnqqZyruR4rXqFYobckdX/qE1EaAsbiqTFxYsLfLg8LBAyxkSqsHRO6CIutKC6OB9LehgcL5fLMfAQU8E0oAmTpNqQdVNRIeO9ysOgaj8uH+24SgiCZhlg7kLkUxzHE8fQ5eiPBQTf38Pjw7F7eelcDpgx6khZTXERexXxVJUQkQj+OJ1+HoLxdb9/HUuQilFPdFUvTvLWlZbDdjtIffh+Ov06uPF5v38eNU2IgYQy0XHhzfTSSan6ouhVGRxPp+M4jk/7/dOqBAUslZCFScU6OlbXVEmYgTEmIhgcDu7t/ObGcUVQpSylCbbCJXOzEifa61g93J3P590CyRpxRRWE6LbFthMizFDOa4a7x/PjzkOQPGLdoCTkYULjK10S5reEzXD3bbdANXSssWkkKS203yCkaFBcfLMoNB6uaJ8EZZRaytam5tRbjLIsi+grI26HwfKI9iANQSMphrz20Wqw5pHy+aCJUs2p3pLqyafRU2JRWuMc2Ib3FjzxT7qufd4cr9e+N0tubc+v18Cs+2FKvYbatgtsbT3MaBr6tWlutytEu677vq+tuV25wNgZrS2Gd3fWbco8z0t3x2a0cV9/ff+hfgMbEzFsEYRVKgAAAABJRU5ErkJggg=='
  },{
	id: 13,
	cmd: 'game',
	kode: 'WAVEGAME',
	name: 'PAKET GAME WAVEGAME',
	info: 'Paket game',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAClUExURf////Lz9OTp6r/FybrAxLe+we3x8rzDxr3Dx7vCxX2Ki+/z9dXa3LK7vsXLzsLIy8rQ03WDg9LX2ff4+ZChoqOwsvv8/Nvh5Ozv8OHk5e72+I2dnp2qrPD8/5amp9re34qYmau0tu7gx70xI/73/r/b3h+rWvOVAxl3tHit0PGkKeHDwshdUtiemNSJg/C5YZTSrz2Lv+/Ggk26e33Kn37LoE67fQG3ue4AAAJCSURBVDjL7ZTZjqMwEEUNlJcCg9kMJkASsvfePdv/f9qUYRJNHvpxHkbqawTS0U3JrroOY1/6l6qCT1XdGYM2V/wTqbwNbsamNQAg/xIqWsujEMB0zR+nRvCAA+DVq2jJK1SAevFuEBGM7rpOG65I5PFWhGiBQIaNdzqOyEsnqqZyruR4rXqFYobckdX/qE1EaAsbiqTFxYsLfLg8LBAyxkSqsHRO6CIutKC6OB9LehgcL5fLMfAQU8E0oAmTpNqQdVNRIeO9ysOgaj8uH+24SgiCZhlg7kLkUxzHE8fQ5eiPBQTf38Pjw7F7eelcDpgx6khZTXERexXxVJUQkQj+OJ1+HoLxdb9/HUuQilFPdFUvTvLWlZbDdjtIffh+Ov06uPF5v38eNU2IgYQy0XHhzfTSSan6ouhVGRxPp+M4jk/7/dOqBAUslZCFScU6OlbXVEmYgTEmIhgcDu7t/ObGcUVQpSylCbbCJXOzEifa61g93J3P590CyRpxRRWE6LbFthMizFDOa4a7x/PjzkOQPGLdoCTkYULjK10S5reEzXD3bbdANXSssWkkKS203yCkaFBcfLMoNB6uaJ8EZZRaytam5tRbjLIsi+grI26HwfKI9iANQSMphrz20Wqw5pHy+aCJUs2p3pLqyafRU2JRWuMc2Ib3FjzxT7qufd4cr9e+N0tubc+v18Cs+2FKvYbatgtsbT3MaBr6tWlutytEu677vq+tuV25wNgZrS2Gd3fWbco8z0t3x2a0cV9/ff+hfgMbEzFsEYRVKgAAAABJRU5ErkJggg=='
  },{
	id: 14,
	cmd: 'game',
	kode: 'ZYNGA',
	name: 'PAKET GAME ZYNGA',
	info: 'Paket game',
    logo: 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAClUExURf////Lz9OTp6r/FybrAxLe+we3x8rzDxr3Dx7vCxX2Ki+/z9dXa3LK7vsXLzsLIy8rQ03WDg9LX2ff4+ZChoqOwsvv8/Nvh5Ozv8OHk5e72+I2dnp2qrPD8/5amp9re34qYmau0tu7gx70xI/73/r/b3h+rWvOVAxl3tHit0PGkKeHDwshdUtiemNSJg/C5YZTSrz2Lv+/Ggk26e33Kn37LoE67fQG3ue4AAAJCSURBVDjL7ZTZjqMwEEUNlJcCg9kMJkASsvfePdv/f9qUYRJNHvpxHkbqawTS0U3JrroOY1/6l6qCT1XdGYM2V/wTqbwNbsamNQAg/xIqWsujEMB0zR+nRvCAA+DVq2jJK1SAevFuEBGM7rpOG65I5PFWhGiBQIaNdzqOyEsnqqZyruR4rXqFYobckdX/qE1EaAsbiqTFxYsLfLg8LBAyxkSqsHRO6CIutKC6OB9LehgcL5fLMfAQU8E0oAmTpNqQdVNRIeO9ysOgaj8uH+24SgiCZhlg7kLkUxzHE8fQ5eiPBQTf38Pjw7F7eelcDpgx6khZTXERexXxVJUQkQj+OJ1+HoLxdb9/HUuQilFPdFUvTvLWlZbDdjtIffh+Ov06uPF5v38eNU2IgYQy0XHhzfTSSan6ouhVGRxPp+M4jk/7/dOqBAUslZCFScU6OlbXVEmYgTEmIhgcDu7t/ObGcUVQpSylCbbCJXOzEifa61g93J3P590CyRpxRRWE6LbFthMizFDOa4a7x/PjzkOQPGLdoCTkYULjK10S5reEzXD3bbdANXSssWkkKS203yCkaFBcfLMoNB6uaJ8EZZRaytam5tRbjLIsi+grI26HwfKI9iANQSMphrz20Wqw5pHy+aCJUs2p3pLqyafRU2JRWuMc2Ib3FjzxT7qufd4cr9e+N0tubc+v18Cs+2FKvYbatgtsbT3MaBr6tWlutytEu677vq+tuV25wNgZrS2Gd3fWbco8z0t3x2a0cV9/ff+hfgMbEzFsEYRVKgAAAABJRU5ErkJggg=='
  }];

  var grup = [{
    id: 0, // TELKOMSEL
		items: [{
			id: 0,
			kode: 'S5',
			info: 'Telkomsel 5 ribu',
			cmd: 'pulsa'
		}, {
			id: 1,
			kode: 'S10',
			info: 'Telkomsel 10 ribu',
			cmd: 'pulsa'
		},{
			id: 2,
			kode: 'S20',
			info: 'Telkomsel 20 ribu',
			cmd: 'pulsa'
		}, {
			id: 3,
			kode: 'S25',
			info: 'Telkomsel 25 ribu',
			cmd: 'pulsa'
		}, {
			id: 4,
			kode: 'S50',
			info: 'Telkomsel 50 ribu',
			cmd: 'pulsa'
		}, {
			id: 5,
			kode: 'S100',
			info: 'Telkomsel 100 ribu',
			cmd: 'pulsa'
		}, {
			id: 6,
			kode: 'TD5',
			info: 'Telkomsel Data 5 ribu',
			cmd: 'data'
		}, {
			id: 7,
			kode: 'TD10',
			info: 'Telkomsel Data 10 ribu',
			cmd: 'data'
		},{
			id: 8,
			kode: 'TD20',
			info: 'Telkomsel Data 20 ribu',
			cmd: 'data'
		},{
			id: 9,
			kode: 'TD25',
			info: 'Telkomsel Data 25 ribu',
			cmd: 'data'
		}, {
			id: 10,
			kode: 'TD50',
			info: 'Telkomsel Data 50 ribu',
			cmd: 'data'
		}, {
			id: 11,
			kode: 'TD100',
			info: 'Telkomsel Data 100 ribu',
			cmd: 'data'
		}]
  }, {
    id: 1, //XL
		items: [{
			id: 0,
			kode: 'XL5',
			info: 'XL 5 ribu',
			cmd: 'pulsa'
		}, {
			id: 1,
			kode: 'XL10',
			info: 'XL 10 ribu',
			cmd: 'pulsa'
		},{
			id: 2,
			kode: 'XL15',
			info: 'XL 15 ribu',
			cmd: 'pulsa'
		}, {
			id: 3,
			kode: 'XL25',
			info: 'XL 25 ribu',
			cmd: 'pulsa'
		}, {
			id: 4,
			kode: 'XL30',
			info: 'XL 30 ribu',
			cmd: 'pulsa'
		}, {
			id: 5,
			kode: 'XL50',
			info: 'XL 50 ribu',
			cmd: 'pulsa'
		}, {
			id: 6,
			kode: 'XL100',
			info: 'XL 100 ribu',
			cmd: 'pulsa'
		}, {
			id: 7,
			kode: 'XIH30',
			info: 'XL HotRod 24 Jam 800 MB/30 hari',
			cmd: 'data'
		}, {
			id: 8,
			kode: 'XIH50',
			info: 'XL HotRod 24 Jam 1,5GB/30 hari',
			cmd: 'data'
		}, {
			id: 9,
			kode: 'XIH60',
			info: 'XL HotRod 24 Jam 3GB/30 hari',
			cmd: 'data'
		}, {
			id: 10,
			kode: 'XIH100',
			info: 'XL HotRod 24 Jam 6GB/30 hari',
			cmd: 'data'
		}, {
			id: 11,
			kode: 'XIH130',
			info: 'XL HotRod 24 Jam 8GB/30 hari',
			cmd: 'data'
		}, {
			id: 12,
			kode: 'XIH180',
			info: 'XL HotRod 24 Jam 12GB/30 hari',
			cmd: 'data'
		}, {
			id: 13,
			kode: 'XIH220',
			info: 'XL HotRod 24 Jam 16GB/30 hari',
			cmd: 'data'
		}, {
			id: 14,
			kode: 'XCO50',
			info: 'XL Xtra Combo (2GB ALL + 4GB di 4G + 2GB Youtube + Free 20 mnt)',
			cmd: 'data'
		}, {
			id: 15,
			kode: 'XCO90',
			info: 'XL Xtra Combo (4GB ALL + 8GB di 4G + 4GB Youtube + Free 40 mnt)',
			cmd: 'data'
		}, {
			id: 16,
			kode: 'XCO130',
			info: 'XL Xtra Combo (6GB ALL + 12GB di 4G + 6GB Youtube + Free 60 mnt)',
			cmd: 'data'
		}, {
			id: 17,
			kode: 'XCO180',
			info: 'XL Xtra Combo (10GB ALL + 20GB di 4G + 10GB Youtube + Free 100 mnt)',
			cmd: 'data'
		}, {
			id: 18,
			kode: 'XCO240',
			info: 'XL Xtra Combo (14GB ALL + 28GB di 4G + 14GB Youtube + Free 140 mnt)',
			cmd: 'data'
		}]
  }, {
    id: 2, // INDOSAT
		items: [{
			id: 0,
			kode: 'I5',
			info: 'Indosat 5 ribu',
			cmd: 'pulsa'
		}, {
			id: 1,
			kode: 'I10',
			info: 'Indosat 10 ribu',
			cmd: 'pulsa'
		},{
			id: 2,
			kode: 'I20',
			info: 'Indosat 20 ribu',
			cmd: 'pulsa'
		}, {
			id: 3,
			kode: 'I25',
			info: 'Indosat 25 ribu',
			cmd: 'pulsa'
		}, {
			id: 4,
			kode: 'I30',
			info: 'Indosat 30 ribu',
			cmd: 'pulsa'
		}, {
			id: 5,
			kode: 'I50',
			info: 'Indosat 50 ribu',
			cmd: 'pulsa'
		}, {
			id: 6,
			kode: 'I100',
			info: 'Indosat 100 ribu',
			cmd: 'pulsa'
		}, {
			id: 7,
			kode: 'I45GB ',
			info: 'Paket 3GB (1.5GB 24jam; 500MB 09-17; 1GB 01-06)',
			cmd: 'data'
		},{
			id: 8,
			kode: 'I95GB',
			info: 'Paket 6,5GB (3.5GB 24jam; 500MB 09-17; 2.5GB 01-06)',
			cmd: 'data'
		},{
			id: 9,
			kode: 'IXT2GB',
			info: 'Paket Extra Kuota 2 GB',
			cmd: 'data'
		},{
			id: 10,
			kode: 'IXT4GB',
			info: 'Paket Extra Kuota 4 GB',
			cmd: 'data'
		},{
			id: 11,
			kode: 'IXT6GB',
			info: 'Paket Extra Kuota 6 GB',
			cmd: 'data'
		},{
			id: 12,
			kode: 'IFD1GB',
			info: 'Freedom (2GB (ALL), 3GB (4G), free 1GB STREAM ON & APPS ON 30 hari',
			cmd: 'data'
		},{
			id: 13,
			kode: 'IFD3GB',
			info: 'Freedom 4GB (ALL), 8GB (4G), free 2GB STREAM ON & APPS ON 30 hari',
			cmd: 'data'
		},{
			id: 14,
			kode: 'IFD5GB',
			info: 'Freedom 8GB (ALL), 12GB (4G), free 3GB STREAM ON & APPS ON 30 hari',
			cmd: 'data'
		},{
			id: 15,
			kode: 'IFD10GB',
			info: 'Freedom 12GB (ALL), 25GB (4G), free 5GB STREAM ON & APPS ON 30 hari',
			cmd: 'data'
		},{
			id: 16,
			kode: 'ISC1GB',
			info: 'Paket Sachet 1GB (ALL), 1GB (4G), 60 hari',
			cmd: 'data'
		},{
			id: 17,
			kode: 'ISC2GB',
			info: 'Paket Sachet 2GB (ALL), 2GB (4G), 60 hari',
			cmd: 'data'
		},{
			id: 18,
			kode: 'ISC4GB',
			info: 'Paket Sachet 4GB (ALL), 4GB (4G), 60 hari',
			cmd: 'data'
		},{
			id: 19,
			kode: 'ISC5GB',
			info: 'Paket Sachet 5GB (ALL), 5GB (4G), 60 hari',
			cmd: 'data'
		},{
			id: 20,
			kode: 'I3GB90',
			info: 'Paket Data 3+3 (ALL), 4GB (4G), 90 hari',
			cmd: 'data'
		}]
  }, {
    id: 3, // THREE
		items: [{
			id: 0,
			kode: 'T5',
			info: 'Three 5 ribu',
			cmd: 'pulsa'
		}, {
			id: 1,
			kode: 'T10',
			info: 'Three 10 ribu',
			cmd: 'pulsa'
		},{
			id: 2,
			kode: 'T20',
			info: 'Three 20 ribu',
			cmd: 'pulsa'
		}, {
			id: 3,
			kode: 'T30',
			info: 'Three 30 ribu',
			cmd: 'pulsa'
		}, {
			id: 4,
			kode: 'T50',
			info: 'Three 50 ribu',
			cmd: 'pulsa'
		}, {
			id: 5,
			kode: 'T100',
			info: 'Three 100 ribu',
			cmd: 'pulsa'
		}, {
			id: 6,
			kode: 'T20MB',
			info: 'Three 20 MB',
			cmd: 'data'
		}, {
			id: 7,
			kode: 'T80MB',
			info: 'Three 80 MB',
			cmd: 'data'
		}, {
			id: 8,
			kode: 'T300MB',
			info: 'Three 300 MB',
			cmd: 'data'
		}, {
			id: 9,
			kode: 'T650MB',
			info: 'Three 650 MB',
			cmd: 'data'
		}, {
			id: 10,
			kode: 'T1250MB',
			info: 'Three 1250 MB',
			cmd: 'data'
		}, {
			id: 11,
			kode: 'T4250MB',
			info: 'Three 4250 MB',
			cmd: 'data'
		}, {
			id: 12,
			kode: 'TNM5',
			info: 'Three Data (24jam: 1GB, 00.00-12.00: 4GB, bonus pulsa 15.000)',
			cmd: 'data'
		}, {
			id: 13,
			kode: 'T1GB',
			info: 'Three Data (1GB reguler ikut masa aktif kartu + 1GB 4G 7 hari)',
			cmd: 'data'
		}, {
			id: 14,
			kode: 'T2GB',
			info: 'Three Data (2GB reguler ikut masa aktif kartu + 4GB 4G 7 hari)',
			cmd: 'data'
		}, {
			id: 15,
			kode: 'T3GB',
			info: 'Three Data (3GB reguler ikut masa aktif kartu + 6GB 4G 7 hari)',
			cmd: 'data'
		}, {
			id: 16,
			kode: 'T4GB',
			info: 'Three Data (4GB reguler ikut masa aktif kartu + 8GB 4G 15 hari)',
			cmd: 'data'
		}, {
			id: 17,
			kode: 'T5GB',
			info: 'Three Data (5GB reguler ikut masa aktif kartu + 10GB 4G 15 hari)',
			cmd: 'data'
		}, {
			id: 18,
			kode: 'T6GB',
			info: 'Three Data (6GB reguler ikut masa aktif kartu + 12GB 4G 30 hari)',
			cmd: 'data'
		}, {
			id: 19,
			kode: 'T8GB',
			info: 'Three Data (8GB reguler ikut masa aktif kartu + 16GB 4G 30 hari)',
			cmd: 'data'
		}, {
			id: 20,
			kode: 'T10GB',
			info: 'Three Data (10GB reguler ikut masa aktif kartu + 20GB 4G 30 hari)',
			cmd: 'data'
		}]
  }, {
    id: 4, // AXIS
		items: [{
			id: 0,
			kode: 'AX5',
			info: 'Axis 5 ribu',
			cmd: 'pulsa'
		}, {
			id: 1,
			kode: 'AX10',
			info: 'Axis 10 ribu',
			cmd: 'pulsa'
		},{
			id: 2,
			kode: 'AX15',
			info: 'Axis 15 ribu',
			cmd: 'pulsa'
		}, {
			id: 3,
			kode: 'AX25',
			info: 'Axis 25 ribu',
			cmd: 'pulsa'
		}, {
			id: 4,
			kode: 'AX30',
			info: 'Axis 30 ribu',
			cmd: 'pulsa'
		}, {
			id: 5,
			kode: 'AX50',
			info: 'Axis 50 ribu',
			cmd: 'pulsa'
		}, {
			id: 6,
			kode: 'AX100',
			info: 'Axis 100 ribu',
			cmd: 'pulsa'
		}, {
			id: 7,
			kode: 'BRO10',
			info: 'Bronet Kuota 1GB 30 Hari',
			cmd: 'data'
		}, {
			id: 8,
			kode: 'BRO20',
			info: 'Bronet Kuota 2GB 60 Hari',
			cmd: 'data'
		}, {
			id: 9,
			kode: 'BRO35',
			info: 'Bronet Kuota 3GB 60 Hari',
			cmd: 'data'
		}, {
			id: 10,
			kode: 'BRO50',
			info: 'Bronet Kuota 5GB 60 Hari',
			cmd: 'data'
		}]
  }, {
    id: 5, // SMARTFREN
		items: [{
			id: 0,
			kode: 'SM5',
			info: 'Smartfren 5 ribu',
			cmd: 'pulsa'
		}, {
			id: 1,
			kode: 'SM10',
			info: 'Smartfren 10 ribu',
			cmd: 'pulsa'
		},{
			id: 2,
			kode: 'SM20',
			info: 'Smartfren 20 ribu',
			cmd: 'pulsa'
		}, {
			id: 3,
			kode: 'SM25',
			info: 'Smartfren 25 ribu',
			cmd: 'pulsa'
		}, {
			id: 4,
			kode: 'SM30',
			info: 'Smartfren 30 ribu',
			cmd: 'pulsa'
		}, {
			id: 5,
			kode: 'SM50',
			info: 'Smartfren 50 ribu',
			cmd: 'pulsa'
		}, {
			id: 6,
			kode: 'SM60',
			info: 'Smartfren 60 ribu',
			cmd: 'pulsa'
		}, {
			id: 7,
			kode: 'SM100',
			info: 'Smartfren 100 ribu',
			cmd: 'pulsa'
		}]
  }, {
    id: 6, //PLN
		items: [{
			id: 0,
			kode: 'PLN20',
			info: 'PLN 20 ribu',
			cmd: 'pln'
		}, {
			id: 1,
			kode: 'PLN50',
			info: 'PLN 50 ribu',
			cmd: 'pln'
		},{
			id: 2,
			kode: 'PLN100',
			info: 'PLN 100 ribu',
			cmd: 'pln'
		}, {
			id: 3,
			kode: 'PLN200',
			info: 'PLN 200 ribu',
			cmd: 'pln'
		}, {
			id: 4,
			kode: 'PLN500',
			info: 'PLN 500 ribu',
			cmd: 'pln'
		}]
  }, {
    id: 7, //GAME FIFA
		items: [{
			id: 0,
			kode: 'FIF10',
			info: 'FIFA 10 ribu',
			cmd: 'game'
		}, {
			id: 1,
			kode: 'FIF20',
			info: 'FIFA 20 ribu',
			cmd: 'game'
		},{
			id: 2,
			kode: 'FIF50',
			info: 'FIFA 50 ribu',
			cmd: 'game'
		}, {
			id: 3,
			kode: 'FIF100',
			info: 'FIFA 100 ribu',
			cmd: 'game'
		}]
  }, {
    id: 8, //GAME GARENA
		items: [{
			id: 0,
			kode: 'GAR10',
			info: 'GARENA 10 ribu',
			cmd: 'game'
		}, {
			id: 1,
			kode: 'GAR20',
			info: 'GARENA 20 ribu',
			cmd: 'game'
		},{
			id: 2,
			kode: 'GAR50',
			info: 'GARENA 50 ribu',
			cmd: 'game'
		}, {
			id: 3,
			kode: 'GAR100',
			info: 'GARENA 100 ribu',
			cmd: 'game'
		}]
  }, {
    id: 9, //GAME GEMSCOOL
		items: [{
			id: 0,
			kode: 'GEM10',
			info: 'GEMSCOOL 10 ribu',
			cmd: 'game'
		}, {
			id: 1,
			kode: 'GEM20',
			info: 'GEMSCOOL 20 ribu',
			cmd: 'game'
		},{
			id: 2,
			kode: 'GEM30',
			info: 'GEMSCOOL 30 ribu',
			cmd: 'game'
		},{
			id: 3,
			kode: 'GEM50',
			info: 'GEMSCOOL 50 ribu',
			cmd: 'game'
		}, {
			id: 4,
			kode: 'GEM100',
			info: 'GEMSCOOL 100 ribu',
			cmd: 'game'
		}, {
			id: 5,
			kode: 'GEM200',
			info: 'GEMSCOOL 200 ribu',
			cmd: 'game'
		}, {
			id: 6,
			kode: 'GEM300',
			info: 'GEMSCOOL 300 ribu',
			cmd: 'game'
		}]
  }, {
    id: 10, //GAME LYTO
		items: [{
			id: 0,
			kode: 'LYT10',
			info: 'LYTO 10 ribu',
			cmd: 'game'
		}, {
			id: 1,
			kode: 'LYT20',
			info: 'LYTO 20 ribu',
			cmd: 'game'
		},{
			id: 2,
			kode: 'LYT35',
			info: 'LYTO 35 ribu',
			cmd: 'game'
		}, {
			id: 3,
			kode: 'LYT65',
			info: 'LYTO 65 ribu',
			cmd: 'game'
		}, {
			id: 4,
			kode: 'LYT175',
			info: 'LYTO 175 ribu',
			cmd: 'game'
		}]
  }, {
    id: 11, //GAME MEGAXUS
		items: [{
			id: 0,
			kode: 'MEG10',
			info: 'MEGAXUS 10 ribu',
			cmd: 'game'
		}, {
			id: 1,
			kode: 'MEG20',
			info: 'MEGAXUS 20 ribu',
			cmd: 'game'
		},{
			id: 2,
			kode: 'MEG50',
			info: 'MEGAXUS 50 ribu',
			cmd: 'game'
		}, {
			id: 3,
			kode: 'MEG100',
			info: 'MEGAXUS 100 ribu',
			cmd: 'game'
		}, {
			id: 4,
			kode: 'MEG200',
			info: 'MEGAXUS 200 ribu',
			cmd: 'game'
		}]
  }, {
    id: 12, //GAME STEAM
		items: [{
			id: 0,
			kode: 'STE12',
			info: 'STEAM 12 ribu',
			cmd: 'game'
		}, {
			id: 1,
			kode: 'STE45',
			info: 'STEAM 45 ribu',
			cmd: 'game'
		},{
			id: 2,
			kode: 'STE60',
			info: 'STEAM 60 ribu',
			cmd: 'game'
		}, {
			id: 3,
			kode: 'STE 90',
			info: 'STEAM 90 ribu',
			cmd: 'game'
		}, {
			id: 4,
			kode: 'STE 120',
			info: 'STEAM 120 ribu',
			cmd: 'game'
		}, {
			id: 5,
			kode: 'STE 250',
			info: 'STEAM 250 ribu',
			cmd: 'game'
		}]
  }, {
    id: 13, //GAME WAVEGAME
		items: [{
			id: 0,
			kode: 'WAV10',
			info: 'WAVEGAME 10 ribu',
			cmd: 'game'
		}, {
			id: 1,
			kode: 'WAV20',
			info: 'WAVEGAME 20 ribu',
			cmd: 'game'
		},{
			id: 2,
			kode: 'WAV50',
			info: 'WAVEGAME 50 ribu',
			cmd: 'game'
		}, {
			id: 3,
			kode: 'WAV100',
			info: 'WAVEGAME 100 ribu',
			cmd: 'game'
		}]
  }, {
    id: 14, //GAME ZYNGA
		items: [{
			id: 0,
			kode: 'ZYN20',
			info: 'ZYNGA 20 ribu',
			cmd: 'game'
		},{
			id: 1,
			kode: 'ZYN50',
			info: 'ZYNGA 50 ribu',
			cmd: 'game'
		}, {
			id: 2,
			kode: 'ZYN100',
			info: 'ZYNGA 100 ribu',
			cmd: 'game'
		}]
  }];


  return {
    all: function() {
      return operators;
    },
    remove: function(opr) {
      operators.splice(operators.indexOf(opr), 1);
    },
    get: function(oprId) {
      for (var i = 0; i < grup.length; i++) {
        if (grup[i].id === parseInt(oprId)) {
          return { name: operators[i].name, logo: operators[i].logo, items: grup[i].items };
        }
      }
      return null;
    },
    logo: function(oprName) {
      for (var i = 0; i < operators.length; i++) {
        if (operators[i].kode === oprName) {
          return { image: operators[i].logo };
        }
      }
      return null;
    }
  };
})

.factory("Data", ['$http', //'toaster',
    function ($http) { // This service connects to our REST API

        var serviceBase = 'http://212.24.111.23:3000/'; //'api/v1/';

        var obj = {};
        // obj.toast = function (data) {
            // toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        // }
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);
