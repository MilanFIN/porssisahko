function ArticleSkeleton() {
    return (
        <li
            key={"loadingItem"}
            className="w-full mb-2 bg-zinc-600 rounded-lg p-2 "
        >
            <img className=" h-[100px] flex-none object-cover rounded-lg mr-2"></img>
            <div className=" grow">
                <span className="w-full font-bold"></span>
                <br />
                <span className="w-full"></span>
            </div>
        </li>
    );
}

function NewsListSkeleton() {
    return (
        <div className="h-full w-full bg-zinc-700 p-2 rounded-b-lg">
            <ul className="h-full w-full overflow-y-auto rounded-lg transparent">
                <ArticleSkeleton />
                <ArticleSkeleton />
                <ArticleSkeleton />
                <ArticleSkeleton />
            </ul>
        </div>
    );
}

export function NewsSkeleton() {
    const sources = ["Yle", "HS", "IL", "IS"];

    return (
        <div className="h-full w-full rounded-lg mt-2 transparent">
            <div className="flex w-full justify-center rounded-t-xl">
                {sources.map((source: String, index: number) => (
                    <button
                        key={source.toString()}
                        className={`rounded-t-lg grow text-lg hover:text-black text-center h-12 bg-zinc-700 text-white`}
                    >
                        <span>{source}</span>
                    </button>
                ))}
            </div>

            <div className="w-full h-full ">
                <NewsListSkeleton />
            </div>
        </div>
    );
}