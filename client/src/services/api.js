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

export async function login(params){
  return await axiosInstance.post('/auth', params);
}
