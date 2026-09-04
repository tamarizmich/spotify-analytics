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

function Notebook({ pages }: NotebookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayPage, setDisplayPage] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [direction, setDirection] = useState<"next" | "previous">("next");

  const paperRef = useRef<HTMLDivElement>(null);
  const pageContentRef = useRef<HTMLDivElement>(null);

  // Ajusta la altura del papel al contenido real de la página
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

  // Detecta cambios de tamaño dentro de la página
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
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, isTurning]);

  const current = pages[currentPage];
  const visible = pages[displayPage];

  return (
    <div className="notebook-wrapper">
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

          {/* PAGE UNDERNEATH */}
          {isTurning && (
            <div className="notebook-page page-under">
              <div className="page-content">
                {current.content}
              </div>
            </div>
          )}

          {/* CURRENT PAGE */}
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

              {/* =========================================
                  PAGE 01 — YEARBOOK STICKER
                  ========================================= */}

              {displayPage === 0 && (
                <div className="page-sticker yearbook-star">
                  ★
                  <span>YEARBOOK</span>
                </div>
              )}

              {/* =========================================
                  PAGE 02 — RECEIPT
                  ========================================= */}

              {displayPage === 1 && (
                <div className="page-sticker receipt-sticker">
                  <div className="masking-tape" />

                  <div className="receipt-paper">
                    <small>YEARBOOK CAFÉ</small>

                    <strong>THANK YOU!</strong>

                    <span>1 × good memories</span>
                    <span>1 × questionable decisions</span>
                    <span>1 × main character moment</span>

                    <hr />

                    <b>TOTAL: 2026</b>
                  </div>
                </div>
              )}

              {/* =========================================
                  PAGE 03 — GUIDANCE OFFICE STAMP
                  ========================================= */}

              {displayPage === 2 && (
                <div className="page-stamp guidance-stamp">
                  GUIDANCE
                  <span>OFFICE</span>
                </div>
              )}

              {/* =========================================
                  PAGE 04 — AWARD
                  ========================================= */}

              {displayPage === 3 && (
                <div className="page-sticker award-sticker">
                  <span>★</span>

                  <strong>
                    CLASS
                    <br />
                    FAVORITE
                  </strong>

                  <small>2026</small>
                </div>
              )}

              {/* =========================================
                  PAGE 05 — CONTACT SHEET
                  ========================================= */}

              {displayPage === 4}
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="notebook-navigation">
        <button
          className="page-nav-button"
          onClick={previousPage}
          disabled={currentPage === 0 || isTurning}
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