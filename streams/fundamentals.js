import { Readable, Writable, Transform, Duplex } from "node:stream";

//Streaming Read / Write / Transform e Duplex
//Streaming Duplex possui características de Read / Write e Transform
class OneToHundredStream extends Readable {

    index = 1;

    _read() {

        const i = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));
                this.push(buf);
            }
        }, 1000);

    }

}

//chunk são pedaços de dados que são lidos e escritos durante uma stream de forma assíncrona
class InverseNumberStream extends Transform {

    _transform(chunk, encoding, callback) {

        const transformed = Number(chunk.toString()) * -1;

        callback(null, Buffer.from(String(transformed)));

    }

}

class MultiplyByTenStream extends Writable {

    _write(chunk, encoding, callback) {

        console.log(Number(chunk.toString()) * 10);
        callback();

    }

}


//Método pipe encaminha dados provindos de uma stream para outra
new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream());
