export declare const defaultBotMessageTheme: {
    backgroundColor: string;
    titlebarBgColor: string;
};
export type BotMessageTheme = Partial<typeof defaultBotMessageTheme>;
export declare const defaultBotMessageProps: {
    message: string;
    showAvatar: boolean;
    avatarSrc: string;
    backgroundColor: string;
    titlebarBgColor: string;
};
export type BotMessageProps = typeof defaultBotMessageProps & BotMessageTheme & {
    message: string;
    fileAnnotations?: any;
};
export declare const BotMessage: (props: BotMessageProps) => import("solid-js").JSX.Element;
//# sourceMappingURL=BotMessage.d.ts.map