import Markdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkRemoveComments from "remark-remove-comments";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { TbLink } from "react-icons/tb";
import { useMemo } from "react";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import type { Root, Text } from "mdast";
import { visit } from "unist-util-visit";
import { h } from "hastscript";
import classNames from "classnames";
import { Icon } from "./icon.js";
import { EmptyArray } from "~/const.js";

const inlineElements = ["i", "em", "strong", "b", "a", "del", "span", "code"];

export type RemarkPluginList = Exclude<
    Options["remarkPlugins"],
    null | undefined
>;
export type RehypePluginList = Exclude<
    Options["rehypePlugins"],
    null | undefined
>;

const baseRemarkPlugins: RemarkPluginList = [
    remarkGfm,
    remarkRemoveComments,
    remarkDirective,
    remarkDirectiveRehype,
    () => (tree: Root) => {
        visit(tree, (node) => {
            if (
                node.type === "containerDirective" ||
                node.type === "leafDirective" ||
                node.type === "textDirective"
            ) {
                const data = node.data || (node.data = {});
                const hast = h(node.name, node.attributes || {});

                switch (node.name) {
                    case "img":
                        data.hName = hast.tagName;
                        data.hProperties = {
                            src: (node.children[0] as Text)?.value,
                            ...hast.properties,
                            class: classNames(
                                node.type === "textDirective"
                                    ? "inline"
                                    : "inline-block",
                                hast.properties?.className,
                            ),
                        };
                        data.hChildren = [];
                        break;
                    case "center":
                        data.hName = "div";
                        data.hProperties = {
                            class: "mx-auto text-center",
                        };
                        break;
                    case "hint":
                        data.hName = "span";
                        data.hProperties = {
                            class: "hint",
                        };
                        break;
                    case "br":
                        data.hName = "br";
                        break;
                }
            }
        });
    },
];
const baseRehypePlugins: RehypePluginList = [
    rehypeSlug,
    [
        rehypeAutolinkHeadings,
        {
            behavior: "append",
            test: ["h1", "h2", "h3"],
            properties: {
                className: "chip header-link",
                tabIndex: -1,
                ariaHidden: true,
                title: "Header Link",
            },
        },
    ],
];

export interface MarkupProps {
    children: string;
    inline?: boolean;
    remarkPlugins?: RemarkPluginList;
    rehypePlugins?: RehypePluginList;
}

export function Markup({
    children,
    inline,
    rehypePlugins = EmptyArray,
    remarkPlugins = EmptyArray,
}: MarkupProps) {
    const remark = useMemo(
        (): RemarkPluginList => [...baseRemarkPlugins, ...remarkPlugins],
        [remarkPlugins],
    );
    const rehype = useMemo(
        (): RehypePluginList => [...baseRehypePlugins, ...rehypePlugins],
        [rehypePlugins],
    );

    // will eventually support other markdown features and/or other markup languages
    return (
        <Markdown
            remarkPlugins={remark}
            rehypePlugins={rehype}
            allowedElements={inline ? inlineElements : undefined}
            unwrapDisallowed
            components={{
                span(props) {
                    const { className, ...rest } = props;
                    if (className === "icon icon-link") {
                        // catch the header links
                        return (
                            <Icon
                                Type={TbLink}
                                {...rest}
                            />
                        );
                    }
                    return <span {...props} />;
                },
            }}
        >
            {children}
        </Markdown>
    );
}
