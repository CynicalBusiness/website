import Markdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkRemoveComments from "remark-remove-comments";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Icon } from "./icon.js";
import { TbLink } from "react-icons/tb";

const remarkPlugins: Options["remarkPlugins"] = [
    remarkGfm,
    remarkRemoveComments,
];
const rehypePlugins: Options["rehypePlugins"] = [
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
const inlineElements = ["i", "em", "strong", "b", "a", "del", "span", "code"];

export interface MarkupProps {
    children: string;
    inline?: boolean;
}

export function Markup({ children, inline }: MarkupProps) {
    // will eventually support other markdown features and/or other markup languages
    return (
        <Markdown
            remarkPlugins={remarkPlugins}
            rehypePlugins={rehypePlugins}
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
