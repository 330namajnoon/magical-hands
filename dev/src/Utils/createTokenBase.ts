
/**
 * 
 * @param {string} numeroString 
 * @param {string} strBase 
 * @param {string} bufferBase 
 * @returns {string}
 */
function convertirBase(numeroString: string, strBase: string, bufferBase: string) {
    let decimal = 0;
    for (let i = 0; i < numeroString.length; i++) {
        const digitValue = strBase.indexOf(numeroString[i]);
        decimal = decimal * strBase.length + digitValue;
    }
    let resultado = '';
    while (decimal > 0) {
        resultado = bufferBase.charAt(decimal % bufferBase.length) + resultado;
        decimal = Math.floor(decimal / bufferBase.length);
    }

    return resultado || '0';
}

/**
 * 
 * @param {string} str 
 * @param {string} base 
 */
function encode(str: string, base = "MAGICLHENDS") {
    let res = "";
    let stoa = str.split("");
    stoa.forEach(c => {
        let ctob = convertirBase(c.charCodeAt(0) + "", "0123456789", base);
        res += base.charAt(ctob.length - 1);
        res += ctob;
    })
    return res;
}

/**
 * 
 * @param {string} token 
 * @param {string} base 
 */
function decode(token: string, base = "MAGICLHENDS") {
    let res = "";
    let ttoa = token.split("");

    while (ttoa.length > 0) {
        let len = parseInt(base.indexOf(ttoa[0]) as any) + 1;
        let str = ttoa.slice(1, len + 1);
        ttoa = ttoa.slice(len + 1, ttoa.length);
        res += String.fromCharCode(parseInt(convertirBase(str.join(""), base, "0123456789")));
    }

    return res;
}

export {decode, encode}