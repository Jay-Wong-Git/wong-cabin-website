import { Suspense } from "react";

import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin } from "@/app/_lib/data-service";

// export async function generateMetadata({ params }) {
//   const { name } = await getCabin(params.cabinId);
//   return { title: `Cabin ${name}` };
// }

// export async function generateStaticParams() {
//   const cabins = await getCabins();
//   return cabins.map((cabin) => ({
//     cabinId: String(cabin.id),
//   }));
// }

export const metadata = {
  title: "Detail",
};

export default async function Page({ params }) {
  const cabin = await await getCabin(params.cabinId);
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense
          fallback={
            <div className="grid items-center justify-center">
              <Spinner />
              <div className="text-xl text-primary-200">Loading...</div>
            </div>
          }
        >
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
