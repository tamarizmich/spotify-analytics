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
  onDeskNavigate?: (section: string) => void;
}

function Notebook({ pages, onDeskNavigate }: NotebookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayPage, setDisplayPage] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [direction, setDirection] = useState<"next" | "previous">("next");

  const paperRef = useRef<HTMLDivElement>(null);
  const pageContentRef = useRef<HTMLDivElement>(null);

  // =========================================================
  // DYNAMIC PAPER HEIGHT
  // =========================================================

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

  // =========================================================
  // PAGE NAVIGATION
  // =========================================================

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

  // =========================================================
  // KEYBOARD NAVIGATION
  // =========================================================

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextPage();
      }

      if (event.key === "ArrowLeft") {
        previousPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, isTurning]);

  // =========================================================
  // DESK NAVIGATION
  // =========================================================

  const handleDeskNavigation = (section: string) => {
    if (onDeskNavigate) {
      onDeskNavigate(section);
    }
  };

  const current = pages[currentPage];
  const visible = pages[displayPage];

  return (
    <div className="notebook-wrapper">

      {/* =====================================================
          SCHOOL DESK — NAVIGATION
          ===================================================== */}

      <div
        className="school-supplies"
        aria-label="School supplies navigation"
      >

        {/* PENCIL — CHARTS */}
        <button
          className="school-supply pencil-supply"
          onClick={() => handleDeskNavigation("charts")}
          aria-label="Charts"
        >
          <span className="pencil-body">
            <span className="pencil-tip" />
          </span>

          <span className="supply-note">
            see the numbers →
          </span>
        </button>

        {/* ERASER — PERSONALITY */}
        <button
          className="school-supply eraser-supply"
          onClick={() => handleDeskNavigation("personality")}
          aria-label="Your personality"
        >
          <span className="eraser-body">
            ERASE
          </span>

          <span className="supply-note">
            what kind of listener are you?
          </span>
        </button>

        {/* RULER — INSIGHTS */}
        <button
          className="school-supply ruler-supply"
          onClick={() => handleDeskNavigation("insights")}
          aria-label="Insights"
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
            measure your taste →
          </span>
        </button>

        {/* PAPER CLIP — NOTES */}
        <button
          className="school-supply clip-supply"
          onClick={() => handleDeskNavigation("notes")}
          aria-label="Notes"
        >
          <span className="paperclip">
            ⌇
          </span>

          <span className="supply-note">
            little notes
          </span>
        </button>

      </div>

      {/* =====================================================
          NOTEBOOK
          ===================================================== */}

      <div className="notebook">

        {/* TABS */}

        <nav className="notebook-tabs">
          {pages.map((item, index) => (
            <button
              key={item.id}
              className={`notebook-tab ${
                index === currentPage ? "active" : ""
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

        {/* PAPER */}

        <div
          className="notebook-paper"
          ref={paperRef}
        >

          {/* BINDING */}

          <div className="paper-binding" />

          {/* HOLES */}

          <div className="paper-holes">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          {/* =================================================
              PAGE UNDERNEATH
              ================================================= */}

          {isTurning && (
            <div className="notebook-page page-under">
              <div className="page-content">
                {current.content}
              </div>
            </div>
          )}

          {/* =================================================
              CURRENT PAGE
              ================================================= */}

          <div
            className={`notebook-page page-front ${
              isTurning ? `turning-${direction}` : ""
            }`}
          >
            <div
              className={`page-content page-${displayPage + 1}`}
              ref={pageContentRef}
            >

              {visible.content}

              {/* =================================================
                  PAGE 01 — YEARBOOK STICKER
                  ================================================= */}

              {displayPage === 0 && (
                <div className="page-sticker yearbook-star">
                  ★
                  <span>YEARBOOK</span>
                </div>
              )}

              {/* =================================================
                  PAGE 02 — SCHOOL STORE RECEIPT
                  ================================================= */}

              {displayPage === 1 && (
                <div className="page-sticker receipt-sticker">

                  <div className="masking-tape" />

                  <div className="receipt-paper">
                    <small>YEARBOOK CAFÉ</small>

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

              {/* =================================================
                  PAGE 03 — GUIDANCE OFFICE
                  ================================================= */}

              {displayPage === 2 && (
                <div className="page-stamp guidance-stamp">
                  GUIDANCE

                  <span>
                    OFFICE
                  </span>
                </div>
              )}

              {/* =================================================
                  PAGE 04 — AWARD
                  ================================================= */}

              {displayPage === 3 && (
                <div className="page-sticker award-sticker">

                  <span>
                    ★
                  </span>

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

              {/* =================================================
                  PAGE 05 — CONTACT SHEET
                  ================================================= */}

              {displayPage === 4 && null}

            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          PAGE NAVIGATION
          ===================================================== */}

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