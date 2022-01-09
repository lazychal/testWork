export class StorageService {

    static login = (login: string, password: string) => {
        const storage = localStorage
        storage.setItem('user_login', login);
        storage.setItem('user_password', password);
    };

    static getUser = () => {
        return localStorage.getItem('user_login')
    }

    static logout = () => {
        localStorage.clear()
        window.location.reload();
    };

    static isLoggedIn = (): boolean | undefined => {
        let login = localStorage.getItem('user_login')
        return !!login;
    };

}
