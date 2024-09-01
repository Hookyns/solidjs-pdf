import {ParentProps} from "solid-js";
import {createDocumentContextValue, DocumentContextProvider, DocumentProps} from "../DocumentContext";

export function Document(props: ParentProps<DocumentProps>) {
    const context = createDocumentContextValue(props);

    return <DocumentContextProvider value={context}>
        <article
            ref={(el) => {
                context.document.documentElement = el;
                props.ref?.(el);
            }}
            class="solidjs-pdf-document"
            data-context={context.id}
            style={{
                "box-sizing": "border-box"
            }}
        >
            {props.children}
        </article>
    </DocumentContextProvider>;
}