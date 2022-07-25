// O desafio proproe criar um objeto emplyee com propriedades name e code.

/*  A forma mais simples é atribuir os valores diretamente a propriedade
    sem definir explicitamente os tipo de dados. */

let employee = {
    name: 'Jonh',
    code: 10
};

/*  Outra forma é atribuir os valores a propriedade
    definindo antecipadamente os tipo de dados. */

let employee2: { name: string, code: number } = {
    name: 'Jonh',
    code: 10
};

/* Pode-se ainda criar o objeto através do uso de uma intterface 
que descreve a estrutura que o objeto terá. Posteriormente atribuir
    os valores as propriedades. */

interface EmployeeInterfce {
    name: string,
    code: number
};

let employee3: EmployeeInterfce = {
    name: 'Jonh',
    code: 10
}