export let isLoggedIn: boolean = false;

export function setLoggedIn(value: boolean) {
    isLoggedIn = value;
}

export function getLoggedIn() {
    return isLoggedIn;
}