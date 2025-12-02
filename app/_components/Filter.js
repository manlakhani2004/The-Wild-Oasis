"use client"

import { usePathname, useSearchParams,useRouter } from "next/navigation";
// import {  } from "next/router";

export default function Filter()
{
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();
    function updateFilter(filter) {
        const newParams = new URLSearchParams(params);
        newParams.set("capcity", filter);
        // newParams.set("order", "asc");

        router.replace(`${pathname}?${newParams.toString()}`);
    }
    return (
        <div className=" border border-primary-800 flex justify-end my-2">
            <button className=" px-5 py-2 hover:bg-primary-700" onClick={() => updateFilter('all')}>
                All Cabins
            </button>
            <button className=" px-5 py-2 hover:bg-primary-700" onClick={() => updateFilter('small')}>
                1 &mdash; 3 guests
            </button>
            <button className=" px-5 py-2 hover:bg-primary-700" onClick={() => updateFilter('medium')}>
                4 &mdash; 7 guests
            </button>
            <button className=" px-5 py-2 hover:bg-primary-700" onClick={() => updateFilter('large')}>
                8 &mdash; 12 guests
            </button>
        </div>
    )
}