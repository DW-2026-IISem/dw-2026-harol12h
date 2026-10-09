export default function ip() {
    return Math.floor(Math.random() * 255) + '.'
           + Math.floor(Math.random() * 255) + '.'
           + Math.floor(Math.random() * 255) + '.'
           + Math.floor(Math.random() * 255);
}
