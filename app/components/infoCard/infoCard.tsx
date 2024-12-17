import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  description: string;
  dialogTitle: string;
  children: ReactNode;
  buttonText: string;
}

export const InfoCard = ({
  title,
  description,
  dialogTitle,
  children,
  buttonText,
}: InfoCardProps) => {
  return (
    <Card className="p-6 bg-white rounded-lg shadow-md">
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-medium text-gray-900 mb-2">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 mt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="w-full">
              {buttonText}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
