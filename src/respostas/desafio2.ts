// Como podemos melhorar o esse código usando TS?

/* O código pode ser melhorado criando uma interface
    que descreve como o objeto deve parecer (um modelo).
    Para então atribuir os valores as suas propriedades */

interface Pessoa {
    nome: string,
    idade: number,
    profissao: string
};

let pessoa1: Pessoa = {
    nome: "maria",
    idade: 29,
    profissao: "Atriz"
};

let pessoa2: Pessoa = {
    nome: "roberto",
    idade: 19,
    profissao: "Padeiro"
};

let pessoa3: Pessoa = {
    nome: "laura",
    idade: 32,
    profissao: "Atriz"
};

let pessoa4: Pessoa = {
    nome: "carlos",
    idade: 19,
    profissao: "Padeiro"
}