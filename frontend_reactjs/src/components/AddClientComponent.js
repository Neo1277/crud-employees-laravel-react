import { Loading } from './LoadingComponent';
import React, { useState, useEffect  } from 'react';
import { 
	Button, 
	Form, 
	Container, 
	Row, 
	Col,
} from 'reactstrap';
import { clientSchema } from './validations/clientSchema';
import  FormInput  from './FormInput';

export default function AddClientComponent(props) {
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
  };

  useEffect(() => {
    if (props.newEmail.isLoading) {
      console.log("Loading...");
    }else if (props.newEmail.errorMessage) {
      alert("Error: " + props.newEmail.errorMessage);
    }else{
      console.log("Email received:", props.newEmail.newEmail);
      setFormData(prev => ({ ...prev, email: props.newEmail.newEmail.new_email }))
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
      props.createClient(result.data);
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
    props.typesOfIdentityDocument.isLoading ||
    props.areas.isLoading;

  const anyError =
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
          <h1>Add client</h1>
          <Col md="4">
            <FormInput
              label="Type of identity document"
              id="type_of_identity_document_id"
              name="type_of_identity_document_id"
              type="select"
              value={formData.type_of_identity_document_id}
              onChange={handleChange}
              error={errors.type_of_identity_document_id}
              options={props.typesOfIdentityDocument.typesOfIdentityDocument.data.map(t => ({
                value: t.id,
                label: t.description,
              }))}
            />            
          </Col>
          <Col md="4">
            <FormInput
              label="Identity document"
              id="identity_document"
              name="identity_document"
              value={formData.identity_document}
              onChange={handleChange}
              error={errors.identity_document}
              required
            />
          </Col>
          <Col md="4">
            <FormInput
              label="First Lastname"
              id="first_last_name"
              name="first_last_name"
              value={formData.first_last_name}
              onChange={handleChange}
              onBlur={generateNewEmail}
              error={errors.first_last_name}
              required
            />
          </Col>
          <Col md="4">
            <FormInput
              label="Second LastName"
              id="second_last_name"
              name="second_last_name"
              value={formData.second_last_name}
              onChange={handleChange}
              error={errors.second_last_name}
              required
            />            
          </Col>
          <Col md="4">
            <FormInput
              label="First Name"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              onBlur={generateNewEmail}
              error={errors.first_name}
              required
            />
          </Col>
          <Col md="4">
            <FormInput
              label="Other Names"
              id="other_names"
              name="other_names"
              value={formData.other_names}
              onChange={handleChange}
              error={errors.other_names}
              required
            />            
          </Col>
          <Col md="4">
            <FormInput
              label="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />            
          </Col>
          <Col md="4">
          <FormInput
            label="Country"
            id="country"
            name="country"
            type="select"
            value={formData.country}
            onChange={handleChange}
            onBlur={generateNewEmail}
            error={errors.country}
            options={[
              { value: 'co', label: 'Colombia' },
              { value: 'us', label: 'United States' },
            ]}
          />
          </Col>
          <Col md="4">
          <FormInput
            label="Date of entry"
            id="date_of_entry"
            name="date_of_entry"
            type="date"
            placeholder="Date of entry"
            value={formData.date_of_entry}
            onChange={handleChange}
            error={errors.date_of_entry}
          />
          </Col>
          <Col md="4">
            <FormInput
              label="Status"
              id="status"
              name="status"
              type="select"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
            />
          </Col>
          <Col md="4">
            <FormInput
              label="Area"
              id="area_id"
              name="area_id"
              type="select"
              value={formData.area_id}
              onChange={handleChange}
              error={errors.area_id}
              options={props.areas.areas.data.map(a => ({
                value: a.id,
                label: a.name,
              }))}
            />       
          </Col>      
          <Col md="4">
            <Button
              color="primary"
              size="lg"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
  
};
