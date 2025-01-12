import http from "./http-common.js";

// ======================================================================================
//                                      AUTH                                                
// ======================================================================================

export const login = async (data, withCredentials) => {
    console.log("inside api.js login()")
    return http.post(`/auth/login`, data, withCredentials);
}

export const logout = async () => {
    console.log("inside api.js logout()")
    return http.post(`/auth/logout`);
}

export const isAuthenticated = async () => {
    console.log("inside api.js isAuthenticated()")
    return http.get(`/auth/checkAuth`);
}

// ======================================================================================
//                                     TICKETS                                                
// ======================================================================================

export const createTicket = async (data) => {
    console.log("inside api.js createTicket()")
    return http.post("/tickets/create", data);
}

export const findOneTicket = async (id) => {
    console.log("inside api.js findOneTicket()")
    return http.get(`/tickets/ticket/${id}`);
}

export const findAllTickets = async (data) => {
    console.log("inside api.js findAllTickets()")
    return http.post(`/tickets/findAll`, data);
}

// ======================================================================================
//                                     STATES                                                
// ======================================================================================

export const getStates = async () => {
    console.log("inside api.js getStates()")
    return http.get(`/states`);
}

// ======================================================================================
//                                     DEPARTMENTS                                                
// ======================================================================================

export const getDepartments = async () => {
    console.log("inside api.js getDepartments()")
    return http.get(`/departments`);
}

// ======================================================================================
//                                     USER                                                
// ======================================================================================

export const findOneUser = async (id) => {
    console.log("inside api.js findOneUser()")
    return http.get(`/users/${id}`);
}

export const updateUser = async (id, data) => {
    console.log(id)
    console.log(data)
    console.log("inside api.js updateUser()")
    return http.post(`/users/update/${id}`, data);
}