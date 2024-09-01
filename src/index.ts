import type {JSX} from "solid-js";
import {jsPDF} from "jspdf";
import {render} from 'solid-js/web';
import {renderAwaiter} from "./renderAwaiter";
import {getDocumentContext} from "./DocumentContext";
import {convertImagesToBase64} from "./utils/convertImagesToBase64";
import {PageData} from "./types";

export * from "./elements";

export async function createPDF(document: () => JSX.Element, imageQuality: number = 0.7): Promise<jsPDF> {
    const root = window.document.createElement("div");
    root.style.position = "absolute";
    root.style.overflow = "hidden";
    root.style.width = "0";
    root.style.height = "0";
    window.document.body.append(root);

    render(document, root);

    // Get document's DOM element
    const documentElement = root.firstElementChild as HTMLElement

    // Wait for full render
    await renderAwaiter(documentElement);

    const documentContext = getDocumentContext(documentElement)();
    const documentMetadata = documentContext.document;

    // Convert images to base64
    await convertImagesToBase64(documentElement);

    // generate additional pages because of overflows if needed
    const pages = breakPages(documentContext.pages);

    // Clear document and add all pages including the new ones
    documentElement.innerHTML = "";
    documentElement.append(...pages.map(page => page.pageElement));

    let pdf = new jsPDF({
        unit: "mm"
    });

    pdf.setProperties({
        title: documentMetadata.title,
    });

    let pageIndex = 0;

    for (const page of pages) {
        pdf.addPage(page.format.toLowerCase(), page.orientation);

        await new Promise<void>((resolve, reject) => {
            try {
                pdf.html(page.pageElement, {
                    autoPaging: false,
                    width: pdf.internal.pageSize.width,
                    windowWidth: page.pageElement.clientWidth + 1, // +1 to avoid rounding errors; it renders extra empty page in some cases without this fix
                    image: {
                        type: 'jpeg',
                        quality: imageQuality
                    },
                    y: 0,
                    x: 0,
                    margin: 0,
                    callback: (doc) => {
                        pdf = doc;
                        resolve();
                    }
                });
            } catch (e) {
                reject(e);
            }
        });

        pageIndex++;
    }

    // Delete first default page
    pdf.deletePage(1);

    return pdf;
}

function getNodeRect(child: ChildNode) {
    if (child.nodeType === Node.TEXT_NODE) {
        const range = document.createRange();
        range.selectNode(child);
        const rect = range.getBoundingClientRect();
        range.detach();
        return rect;
    }

    return (child as Element).getBoundingClientRect();
}

export function breakPages(pages: PageData[]) {
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const pageContentElement = page.pageElement.children[1] as HTMLElement;

        if (pageContentElement.scrollHeight > pageContentElement.clientHeight) {
            const pageRect = pageContentElement.getBoundingClientRect();

            // Find first overflowing child
            for (let j = 0; j < pageContentElement.childNodes.length; j++) {
                const child = pageContentElement.childNodes[j];
                const rect = getNodeRect(child);
                const position = rect.top - pageRect.top;

                if (position + rect.height > pageContentElement.clientHeight) {
                    console.log("overflowing child", child);

                    const newPage = page.pageElement.cloneNode(false) as HTMLElement;
                    const overflowingChildren = Array.prototype.slice.call(pageContentElement.childNodes, j);

                    // Clone style element
                    newPage.appendChild(page.pageElement.children[0].cloneNode(true));

                    // Clone content element
                    const newContentElement = newPage.appendChild(pageContentElement.cloneNode(false)) as HTMLElement;

                    // Move children
                    newContentElement.append(...overflowingChildren)

                    // Update list of pages
                    pages.splice(i + 1, 0, {
                        ...page,
                        pageElement: newPage,
                    });

                    break;
                }
            }
        }
    }

    return pages;
}