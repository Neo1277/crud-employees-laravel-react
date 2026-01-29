import { render, screen, fireEvent } from '@testing-library/react';
import FormInput from '../../components/FormInput';

describe('FormInput component', () => {

    it('renders a text input with label', () => {
        render(
            <FormInput
                label="First Name"
                id="first_name"
                name="first_name"
                value="John"
                onChange={jest.fn()}
            />
        );

        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    });

    it('renders an email input', () => {
        render(
            <FormInput
                label="Email"
                id="email"
                name="email"
                type="email"
                value="sully.meneses@example.com.co"
                onChange={jest.fn()}
            />
        );

        const input = screen.getByLabelText(/email/i);
        expect(input).toHaveAttribute('type', 'email');
    });

    it('renders a select input with options', () => {
        render(
            <FormInput
                label="Country"
                id="country"
                name="country"
                type="select"
                value="co"
                onChange={jest.fn()}
                options={[
                    { value: 'co', label: 'Colombia' },
                    { value: 'us', label: 'United States' },
                ]}
            />
        );

        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();

        expect(screen.getByText('Colombia')).toBeInTheDocument();
        expect(screen.getByText('United States')).toBeInTheDocument();
    });

    it('shows error message when error is provided', () => {
        render(
            <FormInput
                label="Email"
                id="email"
                name="email"
                value=""
                onChange={jest.fn()}
                error="Invalid email"
            />
        );

        expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('renders plaintext input with defaultValue', () => {
        render(
            <FormInput
                label="First Name"
                id="first_name"
                name="first_name"
                plaintext
                defaultValue="SULLY"
            />
        );
        
        // getByDisplayValue looks at the value of <input>, <textarea>, and <select>.
        expect(screen.getByDisplayValue('SULLY')).toBeInTheDocument();
    });

    it('calls onChange when typing', () => {
        const handleChange = jest.fn();

        render(
            <FormInput
                label="First Name"
                id="first_name"
                name="first_name"
                value=""
                onChange={handleChange}
            />
        );

        fireEvent.change(screen.getByLabelText(/first name/i), {
            target: { value: 'LUZ' },
        });

        expect(handleChange).toHaveBeenCalled();
    });

    it('does not crash when onBlur is not provided', () => {
        render(
            <FormInput
                label="Last Name"
                id="last_name"
                name="last_name"
                value="Doe"
                onChange={jest.fn()}
            />
        );

        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    });

});