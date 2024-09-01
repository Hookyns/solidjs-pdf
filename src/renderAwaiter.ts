
/**
 * Waits until there is no change in DOM for at least 10 ms.
 * @param element
 */
export function renderAwaiter(element: HTMLElement) {
    let resolver: () => void = undefined as any;
    let timeout: ReturnType<typeof setTimeout>;

    const promise = new Promise<void>(resolve => {
        resolver = resolve;
    });

    function stop() {
        if (timeout) {
            clearTimeout(timeout);
        }
    }

    function reset() {
        stop();

        console.log("Reseting awaiter...");
        timeout = setTimeout(() => {
            resolver();
        }, 10);
    }

    const mutationObserver = new MutationObserver((mutations, observer) => {
        console.log("change", mutations);
        reset();
    });
    mutationObserver.observe(element, {childList: true, subtree: true});

    // Initial timeout
    reset();

    return promise;
}