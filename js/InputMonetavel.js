import fmt from "./utils/formatacao.js";

class InputMonetavel {

    #input;
    #valor;

    constructor(input) {
        const inputVerificado = this.validarInput(input);
        this.setInput(inputVerificado);
        
        const valor = this.getValueDoInput();
        if (!valor) {
            this.setValueDoInput('0,00');
        } else {
            this.setValor(valor);
        }

        this.#eventos();
    }

    validarInput(input) {
        let inputVerificado;
        const tipo = typeof input;
        switch (tipo) {
            case 'string':
                input = this.validarInputPorId(input);
                // não possui break para poder fazer a próxima verificação
                
            case 'object':
                inputVerificado = this.validarInputPorElementoNode(input);
                break;

            default:
                throw new Error(
                    `Não foi possível reconhecer ${typeof input} como input`
                );
        }
        return inputVerificado;
    }

    validarInputPorId(id) {
        const inputPorId = this.buscarInputPorId(id);
        if (!inputPorId) {
            throw new Error(`Não há input com ID "${id}"`);
        }
        return inputPorId;
    }

    buscarInputPorId(id) {
        return document.getElementById(id);
    }

    validarInputPorElementoNode(el) {
        if (el.tagName !== 'INPUT') {
            throw new Error('Impossível reconhecer elemento como input');
        }
        return el;
    }

    getValueDoInput() {
        return this.#input.value;
    }

    getValorEmString() {
        return this.#valor;
    }

    getValorEmNumber() {
        const convertido = this.converterValor(this.#valor);
        return convertido;
    }

    setInput(novoInput) {
        this.#input = novoInput;
    }

    setValor(novoValor) {
        const convertido = this.validarValor(novoValor);
        const formatado = this.formatarValor(convertido);
        this.setValueDoInput(formatado);
    }

    setValueDoInput(novoValue) {
        this.#input.value = novoValue;
        this.setValorPeloInput();
    }

    setValorPeloInput() {
        this.#valor = this.#input.value;
    }

    validarValor(valor) {
        let valorConvertido;
        const tipo = typeof valor;
        switch (tipo) {
            case 'string':
                valorConvertido = this.validarValorCasoTipoSejaString(valor);
                break;

            case 'number':
                valorConvertido = valor;
                break;

            default:
                throw new Error('Valor inválido para InputMonetário!');
        }
        return valorConvertido;
    }

    validarValorCasoTipoSejaString(valor) {
        let valorConvertido;
        if (this.ehFloatEmTexto(valor)) {
            valorConvertido = parseFloat(valor);
        } else {
            valorConvertido = this.converterValor(valor);
        }
        return valorConvertido;
    }

    converterValor(valor) {
        const formatado = fmt.replaceCaracteresEmNumeros(valor);            
        const convertido = this.verificarSeEhNaN(formatado);
        return convertido;
    }

    ehFloatEmTexto(num) {
        return num.includes('.') && !num.includes(',');
    }

    formatarValor(valor) {
        return valor.toLocaleString(
            'pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}
        );
    }

    verificarSeEhNaN(num) {
        const convertido = parseFloat(num);
        if (isNaN(convertido)) {
            throw new Error(`Impossível converter "${num}" para número!`)
        }
        return convertido;
    }

    #eventos() {
        
    }

}

export default InputMonetavel;
