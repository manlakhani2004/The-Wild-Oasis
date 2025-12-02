// "use client";
import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
// import { Cabin } from "next/font/google";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
    const { name } = await getCabin(params.cabinId);

    return {
        title: `Cabin ${name}`
    }
}

//make this routes as static rendering 
export async function generateStaticParams() {
    const allCabin = await getCabins();
    const ids = allCabin.map((cabin) => ({ id: String(cabin.id) }));
    return ids;
}

export default async function Page({ params }) {
    // console.log("running",params.cabinId);
    // console.log(params)
    const cabin = await getCabin(params.cabinId);
    // console.log(cabin)

    // const settings = await getSettings();
    // const bookedDates = await getBookedDatesByCabinId(params.cabinId);



    return (
        <div className="max-w-6xl mx-auto mt-8">
            <Cabin cabin={cabin} />
            <div>
                <h2 className="text-5xl font-semibold text-center">
                    Reserve today. Pay on arrival.
                </h2>

            </div>
            <Suspense fallback={<Spinner />}>
                <Reservation cabin={cabin} />
            </Suspense>
        </div>
    );
}
