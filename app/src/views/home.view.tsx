export function HomeView() {
    return (
        <>
            <div className="text-center">
                <img
                    src="/assets/logo.svg"
                    alt="Home"
                    className="inline-block size-128"
                />
            </div>
            <div className="flex text-center justify-center">
                <h1 className="text-8xl font-extrabold">Cynical</h1>
                <h1 className="text-8xl px-4">|</h1>
                <h1 className="text-8xl font-extralight">Business</h1>
            </div>
            <br />
            <div className="text-center">
                <h2>I like to make things and write code.</h2>
                <br />
                <h3>I'm also quite good at breaking things.</h3>
                <h4>...especially when I'm not trying to.</h4>
            </div>
        </>
    );
}
