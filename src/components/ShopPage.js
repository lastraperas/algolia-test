import React, { useRef } from 'react';
import {
  InstantSearch,
  HierarchicalMenu,
  RefinementList,
  SortBy,
  Pagination,
  ClearRefinements,
  Highlight,
  Hits,
  HitsPerPage,
  Panel,
  SearchBox,
  Snippet,
  PoweredBy,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import {
  ClearFiltersMobile,
  PriceSlider,
  NoResults,
  ResultsNumberMobile,
  SaveFiltersMobile,
} from './Search';
import './Theme.css';
import './shop.css';
import './shop.mobile.css';
import './Search/Pagination.css';

const searchClient = algoliasearch(
  'FWT2IIX16L',
  'd1018d33c4eb92db96daddc2a5f7353d'
);

const Hit = ({ hit }) => (
  <article className="hit">
    <header className="hit-image-container">
      <img src={`${hit.imagenes[0].secureUrl}?h=245&auto=format`} alt={hit.descripcionVenta} title={hit.descripcionVenta} className="hit-image" />
    </header>

    <div className="hit-info-container">
      <h1>
        <Highlight attribute="categoria" tagName="mark" hit={hit} />
      </h1>
      <p className="hit-description">
        <Snippet attribute="descripcionVenta" tagName="mark" hit={hit} />
      </p>

      <footer>
        <p>
          <span className="hit-em">$</span>{' '}
          <strong>{hit.precioVenta}</strong>{' '}
          <span className="hit-em hit-rating">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 16 16"
            >
              <path
                fill="#e2a400"
                fillRule="evenodd"
                d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"
              />
            </svg>{' '}
            {hit.status}
          </span>
        </p>
      </footer>
    </div>
  </article>
);

const App = props => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  function openFilters() {
    document.body.classList.add('filtering');
    window.scrollTo(0, 0);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('click', onClick);
  }

  function closeFilters() {
    document.body.classList.remove('filtering');
    containerRef.current.scrollIntoView();
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('click', onClick);
  }

  function onKeyUp(event) {
    if (event.key !== 'Escape') {
      return;
    }

    closeFilters();
  }

  function onClick(event) {
    if (event.target !== headerRef.current) {
      return;
    }

    closeFilters();
  }
  const searchIndices = { name: `Pages`, title: `Pages` };
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={searchIndices.name}
    >
      <header className="header" ref={headerRef}>
        <SearchBox
          translations={{
            placeholder: 'Producto, marca, descripción...',
          }}
          submit={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 18 18"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.67"
                transform="translate(1 1)"
              >
                <circle cx="7.11" cy="7.11" r="7.11" />
                <path d="M16 16l-3.87-3.87" />
              </g>
            </svg>
          }
        />
      </header>

      <main className="container" ref={containerRef}>
        <div className="container-wrapper">
          <section className="container-filters" onKeyUp={onKeyUp}>
            <div className="container-header">
              <h2>Filtros</h2>

              <div className="clear-filters" data-layout="desktop">
                <ClearRefinements
                  translations={{
                    reset: (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                        >
                          <g fill="none" fillRule="evenodd" opacity=".4">
                            <path d="M0 0h11v11H0z" />
                            <path
                              fill="#000"
                              fillRule="nonzero"
                              d="M8.26 2.75a3.896 3.896 0 1 0 1.102 3.262l.007-.056a.49.49 0 0 1 .485-.456c.253 0 .451.206.437.457 0 0 .012-.109-.006.061a4.813 4.813 0 1 1-1.348-3.887v-.987a.458.458 0 1 1 .917.002v2.062a.459.459 0 0 1-.459.459H7.334a.458.458 0 1 1-.002-.917h.928z"
                            />
                          </g>
                        </svg>
                        Limpiar filtros
                      </>
                    ),
                  }}
                />
              </div>

              <div className="clear-filters" data-layout="mobile">
                <ResultsNumberMobile />
              </div>
            </div>

            <div className="container-body">
              <Panel header="Categorias">
                <HierarchicalMenu
                  attributes={[
                    'categoria',
                  ]}
                />
              </Panel>

              <Panel header="Tallas">
                <HierarchicalMenu
                  attributes={[
                    'talla',
                  ]}
                />
              </Panel>

              <Panel header="Marcas">
                <RefinementList
                  attribute="marca"
                  searchable={true}
                  translations={{
                    placeholder: 'Buscar por marcas…',
                  }}
                />
              </Panel>

              <Panel header="Precio">
                <PriceSlider attribute="precioVenta" />
              </Panel>

            </div>
          </section>

          <footer className="container-filters-footer" data-layout="mobile">
            <div className="container-filters-footer-button-wrapper">
              <ClearFiltersMobile containerRef={containerRef} />
            </div>

            <div className="container-filters-footer-button-wrapper">
              <SaveFiltersMobile onClick={closeFilters} />
            </div>
          </footer>
        </div>

        <section className="container-results">
          <header className="container-header container-options">
            <SortBy
              className="container-option"
              defaultRefinement="Pages"
              items={[
                {
                  label: 'Recomendados',
                  value: 'Pages',
                },
                {
                  label: 'Precio ascendente',
                  value: 'precioVenta_asc',
                },
                {
                  label: 'Precio descendente',
                  value: 'precioVenta_desc',
                },
              ]}
            />

            <HitsPerPage
              className="container-option"
              items={[
                {
                  label: '16 por página',
                  value: 16,
                },
                {
                  label: '32 por página',
                  value: 32,
                },
                {
                  label: '64 por página',
                  value: 64,
                },
              ]}
              defaultRefinement={16}
            />
          </header>

          <Hits hitComponent={Hit} />
          <NoResults />

          <footer className="container-footer">
            <Pagination
              padding={2}
              showFirst={false}
              showLast={false}
              translations={{
                previous: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                  >
                    <g
                      fill="none"
                      fillRule="evenodd"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.143"
                    >
                      <path d="M9 5H1M5 9L1 5l4-4" />
                    </g>
                  </svg>
                ),
                next: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                  >
                    <g
                      fill="none"
                      fillRule="evenodd"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.143"
                    >
                      <path d="M1 5h8M5 9l4-4-4-4" />
                    </g>
                  </svg>
                ),
              }}
            />
             <PoweredBy />
          </footer>
        </section>
      </main>

      <aside data-layout="mobile">
        <button
          className="filters-button"
          data-action="open-overlay"
          onClick={openFilters}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 14">
            <path
              d="M15 1H1l5.6 6.3v4.37L9.4 13V7.3z"
              stroke="#fff"
              strokeWidth="1.29"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filters
        </button>
      </aside>
    </InstantSearch>
  );
};

// export default withURLSync(App);
export default App;
