export declare const defaultTextInputTheme: {
    backgroundColor: string;
    textColor: string;
    sendButtonColor: string;
    fontSize: number;
};
export type TextInputTheme = Partial<typeof defaultTextInputTheme>;
export declare const defaultTextInputProps: {
    placeholder: string;
    defaultValue: string;
    disabled: boolean;
};
export type TextInputProps = Partial<typeof defaultTextInputProps> & {
    onSubmit: (value: string) => void;
} & TextInputTheme;
export declare const TextInput: (props: TextInputProps) => import("solid-js").JSX.Element;
//# sourceMappingURL=TextInput.d.ts.map