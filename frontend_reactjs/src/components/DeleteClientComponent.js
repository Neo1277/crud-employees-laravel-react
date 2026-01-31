import { Loading } from './LoadingComponent';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { 
	Button, 
	Form, 
	Container, 
	Row, 
	Col,
} from 'reactstrap';
import  FormInput  from './FormInput';

export default function DeleteClientComponent(props) {
  const { clientId } = useParams();

  const { fetchClientById } = props;

  const { isLoading, errorMessage, client } = useSelector(
    (state) => state.clientById
  );
  
  const [formData, setFormData] = useState(
      { 
          identity_document: '', 
          first_last_name: '', 
          second_last_name: '' , 
          first_name: '' , 
          other_names: '' , 
          email: '' , 
          country: 'co' , 
          date_of_entry: '' , 
          status: 'Active' , 
          type_of_identity_document_id: '1' , 
          type_of_identity_document_description: '' , 
          area_id: '1' , 
          area_name: '' 
      }
  );

  // Load client for delete
  useEffect(() => {
    if (clientId) {
      fetchClientById(clientId);
    } 
  }, [clientId, fetchClientById]);

  // Fill form when client is loaded
  useEffect(() => {
    if (client.data && clientId) {
      const formattedDate = client.data.date_of_entry
        ? new Date(client.data.date_of_entry).toISOString().split("T")[0]
        : "";

      setFormData({
        type_of_identity_document_description: client.data.type_of_identity_document_description,
        type_of_identity_document_id: String(client.data.type_of_identity_document_id),
        identity_document: client.data.identity_document || '',
        first_last_name: client.data.first_last_name || '',
        second_last_name: client.data.second_last_name || '',
        first_name: client.data.first_name || '',
        other_names: client.data.other_names || '',
        email: client.data.email || '',
        country: client.data.country || 'co',
        date_of_entry: formattedDate,
        status: client.data.status || 'Active',
        area_id: String(client.data.area_id),
        area_name: client.data.area
      });
    }
  }, [client, clientId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // The confirm function returns true if OK is clicked, false otherwise
    const isConfirmed = window.confirm("Are you sure you want to delete this register?");

    if (isConfirmed) {
      props.deleteClient(clientId);
      console.log("Register deleted!");
      // Add your actual delete logic here (e.g., API call)
    } else {
      console.log("Deletion cancelled.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (errorMessage) {
    return <h4>{errorMessage}</h4>;
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} data-testid="AddClientForm">
        <Row>
          <h1>Delete client</h1>
          <Col md="4">
            <FormInput
              label="Type of identity document"
              id="type_of_identity_document_description"
              name="type_of_identity_document_description"
              plaintext
              defaultValue={formData.type_of_identity_document_description}
            />                     
          </Col>
          <Col md="4">
            <FormInput
              label="Identity document"
              id="identity_document"
              name="identity_document"
              plaintext
              defaultValue={formData.identity_document}
            />            
          </Col>
          <Col md="4">
            <FormInput
              label="First Lastname"
              id="first_last_name"
              name="first_last_name"
              plaintext
              defaultValue={formData.first_last_name}
            />                
          </Col>
          <Col md="4">
            <FormInput
              label="Second LastName"
              id="second_last_name"
              name="second_last_name"
              plaintext
              defaultValue={formData.second_last_name}
            />                   
          </Col>
          <Col md="4">
            <FormInput
              label="First Name"
              id="first_name"
              name="first_name"
              plaintext
              defaultValue={formData.first_name}
            />    
          </Col>
          <Col md="4">
            <FormInput
              label="Other Names"
              id="other_names"
              name="other_names"
              plaintext
              defaultValue={formData.other_names}
            />    
          </Col>
          <Col md="4">
            <FormInput
              label="Email"
              id="email"
              name="email"
              plaintext
              defaultValue={formData.email}
            />    
          </Col>
          <Col md="4">
            <FormInput
              label="Country"
              id="country"
              name="country"
              plaintext
              defaultValue={formData.country}
            />    
          </Col>
          <Col md="4">
            <FormInput
              label="Date of entry"
              id="date_of_entry"
              name="date_of_entry"
              plaintext
              defaultValue={formData.date_of_entry}
            />
          </Col>
          <Col md="4">
            <FormInput
              label="Status"
              id="status"
              name="status"
              plaintext
              defaultValue={formData.status}
            />
          </Col>
          <Col md="4">
            <FormInput
              label="Area"
              id="area_name"
              name="area_name"
              plaintext
              defaultValue={formData.area_name}
            />       
          </Col>      
          <Col md="4">
            <Button
              color="danger"
              size="lg"
            >
              <i className="fa-solid fa-trash-can"> </i>
              Delete
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
  
};
