import { ButtonTheme } from '../types';
type Props = ButtonTheme & {
    isBotOpened: boolean;
    toggleBot: () => void;
    buttonLabel?: string;
    showInput?: boolean;
    setButtonPosition: (position: {
        bottom: number;
        right: number;
    }) => void;
    dragAndDrop: boolean;
};
export declare const ModalButton: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=ModalButton.d.ts.map