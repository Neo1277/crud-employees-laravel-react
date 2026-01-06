import { Loading } from './LoadingComponent';
import React, { useState } from 'react';
import * as z from 'zod'; // Import Zod library
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
import { DatePicker, Space } from 'antd';

// Define a validation schema in JavaScript
const userSchema = z.object({
  identity_document: z.string().min(3, { message: "Identity document must be at least 3 characters long" }),
  first_last_name: z.string().min(3, { message: "First Lastname must be at least 3 characters long" }),
  second_last_name: z.string().min(3, { message: "First name must be at least 3 characters long" }),
  first_name: z.string().min(3, { message: "First name must be at least 3 characters long" }),
  other_names: z.string().min(3, { message: "First name must be at least 3 characters long" }),
  email: z.string().min(3, { message: "First name must be at least 3 characters long" }),
  country: z.string(),
  date_of_entry: z.string().date().transform((isoString) => {
    const date = new Date(isoString);
    // Example formatting: this is a simple, non-library specific way to show the idea
    const formattedDate = date.toISOString().split('T')[0]; 
    return formattedDate;
  }),
  status: z.string(),
  type_of_identity_document_id: z.string(),
  area_id: z.string(),
});

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

  /*const onChangeDate = (date, dateString) => {
    //console.log(date, dateString);
    console.log("Date here");
    console.log(dateString);
    setFormData({ ...formData, 'date_of_entry': dateString });
  };*/

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the data at runtime using safeParse
    const result = userSchema.safeParse(formData);

    if (result.success) {
      // Data is valid
      setErrors({});
      console.log('Form submitted successfully:', result.data);
      props.createClient(result.data);
      // Proceed with form submission logic (e.g., API call)
    } else {
      // Data is invalid, handle errors
      const fieldErrors = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
    }
  };

	if (props.typesOfIdentityDocument.isLoading) {
		
        return(
            <Loading />
        );
    }
    else if (props.typesOfIdentityDocument.errorMessage) {
        return(
            <h4>{props.clients.errorMessage}</h4>
        );
    }
	else{
    return (
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
              <Col className="form" md="4">
                <h1>Add client</h1>
                {/*<div>
                  <label>Type of identity document:</label>
                  <input
                    type="text"
                    name="type_of_identity_document_id"
                    value={formData.type_of_identity_document_id}
                    onChange={handleChange}
                  />
                  {errors.type_of_identity_document_id && <p style={{ color: 'red' }}>{errors.type_of_identity_document_id}</p>}
                </div>*/}
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
                          <>
                            <option value={field.id}>{field.description}</option>
                          </>
                        );
                      }) 
                    }
                  </Input>
                  {errors.type_of_identity_document_id && <p style={{ color: 'red' }}>{errors.type_of_identity_document_id}</p>}
                </FormGroup>
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
                    {errors.identity_document && <p style={{ color: 'red' }}>{errors.identity_document}</p>}
                </FormGroup>
                <FormGroup>
                    <Label for="first_last_name">First Lastname</Label>
                    <Input 
                      type="text" 
                      id="first_last_name" 
                      name="first_last_name"
                      value={formData.first_last_name} 
                      onChange={handleChange} 
                      required 
                    />
                    {errors.first_last_name && <p style={{ color: 'red' }}>{errors.first_last_name}</p>}
                </FormGroup>
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
                    {errors.second_last_name && <p style={{ color: 'red' }}>{errors.second_last_name}</p>}
                </FormGroup>
                <FormGroup>
                    <Label for="first_name">First Name</Label>
                    <Input 
                      type="text" 
                      id="first_name" 
                      name="first_name"
                      value={formData.first_name} 
                      onChange={handleChange} 
                      required 
                    />
                    {errors.first_name && <p style={{ color: 'red' }}>{errors.first_name}</p>}
                </FormGroup>
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
                    {errors.other_names && <p style={{ color: 'red' }}>{errors.other_names}</p>}
                </FormGroup>
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
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </FormGroup>
                {/*<div>
                  <label>country:</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  {errors.country && <p style={{ color: 'red' }}>{errors.country}</p>}
                </div>*/}
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
                  >
                    <option value="co">
                      Colombia
                    </option>
                    <option value="us">
                      United States
                    </option>
                  </Input>
                  {errors.country && <p style={{ color: 'red' }}>{errors.country}</p>}
                </FormGroup>
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
                  {errors.date_of_entry && <p style={{ color: 'red' }}>{errors.date_of_entry}</p>}
                </FormGroup>
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
                    <option value="Active">
                      Active
                    </option>
                    <option value="Inactive">
                      Inactive
                    </option>
                  </Input>
                  {errors.status && <p style={{ color: 'red' }}>{errors.status}</p>}
                </FormGroup>
                {/*<div>
                  <label>status:</label>
                  <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  />
                  {errors.status && <p style={{ color: 'red' }}>{errors.status}</p>}
                </div>*/}
                {/*<div>
                  <label>Area:</label>
                  <input
                    type="text"
                    name="area_id"
                    value={formData.area_id}
                    onChange={handleChange}
                  />
                  {errors.area_id && <p style={{ color: 'red' }}>{errors.area_id}</p>}
                </div>*/}
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
                          <>
                            <option value={field.id}>{field.name}</option>
                          </>
                        );
                      }) 
                    }
                  </Input>
                  {errors.area_id && <p style={{ color: 'red' }}>{errors.area_id}</p>}
                </FormGroup>                
                <Button
                  color="primary"
                >
                  Submit
                </Button>
              </Col>
          </Row>
        </Form>
      </Container>
    );
  }
};
