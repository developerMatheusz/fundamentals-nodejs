//Serve para armazenar dados temporários de um sistema para trabalhar em alta performance.

//Diferente de armazenar dados em forma de String, o buffer armazena dados na base 16 (hexadecimal).

//Possui alta velocidade para realizar o processo de leitura e escrita neste tipo de memória.

//Quando transforma um buffer em JSON é codificado para base 10 (decimal).

const buffer = Buffer.from("Olá mundo!");

console.log(buffer.toJSON());
