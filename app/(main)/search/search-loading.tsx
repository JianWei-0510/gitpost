import { Loader2 } from "lucide-react";

export const SearchLoading = () => {
  return (
    <div className='w-full h-full flex flex-col gap-y-6 items-center justify-center text-lg text-muted-foreground'>
      <Loader2 className='w-12 h-12 animate-spin' />
      Searching...
    </div>
  );
};
