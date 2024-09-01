import {Accessor, Setter, createContext, createSignal, ParentProps, useContext} from "solid-js";
import {DocumentData, DocumentFormatting, PageData, PageFormat, PageOrientation} from "./types";

export type DocumentContext = {
    readonly id: number;
    readonly document: DocumentData;
    readonly pages: PageData[];
};

export type DocumentContextValue = {
    documentContext: Accessor<DocumentContext>;
};

type DocumentContextValueInternal = DocumentContextValue & {
    setDocumentContext: Setter<DocumentContext>;
}

// Store of contexts per Document instance
const store = new Map<number, Accessor<DocumentContext>>();

export function getDocumentContext(document: HTMLElement): Accessor<DocumentContext> {
    const id = Number(document.dataset.context || -1);
    return store.get(id) as any;
}

// Context
const Context = createContext<DocumentContextValueInternal>(undefined as any);

export function useDocument() {
    return useContext(Context) as DocumentContextValue;
}

export type DocumentProps = {
    ref?: (element: HTMLElement) => void;
    title?: string;
    format?: PageFormat;
    orientation?: PageOrientation;
    padding?: string;
    formatting?: DocumentFormatting;
}

export function DocumentContextProvider(props: ParentProps<{ value: DocumentContext }>) {
    const [ contextValue, setContextValue] = createSignal(props.value);
    store.set(contextValue().id, contextValue);

    return <Context.Provider value={{
        documentContext: contextValue,
        setDocumentContext: setContextValue
    }}>
        {props.children}
    </Context.Provider>
}

let id = 0;

export function createDocumentContextValue(documentProps: DocumentProps): DocumentContext {
    return {
        id: ++id,
        document: {
            documentElement: undefined as any,
            title: documentProps.title ?? "Untitled",
            orientation: documentProps.orientation ?? "portrait",
            format: documentProps.format ?? "A4",
            padding: documentProps.padding ?? "10mm",
            formatting: {
                fontSize: documentProps.formatting?.fontSize ?? 12,
                lineHeight: documentProps.formatting?.lineHeight ?? 1.5,
                color: documentProps.formatting?.color ?? "black",
                fontFamily: documentProps.formatting?.fontFamily ?? "Arial"
            }
        } satisfies DocumentData,
        pages: []
    };
}