const url = `https://main-shop-fake-server.herokuapp.com/db`;

export async function load() {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return await response.json();
}