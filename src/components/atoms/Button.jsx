// src/components/atoms/Button.jsx
import PropTypes from 'prop-types';

const Button = ({ isLoading, children }) => {
  return (
    <button type="submit" className="flex w-full justify-center rounded-md bg-[#006633] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
      {isLoading ? "Loading..." : children}
    </button>
  );
};

Button.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
