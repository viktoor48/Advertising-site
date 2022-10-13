export class LocalstorageWrapper {
    constructor(prefix) {
        this.prefix = `${prefix}@`;
    }

    getItem(key, value) {
        try {
            return window.localStorage.getItem(this.prefix + key);
        } catch (e) {
            console.log(e);
        }
    }

    setItem(key, value) {
        try {
            return window.localStorage.setItem(this.prefix + key, value);
        } catch (e) {
            console.log(e)
        }
    }

    setJSON(key, value) {
        try {
            const json = JSON.stringify(value);

            return window.localStorage.setItem(this.prefix + key, json);
        } catch (e) {
            console.error(e);
        }
    }

    getJSON(key) {
        key = String(key);

        try {
            const data = key.includes(this.prefix) ? window.localStorage.getItem(key) : window.localStorage.getItem(this.prefix + key);

            if (data === null) {
                return null;
            }
            return JSON.parse(data);
        } catch (e) {
            console.error(e);
        }
    }

    getSize() {
        return window.localStorage.length;
    }

    delete(key) {
        window.localStorage.removeItem(this.prefix + key);
    }

    clearAll() {
        window.localStorage.clear();
    }
}