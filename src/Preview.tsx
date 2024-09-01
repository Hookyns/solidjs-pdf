import {JSX, onMount} from "solid-js";
import {clsx} from "clsx";
import {Portal} from "solid-js/web";
import styles from "./Preview.module.css";
import {convertImagesToBase64} from "./utils/convertImagesToBase64";
import {getDocumentContext} from "./DocumentContext";
import {breakPages} from "./index";

type Props = {
    children: JSX.Element;
    class?: string;
}

export function Preview(props: Props) {
    let wrapDivRef: HTMLDivElement | undefined = undefined as any;
    let portaledWrapRef: HTMLDivElement | undefined = undefined as any;

    onMount(() => {
        if (portaledWrapRef !== undefined) {
            convertImagesToBase64(portaledWrapRef).catch(console.error);

            const document = portaledWrapRef.querySelector(".solidjs-pdf-document") as HTMLElement | null;

            if (document) {
                const documentContext = getDocumentContext(document);

                const pages = breakPages(documentContext().pages);
                document.innerHTML = "";
                document.append(...pages.map(page => page.pageElement));

                // createEffect(on(documentContext, () => {
                // }));
            }
        }
    });

    return <div ref={wrapDivRef} class={clsx(styles.wrap, props.class)}>
        <Portal mount={wrapDivRef} useShadow={true}>
            <div ref={portaledWrapRef}>
                <style>
                    {`
                    :host { all: initial; }
                    
                    .solidjs-pdf-page {
                        outline: 1px solid black;
                        margin-top: 10px;
                
                        &:first-child {
                            margin-top: 0;
                        }
                    }
                `}
                </style>
                {props.children}
            </div>
        </Portal>
    </div>;
}