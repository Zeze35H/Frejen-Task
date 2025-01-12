import http from "./http-common.js";

// ======================================================================================
//                                      AUTH                                                
// ======================================================================================

// export const login = async (data, withCredentials) => {
//     try {
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ data: data, withCredentials: withCredentials })
//         };
//         console.log("asd")
//         const response = await fetch("http://localhost:8000/api/auth/login/", requestOptions);
//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching projects:", error);
//         throw error;
//     }
// };

// export const logout = async () => {
//     try {
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//         };
//         const response = await fetch(`http://localhost:8000/api/auth/logout`, requestOptions);
//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching project info:", error);
//         throw error;
//     }
// };

export const login = async (data, withCredentials) => {
    console.log("inside api.js login()")
    return http.post(`/auth/login`, data, withCredentials);
}

export const logout = async () => {
    console.log("inside api.js logout()")
    return http.post(`/auth/logout`);
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