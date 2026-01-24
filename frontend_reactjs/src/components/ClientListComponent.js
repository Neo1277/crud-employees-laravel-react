import { Loading } from './LoadingComponent';
import { Container, Table, Button } from 'reactstrap';
import { Link } from "react-router";
import SearchClientComponent from './SearchClientComponent';
import PaginationComponent from './PaginationComponent';

export default function ClientListComponent(props) {
    
	if (props.clients.isLoading) {
		
        return(
            <Loading />
        );
    }
    else if (props.clients.errorMessage) {
        return(
            <h4>{props.clients.errorMessage}</h4>
        );
    }
	else{
        return(
            <Container>
                <SearchClientComponent fetchClients={props.fetchClients}/>
                <h1>Client list</h1>
                <Link to='/add-client' >
					<Button color="primary">
                        <span className="fa fa-plus-square">&nbsp;</span>  
                           Add client
                    </Button>
                </Link>	
                <Table responsive striped>
                    <thead>
                        <tr>
                        <th>Type of identity document</th>
                        <th>Identity Document</th>
                        <th>First Last Name</th>
                        <th>Second Last Name</th>
                        <th>First name</th>
                        <th>Other names</th>
                        <th>Email</th>
                        <th>Country employment</th>
                        <th>Date of entry</th>
                        <th>Date and time created</th>
                        <th>Date and time updated</th>
                        <th>Status</th>
                        <th>Area</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                {props.clients.clients.data.map((field, i) => { 
                    
                    return(
                        <tr key={field.id}>
                            <td>{field.type_of_identity_document_description}</td>
                            <td>{field.identity_document}</td>
                            <td>{field.first_last_name}</td>
                            <td>{field.second_last_name }</td>
                            <td>{field.first_name}</td>
                            <td>{field.other_names}</td>
                            <td>{field.email}</td>
                            <td>{field.country}</td>
                            <td>{field.date_of_entry}</td>
                            <td>{field.created_at}</td>
                            <td>{field.updated_at}</td>
                            <td>{field.status}</td>
                            <td>{field.area}</td>
                            <td>
                                <Link to={`/edit-client/${field.id}`} >
                                    <Button color="success">
                                        Edit
                                        <span className="fa fa-pencil"></span>
                                    </Button>
                                </Link>
                                <Link to={`/delete-client/${field.id}`} >
                                    <Button color="danger">
                                        Delete
                                        <span className="fa fa-trash"></span>
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    );
                }) }
                    </tbody>
                </Table>
                <PaginationComponent clients={props.clients} fetchClients={props.fetchClients}/>
            </Container>
        );
    }
}