
import { h } from 'vue';
import IconWrapper from './IconWrapper';
import type {IconProps} from './IconWrapper';
import './style';

export default (props?: IconProps) => (
    <IconWrapper {...props} >
        <svg width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M906.752 96.043a21.333 21.333 0 0 1 21.333 21.333v629.29A21.333 21.333 0 0 1 906.752 768H656.213L526.805 910.379a21.333 21.333 0 0 1-30.122 1.408l-1.28-1.238L362.667 768H117.248a21.333 21.333 0 0 1-21.333-21.333V117.376a21.333 21.333 0 0 1 21.333-21.333h789.504zm-42.667 64H159.872V704h230.613L510.55 832.981 627.883 704H864V160.043zM311.893 375.765a56.021 56.021 0 1 1 0 112 56.021 56.021 0 0 1 0-112zm200.022 0a56.021 56.021 0 1 1 0 112 56.021 56.021 0 0 1 0-112zm200.192 0a56.021 56.021 0 1 1 0 112 56.021 56.021 0 0 1 0-112z"/></svg>
    </IconWrapper>
);
