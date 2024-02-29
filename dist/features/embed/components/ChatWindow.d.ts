export declare const defaultChatWindowTheme: {
    backgroundColor: string;
    titlebarBgColor: string;
    titlebarTextColor: string;
    fontSize: string;
};
export type ChatWindowTheme = Partial<typeof defaultChatWindowTheme>;
export declare const defaultChatWindowProps: {
    showTitle: boolean;
    title: string;
    titleAvatarSrc: string;
    backgroundColor: string;
    titlebarBgColor: string;
    titlebarTextColor: string;
    fontSize: string;
};
export type ChatWindowProps = typeof defaultChatWindowProps & {
    onSubmit: (value: string) => void;
} & ChatWindowTheme;
export declare function ChatWindow(): import("solid-js").JSX.Element;
//# sourceMappingURL=ChatWindow.d.ts.map