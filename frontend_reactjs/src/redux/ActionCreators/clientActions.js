import { 
  FETCH_CLIENTS_REQUEST, 
  FETCH_CLIENTS_SUCCESS, 
  FETCH_CLIENTS_FAILURE,
  CREATE_CLIENT_REQUEST,
  CREATE_CLIENT_FAILURE,
  CREATE_CLIENT_SUCCESS
} from '../ActionTypes';

import { baseUrl } from '../../shared/baseUrl';

import showErrors from './showErrors';

// link catch error: https://stackoverflow.com/a/70697103
// https://stackoverflow.com/a/54950884
export const fetchClients = (
  page = "1", 
  filterBy = "identity_document", 
  searchWord = ""
) => async (dispatch) => {

  dispatch(fetchClientsRequest());

  try {
    // const response = await fetch('http://127.0.0.1:8000?page=${page}&${filter_by}=${searchWord}');
    const response = await fetch(baseUrl + 'clients?page=' + page +'&' + filterBy + '=' + searchWord + '');
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
