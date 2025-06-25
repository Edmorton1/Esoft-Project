import fs from "fs"
import path from "path"

const certs = {
  cert: fs.readFileSync(path.resolve(__dirname, 'certs', '192.168.1.125.pem')),
  key: fs.readFileSync(path.resolve(__dirname, 'certs', '192.168.1.125-key.pem'))
}

export default certs