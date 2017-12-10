export default async function sendRequest(url) {
    try {
        return (await fetch(url)).json();
    } catch (err) {
        return url;
    }
}
