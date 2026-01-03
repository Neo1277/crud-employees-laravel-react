import { 
  FETCH_CLIENTS_REQUEST, 
  FETCH_CLIENTS_SUCCESS, 
  FETCH_CLIENTS_FAILURE,
  CREATE_CLIENT_REQUEST,
  CREATE_CLIENT_FAILURE,
  CREATE_CLIENT_SUCCESS
} from '../ActionTypes';

import { baseUrl } from '../../shared/baseUrl';

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
    alert(error);
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
  console.log(data);
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
    if (response.status !== 200) {

      const errors = await response.json();
      //throw {message: error.message,status:error.cod};
      showErrors(errors);
    }
    const data = await response.json();
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

function showErrors(errors){
  var error_messages = '';
  if(errors.errors.identity_document){
    error_messages += errors.errors.identity_document + '\n\n';
  }

  if(errors.errors.first_last_name){
    error_messages += errors.errors.first_last_name + '\n\n';
  }

  if(errors.errors.second_last_name){
    error_messages += errors.errors.second_last_name + '\n\n';
  }

  if(errors.errors.first_name){
    error_messages += errors.errors.first_name + '\n\n';
  }

  if(errors.errors.other_names){
    error_messages += errors.errors.other_names + '\n\n';
  }
  
  if(errors.errors.email){
    error_messages += errors.errors.email + '\n\n';
  }
  
  if(errors.errors.country){
    error_messages += errors.errors.country + '\n\n';
  }
  
  if(errors.errors.date_of_entry){
    error_messages += errors.errors.date_of_entry + '\n\n';
  }
  
  if(errors.errors.status){
    error_messages += errors.errors.status + '\n\n';
  }
  
  if(errors.errors.type_of_identity_document_id){
    error_messages += errors.errors.type_of_identity_document_id + '\n\n';
  }
  
  if(errors.errors.area_id){
    error_messages += errors.errors.area_id + '\n\n';
  }

  alert(error_messages);

}