
/**
 * Convert all IMG tags with URLS to base64 data URLs
 * @param element
 */
export function convertImagesToBase64(element: HTMLElement): Promise<void> {
    const images = element.querySelectorAll("img");

    if (images.length === 0) {
        return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
        try {
            let convertedImages = 0;
            const imageConverted = () => {
                convertedImages++;

                if (convertedImages === images.length) {
                    resolve();
                }
            };

            images.forEach((img) => {
                if (img.src.startsWith("data:")) {
                    imageConverted();
                    return;
                }

                // img.crossOrigin = "anonymous";

                if (img.complete) {
                    convertToDataURL(img);
                    imageConverted();
                } else {
                    const listener = () => {
                        img.removeEventListener("load", listener);
                        convertToDataURL(img);
                        imageConverted();
                    };

                    img.addEventListener("load", listener);
                }
            });
        }
        catch (e) {
            reject(e);
        }
    });
}


function convertToDataURL(img: HTMLImageElement) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");

    if (ctx) {
        ctx.drawImage(img, 0, 0);

        try {
            // May fail cuz of CORS
            img.src = canvas.toDataURL("image/png");
        } catch (e) {
            const warning = document.createElement("pre");
            warning.style.margin = "0";
            warning.style.display = "inline-block";
            warning.innerHTML = "######################<br>## Image conversion ##<br>## to base64 failed ##<br>######################";
            img.parentNode!.replaceChild(warning, img);

            console.error(e);
        }
    }
}