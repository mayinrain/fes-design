
import { h } from 'vue';
import IconWrapper from './IconWrapper';
import type {IconProps} from './IconWrapper';
import './style';

export default (props?: IconProps) => (
    <IconWrapper {...props} >
        <svg width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M981.333 512c0 259.2-210.133 469.333-469.333 469.333S42.667 771.2 42.667 512 252.8 42.667 512 42.667 981.333 252.8 981.333 512zm-64 0a405.333 405.333 0 1 0-810.666 0 405.333 405.333 0 0 0 810.666 0zM663.595 696.832l-2.091 3.243-13.056 16.853a21.333 21.333 0 0 1-29.952 3.797L371.2 528.853a21.333 21.333 0 0 1 0-33.706l247.339-191.872a21.333 21.333 0 0 1 29.952 3.797l13.056 16.853a21.333 21.333 0 0 1-.939 27.307l-2.859 2.603L453.803 512l203.946 158.165a21.333 21.333 0 0 1 5.846 26.667z"/></svg>
    </IconWrapper>
);
