import { ExtractPropTypes } from 'vue';
import useCarousel from './useCarousel';

export type Placement = 'top' | 'bottom' | 'left' | 'right';
export type Direction = 'horizontal' | 'vertical' | '';

export interface CarouselInst extends ReturnType<typeof useCarousel> {
    carouselId: string;
}

export const carouselItemProps = {
    key: {
        type: String,
        default: '',
    },
} as const;

export type CarouselItemProps = Partial<
    ExtractPropTypes<typeof carouselItemProps>
>;

export interface CarouselItemStates {
    hover: boolean;
    active: boolean;
    inStage: boolean;
    animating: boolean;
}

export interface CarouselItemData extends CarouselItemProps {
    uid: number;
    states: CarouselItemStates;
    translateItem: (
        index: number,
        activeIndex: number,
        oldIndex: number | unknown,
    ) => void;
}
