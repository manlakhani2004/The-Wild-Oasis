import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";


export default async function CabinList({ filter }) {
  let cabins = [];
  cabins = await getCabins();

  if(!cabins.length) return null;
  let displatedCabins;

  if (filter === "all") {
    displatedCabins = cabins;
  }
  if (filter === "small") {
    displatedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter === "medium") {
    displatedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7);
  }
  if (filter === "large") {
    displatedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }
  // console.log(displatedCabins);
  // console.log(cabins)
  return (
    <>
      {displatedCabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {displatedCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  )
}