import { BotProps } from './ChatContext';
export declare function registerCustomElememt(name: string, feature: any): Flowise | undefined;
export declare function applyPropsToCustomElement(tag: string, props: BotProps & ComoponentIdentifierProps): void;
/** types */
type ComoponentIdentifierProps = {
    id: string;
};
type Flowise = Record<string, unknown>;
export {};
//# sourceMappingURL=register.d.ts.map