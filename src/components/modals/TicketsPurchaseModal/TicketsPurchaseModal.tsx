import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { LoginOptions, OrderSummary } from "./components";
import { useIsMobile } from "@/hooks";
import classNames from "classnames";

interface TicketsPurchaseModal {
  isButtonAcitve: boolean;
}

export const TicketsPurchaseModal = ({
  isButtonAcitve,
}: TicketsPurchaseModal) => {
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Dialog onOpenChange={() => setCurrentStep(0)}>
      <DialogTrigger
        disabled={isButtonAcitve}
        className="btn btn-primary btn-block"
      >
        Buy tickets
      </DialogTrigger>
      <DialogContent
        className={classNames("bg-base-300 max-w-screen-md  border-none", {
          "w-screen h-screen": isMobile,
        })}
      >
        <DialogHeader className=""></DialogHeader>
        <div
          className={classNames(
            "flex w-full ",
            { "h-[90vh]": isMobile },
            { "h-96": !isMobile }
          )}
        >
          <div className="flex-1">
            {currentStep === 0 && <OrderSummary changeStep={setCurrentStep} />}
            {currentStep === 1 && <LoginOptions />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
