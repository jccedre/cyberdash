import { keyframes } from 'styled-components';

const pulse = keyframes`
  0 {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
`;


const animations = {
  pulse: pulse,
}

export default animations;
