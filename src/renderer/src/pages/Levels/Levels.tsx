import { ReactElement, useContext, useEffect, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { Tooltip } from 'react-tooltip'
import Select from 'react-select'
import InfiniteScroll from 'react-infinite-scroll-component'

import axios from 'axios'
import { LevelContext } from '../../context/Web/Levels/LevelContext'
import { DifficultyContext } from '../../context/Web/Difficulty/DifficultyContext'
import { useLocation } from 'react-router-dom'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

import LevelCard from '../../components/Levels/LevelCard/LevelCard'

import { useTranslation } from 'react-i18next'

import { CombinedNav, DifficultyDropdown, DifficultySlider, SystemIcon } from '../../components'

import './Levels.css'
// import './test.css'

const Levels = (): ReactElement => {
  const { t } = useTranslation() // translation function

  // pretty sure this just holds whether or not level data is actively being fetched through useEffect
  const [loading, setLoading] = useState(true)
  // holds whether the data fetching process has had an error
  const [error, setError] = useState(false)
  // this is a bit hacky, but this triggers the useEffect when updating the browsing options (filters, sorting, reset)
  const [forceUpdate, setForceUpdate] = useState(false)
  // genuinely doesn't seem to have any use, im leaving it here to make sure no bugs occur (just in case :3)
  const location = useLocation()

  // states, setters, etc. from LevelContext
  const {
    levelsData, setLevelsData,
    legacyDiff, setLegacyDiff,
    filterOpen, setFilterOpen,
    sortOpen, setSortOpen,
    query, setQuery,

    diffs,
    // filterMinDiff, setFilterMinDiff,
    // filterMaxDiff, setFilterMaxDiff,
    minDiff, setMinDiff,
    maxDiff, setMaxDiff,

    sort, setSort,
    hasMore, setHasMore,
    pageNumber, setPageNumber
  } = useContext(LevelContext)

  let {
    difficulties,

    selected_system,
    selected_difficulty,
    difficulty,
    converted,

    filterDifficulty,
    fromDifficulty,
    fromDifficultyOrUndefined,
    difficultiesFor
  } = useContext(DifficultyContext)

  console.log()

  // useEffect call to interface with the TUF API, which then returns the level data to be displayed (more comments inside)
  useEffect(() => {
    // in case the fetch needs to be cancelled, i.e. new params or an error
    let cancel

    // a
    const fetchLevels = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          // page URL to fetch data from
          `${import.meta.env.VITE_OFFSET_LEVEL}`,
          {
            // the params added to the end of the URL, which would return different data
            params: { query, sort, minDiff, maxDiff, offset: pageNumber * 10 }, /* minDiff, maxDiff, */
            // the CancelToken to use to terminate the fetch
            cancelToken: new axios.CancelToken((c) => (cancel = c))
          }
        )

        // a
        const newLevels = await Promise.all(
          response.data.results.map(async (l) => {
            // console.log('l.id thing ' + `${import.meta.env.VITE_INDIVIDUAL_PASSES}${l.id}`)
            // console.log(l)
            const additionalDataResponse = await axios.get(
              `${import.meta.env.VITE_INDIVIDUAL_PASSES}${l.id}` //
            )
            // returns the data in a dictionary
            return {
              id: l.id,
              team: l.team,
              diff: l.diff,
              pdnDiff: l.pdnDiff,
              pguDiff: l.pguDiff,
              creator: l.creator,
              song: l.song,
              artist: l.artist,
              dlLink: l.dlLink,
              wsLink: l.workshopLink,
              clears: additionalDataResponse.data.count
            }
          })
        )

        // ids of the currently displayed levels
        const existingIds = new Set(levelsData.map((level) => level.id))
        // console.log(existingIds)
        // the newest levels that aren't already displayed
        const uniqueLevels = newLevels.filter((level) => !existingIds.has(level.id))
        console.log(uniqueLevels)

        setLevelsData((prev) => [...prev, ...uniqueLevels])
        setHasMore(response.data.count > levelsData.length + newLevels.length)
      } catch (error) {
        if (!axios.isCancel(error)) setError(true)
      } finally {
        setLoading(false)
      }
    }

    const fetchLevelById = async () => {
      setLoading(true)
      try {
        // console.log('query.slice(1) thing ' + `${import.meta.env.VITE_INDIVIDUAL_PASSES}${query.slice(1)}`)
        const response = await axios.get(
          `${import.meta.env.VITE_INDIVIDUAL_LEVEL}${query.slice(1)}`,
          {
            cancelToken: new axios.CancelToken((c) => (cancel = c))
          }
        )
        //console.log(response)
        // console.log('response.data.id thing ' + `${import.meta.env.VITE_INDIVIDUAL_PASSES}${response.data.id}`)
        const clears = await axios.get(
          `${import.meta.env.VITE_INDIVIDUAL_PASSES}${response.data.id}`
        )

        const fullData = {
          id: response.data.id,
          team: response.data.team,
          diff: response.data.diff,
          pdnDiff: response.data.pdnDiff,
          pguDiff: response.data.pguDiff,
          creator: response.data.creator,
          song: response.data.song,
          artist: response.data.artist,
          dlLink: response.data.dlLink,
          wsLink: response.data.workshopLink,
          clears: clears.data.count
        }
        // console.log(fullData)

        setLevelsData([fullData])
        setHasMore(false)
      } catch (error) {
        if (!axios.isCancel(error)) setError(true)
      } finally {
        setLoading(false)
      }
    }

    // miscellaneous query code, might change/add more later?
    // if the first text character input is a hashtag, and is followed by any number, search by #ID
    if (query[0] == '#' && query.length > 1 && !isNaN(parseInt(query.split([' '][1])[0].slice(1)))) {
      fetchLevelById()
    } else { // otherwise, just perform a normal search
      fetchLevels()
    }
    return () => cancel && cancel()
  }, [query, sort, minDiff, maxDiff, pageNumber, forceUpdate]) // runs the useEffect if these values are updated

  // unused, will change to a rating system change handler later
  function toggleLegacyDiff(): void {
    setLegacyDiff(!legacyDiff)
  }

  // sets query to parsed value, resets page number & level data states
  function handleQueryChange(e): void {
    setQuery(e.target.value)
    setPageNumber(0)
    setLevelsData([])
  }

  // inverses the open/close state of the filter menu
  function handleFilterOpen(): void {
    setFilterOpen(!filterOpen)
  }

  // resets the level results when the min/max diff filter is updated
  useEffect(() => {
    setPageNumber(0)
    setLevelsData([])
    setLoading(true) //both of this is no
    setForceUpdate((f) => !f)
  }, [minDiff, maxDiff])

  // inverses the open/close state of the sort menu
  function handleSortOpen(): void {
    setSortOpen(!sortOpen)
  }

  // sets the sorting method and resets the level results
  function handleSort(value): void {
    setSort(value)
    setPageNumber(0)

    setLevelsData([])
    setLoading(true)
    setForceUpdate((f) => !f)
  }

  function resetAll(): void {
    setPageNumber(0)
    setSort('RECENT_DESC')
    setQuery('')
    setLevelsData([])
    setLoading(true)
    setForceUpdate((f) => !f)
  }


  function focusInput(): void {
    document.getElementById('input-entry')!.focus()
    console.log('Focused Input')
  }

  // function toggleFilters(): void {
  //   let filterMenu = document.getElementById('filter-container')!
  //   filterMenu.classList.contains('closed')
  //     ? filterMenu.classList.replace('closed', 'open')
  //     : filterMenu.classList.replace('open', 'closed')
  //
  //   console.log('Toggled Filter')
  // }
  //
  // function toggleSorts(): void {
  //   let sortMenu = document.getElementById('sort-container')!
  //   sortMenu.classList.contains('closed')
  //     ? sortMenu.classList.replace('closed', 'open')
  //     : sortMenu.classList.replace('open', 'closed')
  //
  //   console.log('Toggled Sort')
  // }
  //
  // function resetParams(): void {
  //   console.log('Reset Params')
  // }

  return (
    <>
      <CombinedNav></CombinedNav>

      {/* Main section of page */}
      <div id="content">

        <div id="browser">

          <div id="search">

            <div id="toolbar">

              <div id="toolbar-input" onClick={focusInput}>
                <input id="input-entry" value={query} type="text" placeholder={t('levels.search.placeholder')} onChange={handleQueryChange}
                />
              </div>

              <div
                id="toolbar-filter"
                className="toolbar-button-div"
                style={{backgroundColor: filterOpen == true ? 'rgba(255, 255, 255, 0.5)' : ''}}
              >
                <button id="filter-toggle" className="toolbar-button" onClick={handleFilterOpen} data-tooltip-id="filter"
                >
                  <FontAwesomeIcon icon={'fa-solid fa-filter' as IconProp} id="filter-toggle-icon" className="toolbar-button-icon"/>
                </button>
              </div>

              <div
                id="toolbar-sort"
                className="toolbar-button-div"
                style={{backgroundColor: sortOpen == true ? 'rgba(255, 255, 255, 0.5)' : ''}}
              >
                <button id="sort-toggle" onClick={handleSortOpen} data-tooltip-id="sort" className="toolbar-button">
                  <FontAwesomeIcon icon={'fa-solid fa-sort' as IconProp} id="sort-toggle-icon" className="toolbar-button-icon"/>
                </button>
              </div>

              <div
                id="toolbar-tags"
                className="toolbar-button-div"
                // style={{ backgroundColor: tagsOpen == true ? 'rgba(255, 255, 255, 0.5)' : '' }}
              >
                <button id="tags-toggle" onClick={handleSortOpen} data-tooltip-id="tags" className="toolbar-button"> {/*change to handleTagsOpen*/}
                  <FontAwesomeIcon icon={'fa-solid fa-tags' as IconProp} id="sort-tags-icon" className="toolbar-button-icon"/>
                </button>
              </div>

              <div
                id="toolbar-display"
                className="toolbar-button-div"
                // style={{ backgroundColor: displayOpen == true ? 'rgba(255, 255, 255, 0.5)' : '' }}
              >
                <button id="display-toggle" onClick={handleSortOpen} data-tooltip-id="display" className="toolbar-button"> {/*change to handleTagsOpen*/}
                  <FontAwesomeIcon icon={'fa-solid fa-layer-group' as IconProp} id="sort-display-icon" className="toolbar-button-icon"/>
                </button>
              </div>

              <div
                id="toolbar-system"
                className="toolbar-button-div"
                // style={{ backgroundColor: changeSystemOpen == true ? 'rgba(255, 255, 255, 0.5)' : '' }}
              >
                <button id="system-toggle" onClick={handleSortOpen} data-tooltip-id="system" className="toolbar-button"> {/*change to handleChangeSystem*/}
                  <SystemIcon difficulty={'U1'} size={'24px'} censored={false} rated={true} impossible={false}/>
                  {/* ^^^ Change this component when browse page and SAT done */}
                </button>
              </div>

              <div id="toolbar-reset" className="toolbar-button-div">
                <button id="reset-button" onClick={resetAll} data-tooltip-id="reset" className="toolbar-button">
                  <FontAwesomeIcon icon={'fa-solid fa-rotate' as IconProp} id="reset-button-icon" className="toolbar-button-icon"/>
                </button>
              </div>

              <div
                id="toolbar-help"
                className="toolbar-button-div"
                // style={{ backgroundColor: helpOpen == true ? 'rgba(255, 255, 255, 0.5)' : '' }}
              >
                <button id="help-button" onClick={resetAll} data-tooltip-id="help" className="toolbar-button">
                  <FontAwesomeIcon icon={'fa-solid fa-question-circle' as IconProp} id="help-button-icon" className="toolbar-button-icon"/>
                </button>
              </div>
            </div>

            <div
              id="filter-menu"
              style={{
                height: filterOpen ? '140px' : '0', // update when more sort options are added
                opacity: filterOpen ? '1' : '0'
              }}
            >
              <div id="filter-container">
                <div
                  id="filter-divider"
                  className="section-divider"
                  style={{width: filterOpen ? '100%' : '0'}}
                />

                <div id="filter-head">
                  <h2>{t('levels.filter.header')}</h2>
                </div>

                <div id="filter-params">

                  <div id="filter-params-difficulty" className="param-section">
                    <div id="filter-difficulty-header" className="param-label">
                      <h4>{t('levels.filter.params.difficulty')}</h4>
                    </div>

                    <div id="filter-difficulty-slider" className="param-thing">
                      <DifficultySlider
                        min={1}
                        max={60}
                        // minDiff={filterMinDiff}
                        // maxDiff={filterMaxDiff}
                        onChange={({ min, max }: { min: number; max: number }) => {
                          // console.log(`min = ${min}, max = ${max}`)
                          // console.log('return filterMinDiff: ' + filterMinDiff + '\nreturn filterMaxDiff: ' + filterMaxDiff)
                        }}
                        system={'TUF'}
                      />
                    </div>

                    {/*<div id="filter-difficulty-selector" className="param-thing">*/}
                    {/*  <Select*/}
                    {/*    defaultValue={selectedFilterDiff}*/}
                    {/*    onChange={setSelectedFilterDiff}*/}
                    {/*    options={options}*/}
                    {/*    menuPortalTarget={document.body}*/}
                    {/*    styles={{*/}
                    {/*      menuPortal: (base) => ({...base, zIndex: 9999}),*/}
                    {/*      container: (provided) => ({*/}
                    {/*        ...provided,*/}
                    {/*        zIndex: 9999*/}
                    {/*      }),*/}
                    {/*      control: (provided, state) => ({*/}
                    {/*        ...provided,*/}
                    {/*        width: '10rem',*/}
                    {/*        backgroundColor: 'rgba(255, 255, 255, 0.3)',*/}
                    {/*        border: 'none',*/}
                    {/*        outline: 'none',*/}
                    {/*        boxShadow: state.isFocused ? '0 0 0 2px #000000' : provided.boxShadow,*/}
                    {/*        '&:hover': {*/}
                    {/*          boxShadow: 'none'*/}
                    {/*        },*/}
                    {/*        singleValue: {*/}
                    {/*          ...provided.singleValue,*/}
                    {/*          color: '#FFFFFF !important'*/}
                    {/*        },*/}
                    {/*        indicatorSeparator: {*/}
                    {/*          ...provided.indicatorSeparator,*/}
                    {/*          backgroundColor: '#000000'*/}
                    {/*        }*/}
                    {/*      }),*/}
                    {/*      menu: (provided) => ({*/}
                    {/*        ...provided,*/}
                    {/*        width: '10rem',*/}
                    {/*        backgroundColor: 'rgb(255, 255, 255)',*/}
                    {/*        border: 'none',*/}
                    {/*        boxShadow: 'none',*/}
                    {/*        color: '#000000',*/}
                    {/*        zIndex: 9999*/}
                    {/*      }),*/}
                    {/*      option: (provided, state) => ({*/}
                    {/*        ...provided,*/}
                    {/*        backgroundColor: state.isSelected ? '#cccccc' : 'transparent',*/}
                    {/*        zIndex: 9999*/}
                    {/*      })*/}
                    {/*    }}*/}
                    {/*    placeholder="Difficulty:"*/}
                    {/*    isSearchable*/}
                    {/*    isClearable*/}
                    {/*  />*/}
                    {/*</div>*/}
                  </div>

                </div>
              </div>
            </div>

            <div
              id="sort-menu"
              style={{
                height: sortOpen ? '140px' : '0', // update when more sort options are added
                opacity: sortOpen ? '1' : '0'
              }}
            >
              <div id="sort-container">

                <div
                  id="sort-divider"
                  className="section-divider"
                  style={{width: sortOpen ? '100%' : '0'}}
                />

                <div id="sort-head">
                  <h2>{t('levels.sort.header')}</h2>
                </div>

                <div id="sort-params">
                  <div id="sort-params-recent" className="param-section">

                    <div id="sort-recent-label" className="param-label">
                      <h4>{t('levels.sort.params.recent')}</h4>
                    </div>

                    <div id="sort-recent-group" className="param-group">
                      <div
                        id="recent-ascend-container"
                        className="param-container"
                        style={{backgroundColor: sort == 'RECENT_ASC' ? 'rgba(255, 255, 255, 0.5)' : ''}}
                      >
                        <button
                          id="recent-ascend-button"
                          className="param-item"
                          onClick={() => handleSort('RECENT_ASC')}
                          value="RECENT_ASC"
                          data-tooltip-id="ra"
                        >
                          <FontAwesomeIcon
                            icon={'fa-solid fa-arrow-up-short-wide' as IconProp}
                            id="recent-ascend-icon"
                            className="param-icon"
                          />
                        </button>
                      </div>

                      <div
                        id="recent-descend-container"
                        className="param-container"
                        style={{backgroundColor: sort == 'RECENT_DESC' ? 'rgba(255, 255, 255, 0.5)' : ''}}
                      >
                        <button
                          id="recent-descend-button"
                          className="param-item"
                          onClick={() => handleSort('RECENT_DESC')}
                          value="RECENT_DESC"
                          data-tooltip-id="rd"
                        >
                          <FontAwesomeIcon
                            icon={'fa-solid fa-arrow-down-wide-short' as IconProp}
                            id="recent-descend-icon"
                            className="param-icon"
                          />
                        </button>
                      </div>
                    </div>
                  </div>


                  <div id="sort-diff-params" className="param-section">
                    <div id="sort-diff-label" className="param-label">
                      <h4>{t('levels.sort.params.difficulty')}</h4>
                    </div>

                    <div id="sort-diff-group" className="param-group">
                      <div
                        id="diff-ascend-container"
                        className="param-container"
                        style={{backgroundColor: sort == 'DIFF_ASC' ? 'rgba(255, 255, 255, 0.5)' : ''}}
                      >
                        <button
                          id="diff-ascend-button"
                          className="param-item"
                          onClick={() => handleSort('DIFF_ASC')}
                          value="DIFF_ASC"
                          data-tooltip-id="da"
                        >
                          <FontAwesomeIcon
                            icon={'fa-solid fa-arrow-up-9-1' as IconProp}
                            id="diff-ascend-icon"
                            className="param-icon"
                          />
                        </button>
                      </div>

                      <div
                        id="diff-descend-container"
                        className="param-container"
                        style={{backgroundColor: sort == 'DIFF_DESC' ? 'rgba(255, 255, 255, 0.5)' : ''}}
                      >
                        <button
                          id="diff-descend-button"
                          className="param-item"
                          onClick={() => handleSort('DIFF_DESC')}
                          value="DIFF_DESC"
                          data-tooltip-id="dd"
                        >
                          <FontAwesomeIcon
                            icon={'fa-solid fa-arrow-down-9-1' as IconProp}
                            id="diff-descend-icon"
                            className="param-icon"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div id="sort-random-params" className="param-section">

                    <div id="sort-random-label" className="param-label">
                      <h4>{t('levels.sort.params.random')}</h4>
                    </div>

                    <div id="sort-random-group" className="param-group">
                      <div
                        id="random-container"
                        className="param-container"
                        style={{backgroundColor: sort == 'RANDOM' ? 'rgba(255, 255, 255, 0.5)' : ''}}
                      >
                        <button
                          id="random-button"
                          className="param-item"
                          onClick={() => handleSort('RANDOM')}
                          value="RANDOM"
                          data-tooltip-id="rnd"
                        >
                          <FontAwesomeIcon
                            icon={'fa-solid fa-shuffle' as IconProp}
                            id="random-icon"
                            className="param-icon"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          <div id="results">
            <div id="results-container">

              <div className="divider-container">
                <div id="results-divider" className="section-divider" style={{ width: '100%' }}/>
              </div>

              <div id="results-levels">
                <InfiniteScroll
                  style={{ paddingBottom: '5rem' }}
                  dataLength={levelsData.length}
                  next={() => setPageNumber((prevPageNumber) => prevPageNumber + 1)}
                  hasMore={hasMore}
                  loader={<h1>{t('levels.results.display.loading')}</h1>}
                  endMessage={
                    <p style={{textAlign: 'center'}}>
                      <b>{t('levels.results.display.end')}</b>
                    </p>
                  }
                >
                  {levelsData.map((l, index) => (
                    <LevelCard
                      key={index}
                      creator={l.creator}
                      pdnDiff={l.pdnDiff}
                      pguDiff={legacyDiff ? l.diff : l.pguDiff}
                      id={l.id}
                      artist={l.artist}
                      song={l.song}
                      clears={l.clears}
                      dl={l.dlLink}
                      ws={l.wsLink}
                      team={l.team}
                      legacy={legacyDiff}
                    />
                  ))}
                </InfiniteScroll>
              </div>

            </div>
          </div>

        </div>

      </div>

      <Tooltip id="filter" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.filter.tooltip.toggle')}
      </Tooltip>
      <Tooltip id="sort" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.toggle')}
      </Tooltip>
      <Tooltip id="tags" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.tags.tooltip.toggle')}
      </Tooltip>
      <Tooltip id="display" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.display.tooltip.toggle')}
      </Tooltip>
      <Tooltip id="system" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.ratingSystem.tooltip.button')}
      </Tooltip>
      <Tooltip id="reset" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.reset.tooltip.button')}
      </Tooltip>
      <Tooltip id="help" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.help.tooltip.button')}
      </Tooltip>

      <Tooltip id="ra" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.params.recentAsc')}
      </Tooltip>
      <Tooltip id="rd" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.params.recentDsc')}
      </Tooltip>
      <Tooltip id="da" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.params.difficultyAsc')}
      </Tooltip>
      <Tooltip id="dd" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.params.difficultyDsc')}
      </Tooltip>
      <Tooltip id="rnd" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.params.random')}
      </Tooltip>

    </>
  )
}

export default Levels
