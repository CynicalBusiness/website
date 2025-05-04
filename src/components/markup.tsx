import Markdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkRemoveComments from "remark-remove-comments";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { TbLink } from "react-icons/tb";
import { useMemo } from "react";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import { Icon } from "./icon.js";
import { EmptyArray } from "~/const.js";
import { remarkCustomDirectives } from "~/utils/markup.utils.js";

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
    remarkCustomDirectives,
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
