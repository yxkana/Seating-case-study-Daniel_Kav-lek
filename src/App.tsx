import "./App.css";
import { useGetEvent, useIsMobile } from "./hooks";
import { SeatingCard } from "./components/SeatingCard";
import { EventInfo } from "./components/EventInfo";
import { Topbar } from "./components/Topbar";
import classNames from "classnames";

function App() {
  const { data } = useGetEvent();
  const isMobile = useIsMobile();

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col grow">
      {/* Application Topbar*/}
      <Topbar />

      {/* main body (wrapper) */}
      <main className="grow flex flex-col justify-center">
        {/* inner content */}
        <div
          className={classNames(
            "max-w-screen-xl m-auto flex items-center justify-evenly grow gap-3 w-full",
            { "w-screen flex-col": isMobile }
          )}
        >
          {/* seating card */}

          <SeatingCard seats={data.seatings} event={data.event} />

          {/* event info */}
          <div className={classNames(classNames("max-w-md",{"w-screen":isMobile}))}>
            <EventInfo event={data.event} />
          </div>
        </div>
      </main>

      {/*  <nav className="sticky bottom-0 left-0 right-0 bg-white border-t text-red-500 border-zinc-200 flex justify-center">
      
        <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
        
          <div className="flex flex-col">
            <span>Total for [?] tickets</span>
            <span className="text-2xl font-semibold">[?] CZK</span>
          </div>

          <Button disabled variant="default">
            Checkout now
          </Button>
        </div>
      </nav> */}
    </div>
  );
}

export default App;
