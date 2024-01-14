import { InfoBox } from "./infobox";

export async function LineChartSkeleton() {
    return (
        <div className="text-black">
            <div className="flex flex-wrap justify-center mb-4">
                <InfoBox tax={0} description={"Hinta nyt"} price={0} loading={true} />
                <InfoBox tax={0} description={"Keskihinta 1pv"} price={0} loading={true} />
                <InfoBox tax={0} description={"Keskihinta 1vk"} price={0} loading={true} />
                <InfoBox tax={0} description={"Keskihinta 1kk"} price={0} loading={true} />
            </div>

			<div className="w-full h-48 text-center text-white">Ladataan</div>
        </div>
    );
}
