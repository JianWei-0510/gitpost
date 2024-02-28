"use client";

import Link from "next/link";
import { useState } from "react";

import { selectRepo } from "@/actions/selectRepo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={disabled || pending} type='submit'>
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Submitting
        </>
      ) : (
        "Select"
      )}
    </Button>
  );
};

export const RepoList = ({ repos }: { repos: any }) => {
  const [repoName, setRepoName] = useState("");

  return (
    <form className='w-full h-2/3' action={selectRepo}>
      <ScrollArea className='w-full h-2/3'>
        <RadioGroup className='gap-6' onValueChange={setRepoName}>
          {repos.map((repo: any) => (
            <div
              key={repo.id}
              className='flex items-center justify-center space-x-4 space-y-4'>
              <Card className='flex items-center w-2/3 max-w-md h-28'>
                <div className='w-12 h-full mx-2 flex items-center justify-center'>
                  <RadioGroupItem value={repo.name} id={repo.id} />
                </div>
                <div className='w-full'>
                  <CardHeader className='pl-0'>
                    <Label htmlFor={repo.id}>
                      <CardTitle className='text-xl mb-2'>
                        {repo.name}
                      </CardTitle>
                      <CardDescription className='line-clamp-2'>
                        {repo.description || "no descriptiion"}
                      </CardDescription>
                    </Label>
                  </CardHeader>
                </div>
              </Card>
            </div>
          ))}
        </RadioGroup>
      </ScrollArea>
      <div className='my-16 flex items-center justify-around'>
        <Button variant='ghost' asChild>
          <Link href='/'>Cancel</Link>
        </Button>
        <SubmitButton disabled={repoName === ""} />
      </div>
      <input name='repoName' value={repoName} readOnly className='hidden' />
    </form>
  );
};
