import { extname } from "path";

export const customImageName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);

    const rndName =  Array(16)
    .fill(null)
    .map(() => Math.round(Math.random()*16).toString())
    .join("");

    callback(null, `${name}-${rndName}${fileExtName}`)

}
