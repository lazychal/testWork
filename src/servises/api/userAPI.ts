import Axios from 'axios';

export class UserAPI {
    static async addUser(fio: string, userId: string, cityId: number) {
        await Axios({
            method: 'POST',
            url: 'https://',
            data: {
                "params": {
                    fio,
                    userId,
                    cityId
                }
            },
        })
        return 'New User Added'
    }
    static async editUser(fio: string, userId: string, cityId: number) {
        await Axios({
            method: 'PUT',
            url: 'https://',
            data: {
                "params": {
                    fio,
                    userId,
                    cityId
                }
            },
        })
        return 'User Changes Successful'
    }
    static async deleteUser(userId: string) {
        await Axios({
            method: 'DELETE',
            url: 'https://',
            data: {
                "params": {
                    userId
                }
            },
        })
        return 'User Deleted'
    }
}
