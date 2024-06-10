type Props = {
  prompt: string;
  onPromptClick?: () => void;
};
export const StarterPromptBubble = (props: Props) => (
  <>
    <div
      data-modal-target="defaultModal"
      data-modal-toggle="defaultModal"
      class="flex justify-start items-start animate-fade-in host-container hover:brightness-90 active:brightness-75"
      onClick={() => props.onPromptClick?.()}
    >
      <span class="px-4 py-2 ml-1 whitespace-pre-wrap max-w-full chatbot-prompt-bubble cursor-pointer" data-testid="host-bubble">
        {props.prompt}
      </span>
    </div>
  </>
);
