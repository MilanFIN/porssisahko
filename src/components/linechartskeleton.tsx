import { InfoBox } from "./infobox";

export async function LineChartSkeleton() {
    return (
        <div className="text-black">
            <div className="flex flex-wrap justify-center mb-4">
                <InfoBox
                    tax={0}
                    description={"Hinta nyt"}
                    price={0}
                    loading={true}
                />
                <InfoBox
                    tax={0}
                    description={"Keskihinta 1pv"}
                    price={0}
                    loading={true}
                />
                <InfoBox
                    tax={0}
                    description={"Keskihinta 1vk"}
                    price={0}
                    loading={true}
                />
                <InfoBox
                    tax={0}
                    description={"Keskihinta 1kk"}
                    price={0}
                    loading={true}
                />
            </div>

            <div
                className={`chart-container 
            `}
            >
                <div className="flex mb-2">
                    <button className={`rounded-xl mx-1 py-1 px-2 bg-gray-300`}>
                        alv 0%
                    </button>
                    <button className={`rounded-xl mx-1 py-1 px-2 bg-gray-300`}>
                        alv 24%
                    </button>

                    <span className="grow"></span>

                    <button className={`rounded-xl mx-1 py-1 px-2 bg-gray-300`}>
                        1pv
                    </button>
                    <button className={`rounded-xl mx-1 py-1 px-2 bg-gray-300`}>
                        1vk
                    </button>
                    <button className={`rounded-xl mx-1 py-1 px-2 bg-gray-300`}>
                        1kk
                    </button>
                    <button className={`rounded-xl mx-1 py-1 px-2 bg-gray-300`}>
                        3kk
                    </button>
                </div>
                <div className="w-full text-center text-white">Ladataan...</div>
            </div>
        </div>
    );
}
