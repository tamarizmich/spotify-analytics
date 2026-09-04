import {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface NotebookPage {
  id: string;
  number: string;
  tab: string;
  content: ReactNode;
}

interface NotebookProps {
  pages: NotebookPage[];
}

type DeskTool = "annotate" | "erase" | "stats" | "notes" | null;

function Notebook({ pages }: NotebookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayPage, setDisplayPage] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [direction, setDirection] = useState<"next" | "previous">("next");

  const [activeDeskTool, setActiveDeskTool] =
    useState<DeskTool>(null);

  const paperRef = useRef<HTMLDivElement>(null);
  const pageContentRef = useRef<HTMLDivElement>(null);

  const updatePaperHeight = () => {
    if (!paperRef.current || !pageContentRef.current) return;

    const height = pageContentRef.current.scrollHeight;

    if (height > 0) {
      paperRef.current.style.height = `${height}px`;
    }
  };

  useLayoutEffect(() => {
    updatePaperHeight();

    const frame = requestAnimationFrame(() => {
      updatePaperHeight();
    });

    return () => cancelAnimationFrame(frame);
  }, [displayPage]);

  useEffect(() => {
    if (!pageContentRef.current) return;

    const observer = new ResizeObserver(() => {
      updatePaperHeight();
    });

    observer.observe(pageContentRef.current);

    return () => observer.disconnect();
  }, [displayPage]);

  const goToPage = (index: number) => {
    if (
      index === currentPage ||
      index < 0 ||
      index >= pages.length ||
      isTurning
    ) {
      return;
    }

    setDirection(index > currentPage ? "next" : "previous");
    setCurrentPage(index);
    setIsTurning(true);

    setTimeout(() => {
      setDisplayPage(index);
      setIsTurning(false);
    }, 500);
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      goToPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextPage();
      }

      if (event.key === "ArrowLeft") {
        previousPage();
      }

      if (event.key === "Escape") {
        setActiveDeskTool(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, isTurning]);

  const current = pages[currentPage];
  const visible = pages[displayPage];

  const handleDeskTool = (tool: DeskTool) => {
    setActiveDeskTool((currentTool) =>
      currentTool === tool ? null : tool
    );
  };

  return (
    <div className="notebook-wrapper">

      {/* DESK TOOLS */}
      <div
        className="school-supplies"
        aria-label="Yearbook desk tools"
      >
        <button
          className={`school-supply pencil-supply ${
            activeDeskTool === "annotate"
              ? "active"
              : ""
          }`}
          onClick={() => handleDeskTool("annotate")}
          aria-label="Annotate your yearbook"
        >
          <span className="pencil-body">
            <span className="pencil-tip" />
          </span>

          <span className="supply-note">
            annotate your yearbook
          </span>
        </button>

        <button
          className={`school-supply eraser-supply ${
            activeDeskTool === "erase"
              ? "active"
              : ""
          }`}
          onClick={() => handleDeskTool("erase")}
          aria-label="Erase"
        >
          <span className="eraser-body">
            ERASE
          </span>

          <span className="supply-note">
            erase questionable choices
          </span>
        </button>

        <button
          className={`school-supply ruler-supply ${
            activeDeskTool === "stats"
              ? "active"
              : ""
          }`}
          onClick={() => handleDeskTool("stats")}
          aria-label="Quick stats"
        >
          <span className="ruler-body">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </span>

          <span className="supply-note">
            quick stats
          </span>
        </button>

        <button
          className={`school-supply clip-supply ${
            activeDeskTool === "notes"
              ? "active"
              : ""
          }`}
          onClick={() => handleDeskTool("notes")}
          aria-label="Little notes"
        >
          <span className="paperclip">
            ⌇
          </span>

          <span className="supply-note">
            little notes
          </span>
        </button>
      </div>

      {/* NOTEBOOK */}
      <div className="notebook">

        <nav className="notebook-tabs">
          {pages.map((item, index) => (
            <button
              key={item.id}
              className={`notebook-tab ${
                index === currentPage
                  ? "active"
                  : ""
              }`}
              onClick={() => goToPage(index)}
            >
              <span className="tab-number">
                {item.number}
              </span>

              <span className="tab-label">
                {item.tab}
              </span>
            </button>
          ))}
        </nav>

        <div
          className="notebook-paper"
          ref={paperRef}
        >
          <div className="paper-binding" />

          <div className="paper-holes">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          {isTurning && (
            <div className="notebook-page page-under">
              <div className="page-content">
                {current.content}
              </div>
            </div>
          )}

          <div
            className={`notebook-page page-front ${
              isTurning
                ? `turning-${direction}`
                : ""
            }`}
          >
            <div
              className={`page-content page-${
                displayPage + 1
              }`}
              ref={pageContentRef}
            >
              {visible.content}

              {displayPage === 0 && (
                <div className="page-sticker yearbook-star">
                  ★
                  <span>YEARBOOK</span>
                </div>
              )}

              {displayPage === 1 && (
                <div className="page-sticker receipt-sticker">
                  <div className="masking-tape" />

                  <div className="receipt-paper">
                    <small>
                      YEARBOOK CAFÉ
                    </small>

                    <strong>
                      THANK YOU!
                    </strong>

                    <span>
                      1 × good memories
                    </span>

                    <span>
                      1 × questionable decisions
                    </span>

                    <span>
                      1 × main character moment
                    </span>

                    <hr />

                    <b>
                      TOTAL: 2026
                    </b>
                  </div>
                </div>
              )}

              {displayPage === 2 && (
                <div className="page-stamp guidance-stamp">
                  GUIDANCE
                  <span>
                    OFFICE
                  </span>
                </div>
              )}

              {displayPage === 3 && (
                <div className="page-sticker award-sticker">
                  <span>★</span>

                  <strong>
                    CLASS
                    <br />
                    FAVORITE
                  </strong>

                  <small>
                    2026
                  </small>
                </div>
              )}

              {displayPage === 4 && null}
            </div>
          </div>
        </div>
      </div>

      {/* DESK TOOL PANEL */}
      {activeDeskTool && (
        <div className="desk-tool-panel">
          {activeDeskTool === "annotate" && (
            <>
              <span className="desk-tool-label">
                ✏️ YEARBOOK NOTE
              </span>

              <h3>
                Leave your mark.
              </h3>

              <p>
                Your pencil is ready. We'll use this
                space for your personal yearbook notes.
              </p>
            </>
          )}

          {activeDeskTool === "erase" && (
            <>
              <span className="desk-tool-label">
                🧽 ERASER
              </span>

              <h3>
                Nothing to erase... yet.
              </h3>

              <p>
                Some questionable music choices are
                permanent.
              </p>
            </>
          )}

          {activeDeskTool === "stats" && (
            <>
              <span className="desk-tool-label">
                📏 QUICK STATS
              </span>

              <h3>
                Your yearbook at a glance.
              </h3>

              <p>
                20 artists in your current class.
              </p>

              <p>
                45% overlap with your medium-term
                listening.
              </p>

              <p>
                25% overlap with your long-term
                listening.
              </p>
            </>
          )}

          {activeDeskTool === "notes" && (
            <>
              <span className="desk-tool-label">
                📎 LITTLE NOTES
              </span>

              <h3>
                Things worth remembering.
              </h3>

              <p>
                TXT stayed at #1.
              </p>

              <p>
                LE SSERAFIM moved up 1 place.
              </p>

              <p>
                EXO dropped 4 places.
              </p>
            </>
          )}

          <button
            className="desk-tool-close"
            onClick={() => setActiveDeskTool(null)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}

      {/* PAGE NAVIGATION */}
      <div className="notebook-navigation">
        <button
          className="page-nav-button"
          onClick={previousPage}
          disabled={
            currentPage === 0 ||
            isTurning
          }
        >
          ← PREVIOUS
        </button>

        <div className="page-indicator">
          <span>
            {String(currentPage + 1).padStart(2, "0")}
          </span>

          <i>/</i>

          <span>
            {String(pages.length).padStart(2, "0")}
          </span>
        </div>

        <button
          className="page-nav-button"
          onClick={nextPage}
          disabled={
            currentPage === pages.length - 1 ||
            isTurning
          }
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}

export default Notebook;