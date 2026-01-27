import { Loading } from './LoadingComponent';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { 
	Button, 
	Form, 
	FormGroup, 
	Input, 
  Label, 
	Container, 
	Row, 
	Col,
} from 'reactstrap';

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
            <FormGroup>
              <Label for="type_of_identity_document_description">
                Type of identity document
              </Label>
              <Input
                plaintext
                id="type_of_identity_document_description" 
                name="type_of_identity_document_description"
                defaultValue={formData.type_of_identity_document_description} 
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="identity_document">Identity document</Label>
              <Input
                plaintext
                id="identity_document" 
                name="identity_document"
                defaultValue={formData.identity_document} 
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="first_last_name">First Lastname</Label>
              <Input
                plaintext
                id="first_last_name" 
                name="first_last_name"
                defaultValue={formData.first_last_name} 
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="second_last_name">Second LastName</Label>
              <Input
                plaintext
                id="second_last_name" 
                name="second_last_name"
                defaultValue={formData.second_last_name} 
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="first_name">First Name</Label>
              <Input
                plaintext
                id="first_name" 
                name="first_name"
                defaultValue={formData.first_name} 
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="other_names">Other Names</Label>
              <Input
                plaintext
                id="other_names" 
                name="other_names"
                defaultValue={formData.other_names} 
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                plaintext
                id="email" 
                name="email"
                defaultValue={formData.email} 
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="country">
                Country
              </Label>
              <Input
                plaintext
                id="country" 
                name="country"
                defaultValue={formData.country} 
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="date_of_entry">
                Date of entry
              </Label>
              <Input
                plaintext
                id="date_of_entry" 
                name="date_of_entry"
                defaultValue={formData.date_of_entry} 
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="status">
                Status
              </Label>
              <Input
                plaintext
                id="status" 
                name="status"
                defaultValue={formData.status} 
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="area_name">
                Area
              </Label>
              <Input
                plaintext
                id="area_name" 
                name="area_name"
                defaultValue={formData.area_name} 
              />
            </FormGroup>          
          </Col>      
          <Col md="4">
            <Button
              color="danger"
              size="lg"
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
  
};
