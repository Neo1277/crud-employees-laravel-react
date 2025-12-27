import React, { Component } from 'react';
import ClientListComponent from './ClientListComponent';


//import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
//import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { 
  fetchClients
} from '../redux/ActionCreators/clientActions';

/* Set data gotten from Laravel API with redux to the Component's props */
const mapStateToProps = state => {
    return{
      clients: state.clients,
      /*areas: state.areas,
      types_of_identity_document: state.types_of_identity_document,*/
    }
}

/* Set functions from ActionCreators redux to the Component's props and dispatch */
const mapDispatchToProps = (dispatch) => ({
    fetchClients: (page, filter_by, searchWord) => { dispatch(fetchClients(page, filter_by, searchWord))},
});

export const withRouter = (Component) =>{
    const Wrapper = (props) =>{
        const history = useNavigate();
        return <Component history={history} {...props}/>
    } 
    return Wrapper;
}

class Main extends Component {

    //Execute this before render
    componentDidMount() {
      this.props.fetchClients();
    }
    render(){
    /*
      if(this.props.products.isLoading){
          return(
            <Loading />
        );
      }*/

      /**
       * Set routes to open the different pages calling the components
       * And redirect to home if the url that the user type in the browser
       * does not match with any url from here
       */
  
      return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/home" element={<ClientListComponent clients={this.props.clients}/>}/>
                    
                </Routes>
            </Router>
        </div>
      );
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));