import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { Button } from "../ui/button";

function SheetDemo({
  sheetOpen,
  progress,
  downloadStatus,
  file,
}: {
  sheetOpen: boolean;
  progress: number;
  downloadStatus: "started" | "finished" | "failed";
  file: string
}) {
  return (
    <Sheet open={sheetOpen}>
      <SheetContent side={"top"}>
        <SheetHeader>
          <SheetTitle>Your download has started.</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="h-96 flex flex-col items-center mt-20">
          <h1 className="mt-10 text-2xl mb-10">
            {file}
          </h1>
          <Progress value={progress} className="w-full" />
          <h1 className="mt-10 text-2xl">{progress}%</h1>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SheetDemo;
