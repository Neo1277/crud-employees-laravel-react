import { 
  FETCH_CLIENTS_REQUEST, 
  FETCH_CLIENTS_SUCCESS, 
  FETCH_CLIENTS_FAILURE 
} from '../ActionTypes';

// link catch error: https://stackoverflow.com/a/70697103
// https://stackoverflow.com/a/54950884
export const fetchClients = (page = "1", filter_by = "identity_document", searchWord = "") => async (dispatch) => {

  dispatch(fetchClientRequest(true));

  try {
    // const response = await fetch('http://127.0.0.1:8000?page=${page}&${filter_by}=${searchWord}');
    const response = await fetch('http://127.0.0.1:8000?page=' + page +'&' + filter_by + '=' + searchWord + '');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const clients = await response.json();
    dispatch(fetchClientSuccess(clients));
  } catch (error) {
    dispatch(clientsFailed(error.message));
    alert(error);
  }
};

/* Call action type from clients reducer */
export const fetchClientRequest = () => ({
    type: FETCH_CLIENTS_REQUEST
});

/* Call action type from clients reducer */
export const fetchClientSuccess = (clients) => ({
    type: FETCH_CLIENTS_SUCCESS,
    payload: clients
});

/* Call action type from clients reducer */
export const clientsFailed = (error) => ({
    type: FETCH_CLIENTS_FAILURE,
    payload: error
});