import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { MathProblemForm } from "../forms/mathProblemForm";

export const MathProblemInfo = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Solve Math Problems</CardTitle>
        <CardDescription>
          Upload a photo of your math problem and get step-by-step solutions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Solve a Math Problem</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Math Problem</DialogTitle>
            </DialogHeader>
            <MathProblemForm />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
