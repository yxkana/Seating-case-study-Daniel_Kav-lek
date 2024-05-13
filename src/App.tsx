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
    <div className="flex grow flex-col">
      {/* Application Topbar*/}
      <Topbar />

      {/* main body (wrapper) */}
      <main className="flex grow flex-col justify-center">
        {/* inner content */}
        <div
          className={classNames(
            "m-auto flex w-full max-w-screen-xl grow items-center justify-evenly gap-3",
            { "w-screen flex-col": isMobile },
          )}
        >
          {/* seating card */}

          <SeatingCard seats={data.seatings} event={data.event} />

          {/* event info */}
          <div
            className={classNames(
              classNames("max-w-md", { "w-screen": isMobile }),
            )}
          >
            <EventInfo event={data.event} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
