
import { h } from 'vue';
import IconWrapper from './IconWrapper';
import type {IconProps} from './IconWrapper';
import './style';

export default (props?: IconProps) => (
    <IconWrapper {...props} >
        <svg width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M567.424 117.376a21.333 21.333 0 0 1 21.333-21.333h21.334a21.333 21.333 0 0 1 21.333 21.333v702.933l244.224-189.098a21.333 21.333 0 0 1 29.952 3.797l13.056 16.853a21.333 21.333 0 0 1-3.84 29.952L601.813 924.16a21.333 21.333 0 0 1-34.389-16.853V117.376zm-458.24 224.853L422.144 99.84a21.333 21.333 0 0 1 34.39 16.853v789.931a21.333 21.333 0 0 1-21.334 21.333h-21.333a21.333 21.333 0 0 1-21.334-21.333V203.691L148.352 392.789a21.333 21.333 0 0 1-29.952-3.797l-13.056-16.853a21.333 21.333 0 0 1 3.84-29.952z"/></svg>
    </IconWrapper>
);
