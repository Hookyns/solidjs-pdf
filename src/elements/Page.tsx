import {ParentProps} from "solid-js";
import {PageData, PageFormat, PageOrientation} from "../types";
import {useDocument} from "../DocumentContext";

type Props = {
    format?: PageFormat;
    orientation?: PageOrientation;
    padding?: string;
}

export function Page(props: ParentProps<Props>) {
    const {documentContext: context} = useDocument();

    // NOTE: This stops Signal from working; this can break something!
    const documentContext = context();

    const format = props.format ?? documentContext.document.format;
    const orientation = props.orientation ?? documentContext.document.orientation;
    const pageData: PageData = {
        pageElement: undefined as any,
        format: format,
        orientation: orientation,
        padding: props.padding ?? documentContext.document.padding,
        size: {
            width: getPageWidth(format, orientation),
            height: getPageHeight(format, orientation)
        }
    };

    // Register page
    documentContext.pages.push(pageData);

    return <section ref={(el) => pageData.pageElement = el} class="solidjs-pdf-page" style={{
        width: pageData.size.width + "mm",
        height: pageData.size.height + "mm",
        padding: pageData.padding,
        position: "relative"
    }}>
        <style>{`
            .solidjs-pdf-page, .solidjs-pdf-page * {
                box-sizing: border-box;
            }
            
            .solidjs-pdf-page {
                font-size: ${documentContext.document.formatting.fontSize}pt;
                line-height: ${documentContext.document.formatting.lineHeight};
                font-family: ${documentContext.document.formatting.fontFamily};
                color: ${documentContext.document.formatting.color};
            }
            ${documentContext.document.formatting?.css}
            `}
        </style>

        <div style={{
            height: "100%",
            overflow: "hidden",
        }}>
            {props.children}
        </div>
    </section>;
}

function getPageWidth(format: PageFormat, orientation: PageOrientation): number {
    return orientation === "portrait" ? pageWidth[format] : pageHeight[format];
}

function getPageHeight(format: PageFormat, orientation: PageOrientation): number {
    return orientation === "portrait" ? pageHeight[format] : pageWidth[format];
}

const pageWidth = {
    A4: 210,
    A5: 148
};

const pageHeight = {
    A4: 297,
    A5: 210
};