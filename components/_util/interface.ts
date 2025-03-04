import type {
    ObjectDirective,
    SetupContext,
    Ref,
    DefineComponent,
    App,
    Plugin,
} from 'vue';

export type Emit = SetupContext['emit'];

export type BooleanRef = Ref<boolean>;

export type FObjectDirective = ObjectDirective & {
    name: string;
};

export type VModelEvent = 'update:modelValue';
export type ChangeEvent = 'change';
export type CLOSE_EVENT = 'close';
export type LOAD_EVENT = 'close';

export type UpdateCurrentValue = (val: any) => void;
export type FormValidate = (eventName: string) => void;

export type ComponentInstall = DefineComponent & {
    install: (app: App) => void;
} & {
    [key: string]: DefineComponent;
};

export type GetContainer = () => HTMLElement;

export type SFCWithInstall<T> = T & Plugin;

export interface Option {
    value: string | number | boolean;
    label: string | number;
    disabled?: boolean;
}
