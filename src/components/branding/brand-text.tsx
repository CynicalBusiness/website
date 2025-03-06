export interface BrandTextProps {
    bar?: boolean;
}

export function BrandText({ bar }: BrandTextProps) {
    return (
        <span className="brand">
            <span className="font-extrabold">Cynical</span>
            {bar && <>&nbsp;|</>}&nbsp;
            <span className="text-primary">Business</span>
        </span>
    );
}
