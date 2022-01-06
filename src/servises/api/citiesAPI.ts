import Axios from 'axios';

export class CitiesAPI {
    static async getCities(){
        const result: any[] = []
            await Axios({
         method: 'GET',
         url: 'https://api.hh.ru/areas'
        })
            .then((res) => {
                let area = res.data[0].areas
                result.push(area[20], area[39], area[63].areas[97], area[5].areas[20])
            })
        return result
    }
}
