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
  UPDATE_CLIENT_SUCCESS
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

export const updateClient = (data) => async (dispatch) => {
  //console.log('data here!')
  //console.log(data);
  dispatch(updateClientRequest());
  const id = data.id;
  const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      },
      body: JSON.stringify(data)
  };
  try {
    const response = await fetch(baseUrl + 'clients/' + id, requestOptions);
    if (!response.ok) {

      const errors = await response.json();
      //throw {message: error.message,status:error.cod};
      showErrors(errors);
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    alert("Client updated succesfully")
    dispatch(updateClientSuccess(data));
    return data;
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
export const updateClientSuccess = (client) => ({
    type: UPDATE_CLIENT_SUCCESS,
    payload: client
});

/* Call action type from clients reducer */
export const updateClientFailed = (error) => ({
    type: UPDATE_CLIENT_FAILURE,
    payload: error
});

export const getNewEmail = (
  first_name, 
  first_last_name, 
  country
) => async (dispatch) => {

  dispatch(getNewEmailRequest());

  try {
    // const response = await fetch('http://127.0.0.1:8000?page=${page}&${filter_by}=${searchWord}');
    const url = baseUrl + 'clients/get-new-email?first_name=' + first_name
                        + '&first_last_name=' + first_last_name 
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