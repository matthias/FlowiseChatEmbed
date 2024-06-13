declare const chatbot: {
    initFull: (props: {
        chatflowid: string;
        apiHost?: string | undefined;
        chatflowConfig?: Record<string, unknown> | undefined;
        observersConfig?: import("./components/Bot").observersConfigType | undefined;
    } & {
        id?: string | undefined;
    }) => void;
    init: (props: {
        chatflowid: string;
        apiHost?: string | undefined;
        chatflowConfig?: Record<string, unknown> | undefined;
        observersConfig?: import("./components/Bot").observersConfigType | undefined;
    }) => void;
    initModal: (props: import(".").BotProps & import("./features/modal/types").ModalParams & {
        id?: string | undefined;
    }) => import("./window").FlowiseModalElement;
    destroy: () => void;
};
export default chatbot;
//# sourceMappingURL=web.d.ts.map