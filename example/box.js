import { drawAngle } from './side';

export default (text) => {
    const [h, v] = drawAngle(text.length)
    const box = h + '\n' + v + text + v + '\n' + h;
    return box;
};