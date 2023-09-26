import PropTypes from 'prop-types';
import { RiseLoader } from 'react-spinners';

export const Loader = ({ small }) => {
  const largeLoader = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const smallLoader = {
    display: 'block',
    position: 'relative',
    top: '50px',
    left: 'calc(50% - 50px)',
  };

  return (
    <RiseLoader
      color='#9c19ca'
      size={small ? 50 : 100}
      cssOverride={small ? smallLoader : largeLoader}
    />
  );
};


Loader.propTypes = {
  small: PropTypes.bool,
};
