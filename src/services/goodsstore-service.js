import makeRequest from './makeRequest';
import "regenerator-runtime/runtime";

export default class GoodsStoreService {

  async fetchAll(params){
    return await makeRequest(`/goods${params}`);
  };

  async fetchOne(id){
    return await makeRequest(`/goods/${id}`);
  }

  async fetchCats(){
    return await makeRequest(`/category`);
  };
}