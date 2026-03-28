import Image from "next/image";

export default function WorldMap() {
  return (
    <Image
      src="/dashboard/map/map.png"
      alt="Global project locations"
      width={600}
      height={400}
      className="w-full h-full object-contain"
    />
  );
}
