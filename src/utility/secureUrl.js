export default function convertToSecure(url) {
    return url.replace(/http:\/\//g, 'https://');
}