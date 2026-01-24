import * as z from 'zod'; // Import Zod library
// Define a validation schema in JavaScript
export const clientSchema = z.object({
  identity_document: z.string().min(3, { message: "Identity document must be at least 3 characters long" })
                      .max(20, { message: "Identity document cannot be more than 20 characters" })
                      .regex(/^[a-zA-Z0-9]+$/, "Identity document must contain only alphanumeric characters"),
  first_last_name: z.string().min(3, { message: "First Lastname must be at least 3 characters long" })
                      .max(20, { message: "First Lastname cannot be more than 20 characters" })
                      .regex(/^[A-Z ]+$/, "Only uppercase letters (A-Z) are allowed, with one space among words and not special characters."),
  second_last_name: z.string().min(3, { message: "First name must be at least 3 characters long" })
                      .max(20, { message: "Identity document cannot be more than 20 characters" })
                      .regex(/^[A-Z]+$/, "Only uppercase letters (A-Z) are allowed, with no spaces or special characters."),
  first_name: z.string().min(3, { message: "First name must be at least 3 characters long" })
                      .max(20, { message: "First name cannot be more than 20 characters" })
                      .regex(/^[A-Z]+$/, "Only uppercase letters (A-Z) are allowed, with no spaces or special characters."),
  other_names: z.string().min(3, { message: "First name must be at least 3 characters long" })
                      .max(50, { message: "First name cannot be more than 20 characters" })
                      .regex(/^[A-Z ]+$/, "Only uppercase letters (A-Z) are allowed, with one space among words and not special characters."),
  email: z.string().email("Invalid email address"),
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