//Tudo que este arquivo JS está recebendo como entrada ele escreve na saída
//stdin - Stream input
//stdout - Stream output

import { Readable } from "node:stream";

class OneToHundredStream extends Readable {

    index = 1;

    _read() {

        const i = this.index++

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

new OneToHundredStream()
    .pipe(process.stdout);
