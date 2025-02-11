// export const revalidate = 60 * 60 * 24 * 7;

export const dynamicParams = true;

export function generateStaticParams() {
    return []; // do not pre-generate any static paths, do it lazily
    // we might want to do it in the future though
}

export interface PostPageProps {
    params: Promise<{ post: string[] }>;
}

export default function PostPage() {
    return (
        <div>
            <h2>Post</h2>
        </div>
    );
}
