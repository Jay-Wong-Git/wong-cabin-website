"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";
  const filterOptions = [
    { value: "all", label: "All cabins" },
    { value: "small", label: "1—3 guests" },
    { value: "medium", label: "4—7 guests" },
    { value: "large", label: "8—12 guests" },
  ];

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="border border-primary-800 flex">
      {filterOptions.map((filter) => (
        <button
          className={`px-5 py-2 hover:bg-primary-700 ${
            activeFilter === filter.value
              ? "bg-primary-700 text-primary-50"
              : ""
          }`}
          onClick={() => handleFilter(filter.value)}
          key={filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
