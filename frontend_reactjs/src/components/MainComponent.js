import React, { Component } from 'react';
import ClientListComponent from './ClientListComponent';
import AddClientComponent from './AddClientComponent';
import NotFoundComponent from './NotFoundComponent';
import Footer from './FooterComponent';

//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { connect } from 'react-redux';
import { 
  fetchClients,
  createClient,
  getNewEmail
} from '../redux/ActionCreators/clientActions';
import { 
  fetchTypesOfIdentityDocument
} from '../redux/ActionCreators/typeOfIdentityDocumentActions';
import { 
  fetchAreas
} from '../redux/ActionCreators/areasActions';

/* Set data gotten from Laravel API with redux to the Component's props */
const mapStateToProps = state => {
    return{
      clients: state.clients,
      areas: state.areas,
      typesOfIdentityDocument: state.typesOfIdentityDocument,
      newEmail: state.newEmail,
    }
}

/* Set functions from ActionCreators redux to the Component's props and dispatch */
const mapDispatchToProps = (dispatch) => ({
    fetchClients: (page, filter_by, searchWord) => { dispatch(fetchClients(page, filter_by, searchWord))},
    createClient: (data) => { dispatch(createClient(data))},
    fetchAreas: () => { dispatch(fetchAreas())},
    fetchTypesOfIdentityDocument: () => { dispatch(fetchTypesOfIdentityDocument())},
    getNewEmail: (first_name, first_last_name, country) => { dispatch(getNewEmail(first_name, first_last_name, country))},
});

/*
export const withRouter = (Component) =>{
    const Wrapper = (props) =>{
        const history = useNavigate();
        return <Component history={history} {...props}/>
    } 
    return Wrapper;
}*/

class Main extends Component {

    //Execute this before render
    componentDidMount() {
      this.props.fetchClients();
      this.props.fetchAreas();
      this.props.fetchTypesOfIdentityDocument();
      //this.props.getNewEmail();
    }
    render(){

      /**
       * Set routes to open the different pages calling the components
       * And redirect to home if the url that the user type in the browser
       * does not match with any url from here
       * React router dom with redux link:
       * https://www.geeksforgeeks.org/reactjs/implementing-react-router-with-redux-in-react/
       */
  
      return (
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<ClientListComponent clients={this.props.clients}/>} />
              <Route path='/add-client' element={<AddClientComponent 
                                                  createClient={this.props.createClient} 
                                                  typesOfIdentityDocument={this.props.typesOfIdentityDocument}
                                                  areas={this.props.areas}
                                                  getNewEmail={this.props.getNewEmail}
                                                  newEmail={this.props.newEmail}/>} 
                                                  />
              <Route path="*" element={<NotFoundComponent />} />
            </Routes>
          </Router>
          <Footer />
        </div>
      );
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);