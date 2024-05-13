import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { LoginOptions, OrderSummary } from "./components";

interface TicketsPurchaseModal {
  isButtonAcitve: boolean;
}

export const TicketsPurchaseModal = ({
  isButtonAcitve,
}: TicketsPurchaseModal) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Dialog onOpenChange={() => setCurrentStep(0)}>
      <DialogTrigger
        disabled={isButtonAcitve}
        className="btn btn-primary btn-block"
      >
        Buy tickets
      </DialogTrigger>
      <DialogContent className="bg-base-300 max-w-screen-md  border-none">
        <DialogHeader className="h-0"></DialogHeader>
        <div className="flex w-full h-96">
          <div className="flex-1">
            {currentStep === 0 && <OrderSummary changeStep={setCurrentStep} />}
            {currentStep === 1 && <LoginOptions changeStep={setCurrentStep} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
