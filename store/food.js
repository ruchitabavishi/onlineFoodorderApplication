import Repository from '../services/apiHelper'

const res = '/food.php'
export default{
    getFoodItems(){
        return Repository.get(`${res}`)
    },
   
}