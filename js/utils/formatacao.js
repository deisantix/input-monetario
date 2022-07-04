function replaceCaracteresEmNumeros(str) {
    return str.split('.').join('').split(',').join('.');
}

export default { replaceCaracteresEmNumeros }
