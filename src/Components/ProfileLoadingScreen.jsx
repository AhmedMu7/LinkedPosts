import { Card, Skeleton } from "@heroui/react";

export default function ProfileLoadingScreen() {
  return <>
  
        <Card className="sm:w-170 mx-auto space-y-5 p-4 " radius="lg">
            <div className="max-w-[400px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-40 h-40" />
              </div>
              <div className="w-full flex flex-col space-y-4">
                <Skeleton className="h-3 w-full rounded-lg" />
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-3/5 rounded-lg" />
              </div>
            </div>
          </Card>
        </>
}
