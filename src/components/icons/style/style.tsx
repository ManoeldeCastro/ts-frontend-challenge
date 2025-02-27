import styled from 'styled-components';
import { IconProps } from '../../../types/globals';

export const Icon = styled.svg.attrs({
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
})`
  path {
    stroke: ${({ theme, color }) => color || theme.colors.defaultIconColor};
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const IconComponent: React.FC<IconProps> = ({ d, color }) => (
  <Icon color={color}>
    <path d={d} />
  </Icon>
);

export default IconComponent;