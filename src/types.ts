export type PageFormat = "A4" | "A5";
export type PageOrientation = "portrait" | "landscape";

export type DocumentData = {
    documentElement: HTMLElement;

    title: string;
    orientation: PageOrientation;
    format: PageFormat;
    formatting: DocumentFormatting;
    padding: string;
};

export type DocumentFormatting = {
    /**
     * Font size in "pt" unit.
     */
    fontSize?: number;

    /**
     * Custom CSS. It is going to be rendered into a <style> tag inside the document's shadow DOM.
     */
    css?: string;

    lineHeight?: number;
    color?: string;
    fontFamily?: string;
}

export type PageData = {
    pageElement: HTMLElement;

    orientation: PageOrientation;
    format: PageFormat;
    padding: string;

    /**
     * Size of page in millimeters
     */
    size: {
        width: number,
        height: number
    };
}