import axios from "axios";
import {getUserToken} from './auth';

const recipeApi = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    authorization: getUserToken()
  }
})

export default recipeApi