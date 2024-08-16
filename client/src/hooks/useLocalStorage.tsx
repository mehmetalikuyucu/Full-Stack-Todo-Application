export const useLocalStorage = (key: string = "") => {
    const get = () => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    };
    const getAccessToken = () => {
        const token = window.localStorage.getItem("token");
        return token;
    }
    
    const set = (value: any) => {
        window.localStorage
            .setItem(key, JSON.stringify(value));
    }

    return { get, set,getAccessToken };
}