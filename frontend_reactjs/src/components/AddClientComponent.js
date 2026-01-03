import { Loading } from './LoadingComponent';
import { Container, Table, Button } from 'reactstrap';
import React, { useState } from 'react';
import * as z from 'zod'; // Import Zod library

// Define a validation schema in JavaScript
const userSchema = z.object({
  identity_document: z.string().min(3, { message: "Identity document must be at least 3 characters long" }),
  first_last_name: z.string().min(3, { message: "First Lastname must be at least 3 characters long" }),
  second_last_name: z.string().min(3, { message: "First name must be at least 3 characters long" }),
  first_name: z.string().min(3, { message: "First name must be at least 3 characters long" }),
  other_names: z.string().min(3, { message: "First name must be at least 3 characters long" }),
  email: z.string().min(3, { message: "First name must be at least 3 characters long" }),
  country: z.string().min(2, { message: "First name must be at least 3 characters long" }),
  date_of_entry: z.string().min(3, { message: "First name must be at least 3 characters long" }),
  status: z.string().min(3, { message: "tatus must be at least 3 characters long" }),
  type_of_identity_document_id: z.string().min(1, { message: "First name must be at least 1 characters long" }),
  area_id: z.string().min(1, { message: "First name must be at least 1 characters long" }),
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
        country: '' , 
        date_of_entry: '' , 
        status: '' , 
        type_of_identity_document_id: '' , 
        area_id: '' 
    }
);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Identity document:</label>
        <input
          type="text"
          name="identity_document"
          value={formData.identity_document}
          onChange={handleChange}
        />
        {errors.identity_document && <p style={{ color: 'red' }}>{errors.identity_document}</p>}
      </div>
      <div>
        <label>First Lastname:</label>
        <input
          type="text"
          name="first_last_name"
          value={formData.first_last_name}
          onChange={handleChange}
        />
        {errors.first_last_name && <p style={{ color: 'red' }}>{errors.first_last_name}</p>}
      </div>
      <div>
        <label>Second LastName:</label>
        <input
          type="text"
          name="second_last_name"
          value={formData.second_last_name}
          onChange={handleChange}
        />
        {errors.second_last_name && <p style={{ color: 'red' }}>{errors.second_last_name}</p>}
      </div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        {errors.first_name && <p style={{ color: 'red' }}>{errors.first_name}</p>}
      </div>
      <div>
        <label>Other Names:</label>
        <input
          type="text"
          name="other_names"
          value={formData.other_names}
          onChange={handleChange}
        />
        {errors.other_names && <p style={{ color: 'red' }}>{errors.other_names}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        {errors.country && <p style={{ color: 'red' }}>{errors.country}</p>}
      </div>
      <div>
        <label>Date of entry:</label>
        <input
          type="text"
          name="date_of_entry"
          value={formData.date_of_entry}
          onChange={handleChange}
        />
        {errors.date_of_entry && <p style={{ color: 'red' }}>{errors.date_of_entry}</p>}
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
        {errors.status && <p style={{ color: 'red' }}>{errors.status}</p>}
      </div>
      <div>
        <label>Type of identity document:</label>
        <input
          type="text"
          name="type_of_identity_document_id"
          value={formData.type_of_identity_document_id}
          onChange={handleChange}
        />
        {errors.type_of_identity_document_id && <p style={{ color: 'red' }}>{errors.type_of_identity_document_id}</p>}
      </div>
      <div>
        <label>Area:</label>
        <input
          type="text"
          name="area_id"
          value={formData.area_id}
          onChange={handleChange}
        />
        {errors.area_id && <p style={{ color: 'red' }}>{errors.area_id}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
