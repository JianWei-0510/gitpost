import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchPage() {
  return (
    <div className='w-full p-4'>
      <form className='w-full grid grid-cols-5 grid-rows-2 md:grid-rows-1 gap-y-2 rounded-3xl border p-3'>
        <Input className='col-span-5 md:col-span-4 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-lg' />
        <Button className='col-span-5 md:col-span-1 rounded-2xl'>
          <HiMagnifyingGlass className='mr-2' />
          Search
        </Button>
      </form>
    </div>
  );
}
