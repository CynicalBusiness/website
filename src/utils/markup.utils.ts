import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import { h } from "hastscript";
import classNames from "classnames";

export function remarkCustomDirectives() {
    return (tree: Root) => {
        visit(tree, (node) => {
            if (
                !(
                    node.type === "containerDirective" ||
                    node.type === "leafDirective" ||
                    node.type === "textDirective"
                )
            ) {
                return;
            }

            const data = (node.data ??= {});

            if (node.name === "hint") {
                const tagName = node.type === "textDirective" ? "span" : "div";

                data.hName = tagName;
                data.hProperties = {
                    class: "hint",
                };
            } else if (node.name === "center") {
                if (node.type !== "textDirective") {
                    data.hName = "div";
                    data.hProperties = {
                        class: "mx-auto text-center",
                    };
                }
            } else if (node.name === "img") {
                const src = node.children.find((n) => n.type === "text")?.value;
                const element = h(node.name, node.attributes || {});

                data.hName = "img";
                data.hProperties = {
                    src,
                    title: src,
                    ...element.properties,
                    class: classNames(
                        node.type === "textDirective"
                            ? "inline"
                            : "inline-block",
                        element.properties?.className,
                    ),
                };
                data.hChildren = [];
            } else if (node.name === "figure") {
                if (node.type === "containerDirective") {
                    data.hName = "figure";
                    const firstNode = node.children.shift();
                    if (firstNode?.type === "paragraph") {
                        node.children.push({
                            type: "leafDirective",
                            name: "figcaption",
                            children: firstNode.children,
                        });
                    }
                }
            } else if (node.name === "figcaption") {
                data.hName = "figcaption";
            } else if (node.name === "float") {
                if (node.type !== "textDirective") {
                    data.hName = "div";
                    data.hProperties = {
                        class: "mx-4 my-2",
                        style: `float: ${node.attributes?.align ?? "right"};`,
                    };
                }
            }
        });
    };
}
