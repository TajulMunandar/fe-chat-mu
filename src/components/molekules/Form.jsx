// src/components/atoms/FormInput.jsx
import PropTypes from 'prop-types';

const FormInput = ({ id, label, type, value, onChange, autoComplete }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
        <input
          id={id}
          value={value}
          onChange={onChange}
          name={id}
          type={type}
          autoComplete={autoComplete}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string.isRequired,
};

export default FormInput;
