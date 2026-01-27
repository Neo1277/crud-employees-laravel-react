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
import { clientSchema } from './validations/clientSchema';

export default function EditClientComponent(props) {
  const { clientId } = useParams();

  const { fetchClientById } = props;

  // Select the client from the Redux store
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
          area_id: '1' 
      }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //generateNewEmail();
  };

  // Load client for edit
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
      });
    }
  }, [client, clientId]);

  useEffect(() => {
    if (props.newEmail.isLoading) {
      console.log("Loading...");
    }else if (props.newEmail.errorMessage) {
      alert("Error: " + props.newEmail.errorMessage);
    }else{
      console.log("Email received:", props.newEmail.newEmail);
      setFormData(prev => ({ ...prev, email: props.newEmail.newEmail.new_email }));
    }
  }, [props.newEmail]);

  const generateNewEmail = () => {
    if (formData.first_name && formData.first_last_name && formData.country) {
      props.getNewEmail(
        formData.first_name,
        formData.first_last_name,
        formData.country
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the data at runtime using safeParse
    const result = clientSchema.safeParse(formData);

    if (result.success) {
      // Data is valid
      setErrors({});
      console.log('Form submitted successfully:', result.data);
      // Proceed with form submission logic (e.g., API call)
      props.updateClient(result.data, clientId);
    } else {
      // Data is invalid, handle errors
      const fieldErrors = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
    }
  };
  
  const isAnyLoading =
    isLoading ||
    props.typesOfIdentityDocument.isLoading ||
    props.areas.isLoading;

  const anyError =
    errorMessage ||
    props.typesOfIdentityDocument.errorMessage ||
    props.areas.errorMessage;

	if (isAnyLoading) {
    return <Loading />;
  }

  if (anyError) {
    return <h4>{anyError}</h4>;
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} data-testid="AddClientForm">
        <Row>
          <h1>Edit client</h1>
          <Col md="4">
            <FormGroup>
              <Label for="type_of_identity_document_id">
                Type of identity document
              </Label>
              <Input
                id="type_of_identity_document_id"
                name="type_of_identity_document_id"
                type="select"
                value={formData.type_of_identity_document_id} 
                onChange={handleChange}
              >
                {props.typesOfIdentityDocument.typesOfIdentityDocument.data.map((field, i) => { 
                    return(
                        <option key={field.id} value={field.id}>{field.description}</option>
                    );
                  }) 
                }
              </Input>
              {errors.type_of_identity_document_id && <p data-testid="type_of_identity_document_id_error" style={{ color: 'red' }}>{errors.type_of_identity_document_id}</p>}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
                <Label for="identity_document">Identity document</Label>
                <Input 
                  type="text" 
                  id="identity_document" 
                  name="identity_document"
                  value={formData.identity_document} 
                  onChange={handleChange} 
                  required 
                />
                {errors.identity_document && <p data-testid="identity_document_error" style={{ color: 'red' }}>{errors.identity_document}</p>}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="first_last_name">First Lastname</Label>
              <Input 
                type="text" 
                id="first_last_name" 
                name="first_last_name"
                value={formData.first_last_name} 
                onChange={handleChange}
                onBlur={generateNewEmail}
                required 
              />
                {errors.first_last_name && <p data-testid="first_last_name_error" style={{ color: 'red' }}>{errors.first_last_name}</p>}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="second_last_name">Second LastName</Label>
              <Input 
                type="text" 
                id="second_last_name" 
                name="second_last_name"
                value={formData.second_last_name} 
                onChange={handleChange} 
                required 
              />
              {errors.second_last_name && <p data-testid="second_last_name_error" style={{ color: 'red' }}>{errors.second_last_name}</p>}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="first_name">First Name</Label>
              <Input 
                type="text" 
                id="first_name" 
                name="first_name"
                value={formData.first_name} 
                onChange={handleChange}
                onBlur={generateNewEmail}
                required 
              />
              {errors.first_name && <p data-testid="first_name_error" style={{ color: 'red' }}>{errors.first_name}</p>}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="other_names">Other Names</Label>
              <Input 
                type="text" 
                id="other_names" 
                name="other_names"
                value={formData.other_names} 
                onChange={handleChange} 
                required 
              />
              {errors.other_names && <p data-testid="other_names_error" style={{ color: 'red' }}>{errors.other_names}</p>}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
              {errors.email && <p data-testid="email_error" style={{ color: 'red' }}>{errors.email}</p>}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="country">
                Country
              </Label>
              <Input
                id="country"
                name="country"
                type="select"
                value={formData.country} 
                onChange={handleChange}
                onBlur={generateNewEmail}
              >
                <option key="1" value="co">
                  Colombia
                </option>
                <option key="2" value="us">
                  United States
                </option>
              </Input>
              {errors.country && <p data-testid="country_error" style={{ color: 'red' }}>{errors.country}</p>}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="date_of_entry">
                Date of entry
              </Label>
              <Input
                id="date_of_entry"
                name="date_of_entry"
                placeholder="Date of entry"
                type="date"
                value={formData.date_of_entry}
                onChange={handleChange}
              />
              {errors.date_of_entry && <p data-testid="date_of_entry_error" style={{ color: 'red' }}>{errors.date_of_entry}</p>}
            </FormGroup>
          </Col>
          {/*<FormGroup>
            <Label for="date_of_entry">
              Date of entry 2
            </Label>
            <DatePicker
              id="date_of_entry"
              name="date_of_entry" 
              selected={selectedDate} 
              onChange={handleChangeDate} 
              dateFormat="YYYY-MM-DD" 
            />
            {errors.date_of_entry && <p style={{ color: 'red' }}>{errors.date_of_entry}</p>}
          </FormGroup>*/}
          <Col md="4">
            <FormGroup>
              <Label for="status">
                Status
              </Label>
              <Input
                id="status"
                name="status"
                type="select"
                value={formData.status} 
                onChange={handleChange}
              >
                <option key="1" value="Active">
                  Active
                </option>
                <option key="2" value="Inactive">
                  Inactive
                </option>
              </Input>
              {errors.status && <p data-testid="status_error" style={{ color: 'red' }}>{errors.status}</p>}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="area_id">
                Area
              </Label>
              <Input
                id="area_id"
                name="area_id"
                type="select"
                value={formData.area_id} 
                onChange={handleChange}
              >
                {props.areas.areas.data.map((field, i) => { 
                    return(
                        <option key={field.id} value={field.id}>{field.name}</option>
                    );
                  }) 
                }
              </Input>
              {errors.area_id && <p data-testid="area_id_error" style={{ color: 'red' }}>{errors.area_id}</p>}
            </FormGroup>          
          </Col>      
          <Col md="4">
            <Button
              color="success"
              size="lg"
            >
              Edit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
  
};
