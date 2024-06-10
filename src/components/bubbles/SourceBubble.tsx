type Props = {
  pageContent: string;
  metadata: { topic?: string; source?: string };
  onSourceClick?: () => void;
};
export const SourceBubble = (props: Props) => (
  <>
    <article
      data-modal-target="defaultModal"
      data-modal-toggle="defaultModal"
      class="mb-2 animate-fade-in host-container hover:brightness-90 active:brightness-75 max-w-[12rem] bg-white bg-opacity-70 p-2 rounded-lg shadow-sm cursor-pointer"
      onClick={() => props.onSourceClick?.()}
    >
      {props.metadata.topic && <h4 class="font-medium text-sm">{props.metadata.topic}</h4>}
      {props.metadata.source && (
        <p>
          <span class="underline text-blue-800 line-clamp-3 text-ellipsis overflow-hidden text-sm">{props.metadata.source}</span>
        </p>
      )}
    </article>
  </>
);
