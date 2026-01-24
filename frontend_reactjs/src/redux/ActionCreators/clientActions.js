import { 
  FETCH_CLIENTS_REQUEST, 
  FETCH_CLIENTS_SUCCESS, 
  FETCH_CLIENTS_FAILURE,
  CREATE_CLIENT_REQUEST,
  CREATE_CLIENT_FAILURE,
  CREATE_CLIENT_SUCCESS,
  GET_NEW_EMAIL_REQUEST,
  GET_NEW_EMAIL_FAILURE,
  GET_NEW_EMAIL_SUCCESS,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_FAILURE,
  UPDATE_CLIENT_SUCCESS,
  FETCH_CLIENT_BY_ID_REQUEST,
  FETCH_CLIENT_BY_ID_SUCCESS,
  FETCH_CLIENT_BY_ID_FAILURE,
  DELETE_CLIENT_REQUEST,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILURE
} from '../ActionTypes';

import { baseUrl } from '../../shared/baseUrl';

import showErrors from './showErrors';

// link catch error: https://stackoverflow.com/a/70697103
// https://stackoverflow.com/a/54950884
export const fetchClients = (url = baseUrl + 'clients') => async (dispatch) => {

  dispatch(fetchClientsRequest());

  try {
    // const response = await fetch('http://127.0.0.1:8000?page=${page}&${filter_by}=${searchWord}');
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const clients = await response.json();
    dispatch(fetchClientsSuccess(clients));
  } catch (error) {
    dispatch(fetchClientsFailed(error.message));
    //alert(error);
    console.log(error);
  }
};

/* Call action type from clients reducer */
export const fetchClientsRequest = () => ({
    type: FETCH_CLIENTS_REQUEST
});

/* Call action type from clients reducer */
export const fetchClientsSuccess = (clients) => ({
    type: FETCH_CLIENTS_SUCCESS,
    payload: clients
});

/* Call action type from clients reducer */
export const fetchClientsFailed = (error) => ({
    type: FETCH_CLIENTS_FAILURE,
    payload: error
});

export const fetchClientById = (id) => async (dispatch) => {

  dispatch(fetchClientByIdRequest());

  try {
    const response = await fetch(baseUrl + 'clients/' + id);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const clients = await response.json();
    dispatch(fetchClientByIdSuccess(clients));
  } catch (error) {
    dispatch(fetchClientByIdFailed(error.message));
    //alert(error);
    console.log(error);
  }
};

/* Call action type from clients reducer */
export const fetchClientByIdRequest = () => ({
    type: FETCH_CLIENT_BY_ID_REQUEST
});

/* Call action type from clients reducer */
export const fetchClientByIdSuccess = (client) => ({
    type: FETCH_CLIENT_BY_ID_SUCCESS,
    payload: client
});

/* Call action type from clients reducer */
export const fetchClientByIdFailed = (error) => ({
    type: FETCH_CLIENT_BY_ID_FAILURE,
    payload: error
});

export const createClient = (data) => async (dispatch) => {
  //console.log('data here!')
  //console.log(data);
  dispatch(createClientRequest());
  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      },
      body: JSON.stringify(data)
  };
  try {
    const response = await fetch(baseUrl + 'clients', requestOptions);
    if (!response.ok) {

      const errors = await response.json();
      //throw {message: error.message,status:error.cod};
      showErrors(errors);
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    alert("Client created succesfully")
    dispatch(createClientSuccess(data));
    return data;
  } catch (error) {
    dispatch(createClientFailed(error));
    //alert(error);
    console.log(error);
  }
};

/* Call action type from clients reducer */
export const createClientRequest = () => ({
    type: CREATE_CLIENT_REQUEST
});

/* Call action type from clients reducer */
export const createClientSuccess = (client) => ({
    type: CREATE_CLIENT_SUCCESS,
    payload: client
});

/* Call action type from clients reducer */
export const createClientFailed = (error) => ({
    type: CREATE_CLIENT_FAILURE,
    payload: error
});

export const updateClient = (data, clientId) => async (dispatch) => {
  
  dispatch(updateClientRequest());
  const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      },
      body: JSON.stringify(data)
  };
  try {
    const response = await fetch(baseUrl + 'clients/' + clientId, requestOptions);
    if (!response.ok) {

      const errors = await response.json();
      //throw {message: error.message,status:error.cod};
      showErrors(errors);
      throw new Error('Network response was not ok');
    }else{
      if (response.status === 204) {
        // Handle 204 No Content success (e.g., show a success message, update UI state)
        alert("Client updated succesfully")
        console.log('Request successful, but no content returned.');
        dispatch(updateClientSuccess());
        return; // Exit the function as there is no body to parse
      } else {
        // Handle 200 OK or other success codes with content
        const data = await response.json();
        console.log('Request successful with data:', data);
        // Process the data in your React application
        dispatch(updateClientSuccess());
        return data;
      }
    }
    //return data;
  } catch (error) {
    dispatch(updateClientFailed(error));
    //alert(error);
    console.log(error);
  }
};

/* Call action type from clients reducer */
export const updateClientRequest = () => ({
    type: UPDATE_CLIENT_REQUEST
});

/* Call action type from clients reducer */
export const updateClientSuccess = () => ({
    type: UPDATE_CLIENT_SUCCESS
});

/* Call action type from clients reducer */
export const updateClientFailed = (error) => ({
    type: UPDATE_CLIENT_FAILURE,
    payload: error
});

export const deleteClient = (clientId) => async (dispatch) => {
  
  dispatch(deleteClientRequest());
  const requestOptions = {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      }
  };
  try {
    const response = await fetch(baseUrl + 'clients/' + clientId, requestOptions);
    if (!response.ok) {

      const errors = await response.json();
      //throw {message: error.message,status:error.cod};
      showErrors(errors);
      throw new Error('Network response was not ok');
    }else{
      if (response.status === 204) {
        // Handle 204 No Content success (e.g., show a success message, update UI state)
        alert("Client deleted succesfully");
        console.log('Request successful, but no content returned.');
        dispatch(deleteClientSuccess());
        // Redirect to home page
        window.location.replace('/');
        return; // Exit the function as there is no body to parse
      } else {
        // Handle 200 OK or other success codes with content
        const data = await response.json();
        console.log('Request successful with data:', data);
        // Process the data in your React application
        return data;
      }
    }
    //return data;
  } catch (error) {
    dispatch(deleteClientFailed(error));
    //alert(error);
    console.log(error);
  }
};

/* Call action type from clients reducer */
export const deleteClientRequest = () => ({
    type: DELETE_CLIENT_REQUEST
});

/* Call action type from clients reducer */
export const deleteClientSuccess = () => ({
    type: DELETE_CLIENT_SUCCESS
});

/* Call action type from clients reducer */
export const deleteClientFailed = (error) => ({
    type: DELETE_CLIENT_FAILURE,
    payload: error
});

export const getNewEmail = (
  first_name, 
  first_last_name, 
  country
) => async (dispatch) => {

  dispatch(getNewEmailRequest());
  const firstLastNameWithNoSpaces = first_last_name.replace(/\s/g, '');
  try {
    // const response = await fetch('http://127.0.0.1:8000?page=${page}&${filter_by}=${searchWord}');
    const url = baseUrl + 'clients/get-new-email?first_name=' + first_name
                        + '&first_last_name=' + firstLastNameWithNoSpaces 
                        + '&country=' + country;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const new_email = await response.json();
    dispatch(getNewEmailSuccess(new_email));
  } catch (error) {
    dispatch(getNewEmailFailed(error.message));
    //alert(error);
    console.log(error);
  }
};

/* Call action type from clients reducer */
export const getNewEmailRequest = () => ({
    type: GET_NEW_EMAIL_REQUEST
});

/* Call action type from clients reducer */
export const getNewEmailSuccess = (newEmail) => ({
    type: GET_NEW_EMAIL_SUCCESS,
    payload: newEmail
});

/* Call action type from clients reducer */
export const getNewEmailFailed = (error) => ({
    type: GET_NEW_EMAIL_FAILURE,
    payload: error
});