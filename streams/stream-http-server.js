import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {

    _transform(chunk, encoding, callback) {

        const transformed = Number(chunk.toString()) * -1;

        console.log(transformed);

        callback(null, Buffer.from(String(transformed)));

    }

}

//req => ReadableStream
//res => WritableStream
//buffers => Memórias temporárias dentro de um sistema
const server = http.createServer(async (req, res) => {

    const buffers = [];

    /*
        await é uma palavra chave essencial para trabalhar com streamings.

        As linhas abaixo do await só são executadas quando o bloco "for" percorrer todas as linhas da requisição e armazenar no buffer.

        Muito utilizada para fazer streaming de JSON em que é importante ter todas as propriedades e valores do arquivo.
    */
    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const fullStreamContent = Buffer.concat(buffers).toString();

    console.log(fullStreamContent);

    return res.end(fullStreamContent);

    /*return req
        .pipe(new InverseNumberStream())
        .pipe(res);
    */

});

server.listen(3334);
