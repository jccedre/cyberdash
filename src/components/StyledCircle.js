import styled from 'styled-components';

const StyledCircle = styled.circle`
  stroke-width: 3;
  opacity: 0.9;
  animation: ${props => props.theme.animations.pulse} 2s ease-in-out infinite;
  transition: all 0.3s;

  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

export default StyledCircle;
