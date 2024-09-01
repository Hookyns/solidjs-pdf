import {ParentProps} from "solid-js";

export function NoBreak(props: ParentProps) {
    return <div data-nobreak={true}>
        {props.children}
    </div>;
}