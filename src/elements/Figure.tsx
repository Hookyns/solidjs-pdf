import {ParentProps} from "solid-js";
import {NoBreak} from "./NoBreak";

/**
 * Represents a figure element.
 * Content inside a figure is not going to be broken, but it may be moved to another place in the document to achieve that.
 * @param props
 * @constructor
 */
export function Figure(props: ParentProps) {
    return <figure data-figure={true}>
        <NoBreak>
            {props.children}
        </NoBreak>
    </figure>;
}