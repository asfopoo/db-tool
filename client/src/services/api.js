import axiosInstance from './axios-instance';

export async function listInternalUsers(params){
  return await axiosInstance.get('/internal-users', {
    params,
  });
}

export async function createInternalUser(params){
  return await axiosInstance.post('/internal-users', params);
}

export async function listInternalRoles(params){
  return await axiosInstance.get('/internal-roles', {
    params,
  });
}

export async function listCustomers(params){
  return await axiosInstance.get('/teams', {
    params
  });
}
export async function listLeadGen(params){
  return await axiosInstance.get('/lead-gen-controller', {
    params,
  });
}

export async function searchLeadGen(id){
  return await axiosInstance.get(`/lead-gen-controller/${id}`)
}

export async function login(params){
  return await axiosInstance.post('/auth', params);
}

export async function uploader(body){
  return await axiosInstance.post('/uploader', body);
}

/*export async function insertion(body){
  return await axiosInstance.post('/insertion', body);
}*/

export async function downloader(body){
  return await axiosInstance.post('/downloader', body);
}