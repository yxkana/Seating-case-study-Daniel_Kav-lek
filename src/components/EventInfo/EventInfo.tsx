import { eventData } from "@/hooks";
import { BackIcon, DateIcon, InfoIcon, PlaceIcon } from "../icons";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

interface EvenetInfoProps {
  event: eventData;
}

/* TODO adding transition animation between description and info components */
/* TODO adding calendar component */

export const EventInfo = ({ event }: EvenetInfoProps) => {
  const [isInfo, setIsInfo] = useState(false);

  return !isInfo ? (
    <>
      <div className="flex flex-col gap-5">
        <div className="w-auto">
          <img src={event.headerImageUrl} alt="" />
        </div>

        <div className="p-5">
          <div className="flex flex-col gap-4 text-sm">
            <h1 className="text-2xl font-bold">{event.namePub}</h1>
            <div className="flex items-center gap-2">
              <div>
                <PlaceIcon color="white" />
              </div>
              <p>{event.place}</p>
            </div>
            <div className="flex gap-2">
              <DateIcon color="white" />
              <div className="flex gap-1">
                {formatDate(event.dateFrom)}
                <p>-</p>
                {formatDate(event.dateTo)}
              </div>
            </div>
            <div className="flex gap-2">
              <InfoIcon color="white" />
              <div className="flex gap-1">
                <p
                  id="text-button"
                  onClick={() => {
                    setIsInfo(true);
                  }}
                  className="text-base underline hover:cursor-pointer"
                >
                  Show more about event
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-col gap-4 p-3">
        <div
          id="button-div"
          onClick={() => setIsInfo(false)}
          className="flex gap-2 text-lg font-bold hover:cursor-pointer"
        >
          <BackIcon className="text-white" />
          Back
        </div>
        <div className="p-3 text-center text-base/7">{event.description}</div>
      </div>
    </>
  );
};
