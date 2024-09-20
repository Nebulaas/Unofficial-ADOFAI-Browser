/*
  This is the 'Browse' page in the ADOFAI Browser application.

  This file contains the code for the main construction of the page,
  the logic that handles reading in the level data to be displayed,
  and the simpler interactive elements of the search functionality.
*/

import { ReactElement, useContext, useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { Tooltip } from 'react-tooltip'
import InfiniteScroll from 'react-infinite-scroll-component'

import axios from 'axios'
import { useLocation } from 'react-router-dom'

import { LevelContext } from '../../context/Web/Levels/LevelContext'
import { DifficultyContext } from '../../context/Web/Difficulty/DifficultyContext'
import { DiffSliderContext } from '../../context/Web/Difficulty/DiffSliderContext'

import LevelCard from '../../components/Levels/LevelCard/LevelCard'

import { useTranslation } from 'react-i18next'

import { CombinedNav, DifficultySlider, SystemIcon } from '../../components'

import './Levels.css'

const Levels = (): ReactElement => {
  const { t } = useTranslation() // translation function

  // pretty sure this just holds whether level data is actively being fetched through useEffect
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

    tagsOpen, setTagsOpen,
    displayOpen, setDisplayOpen,
    changeSystemOpen, setChangeSystemOpen,
    helpOpen, setHelpOpen,

    query, setQuery,

    minDiff, setMinDiff,
    maxDiff, setMaxDiff,

    tags, setTags,
    display, setDisplay,

    sort, setSort,
    hasMore, setHasMore,
    pageNumber, setPageNumber,
  }: any = useContext(LevelContext)

  // let {
  //   difficulties,
  //
  //   selected_system,
  //   selected_difficulty,
  //   difficulty,
  //   converted,
  //
  //   filterDifficulty,
  //   fromDifficulty,
  //   fromDifficultyOrUndefined,
  //   difficultiesFor
  // }: any = useContext(DifficultyContext)

  let {
    setMinVal, setMaxVal,
    minValRef, maxValRef,
    range
  }: any = useContext(DiffSliderContext)

  // console.log(levelsData)

  // useEffect call to interface with the TUF API, which then returns the level data to be displayed
  useEffect(() => {
    // in case the fetch needs to be cancelled, i.e. new params or an error
    let cancel

    // for (difficulty of filterDifficulty('TUFBE', minDiff)) {
    //   let convertedMinDiff = fromDifficulty('TUF', difficulty)
    //   let convertedMinIndex = fromDifficulty('INDEX', difficulty)
    //   console.log(
    //     'minDiff \n= ' +
    //       minDiff + ' (TUFBE)\n= ' +
    //       convertedMinDiff + ' (TUF)\n= ' +
    //       difficulty + ' (ADOFAIB)\n= ' +
    //       convertedMinIndex + ' (INDEX)'
    //   )
    // }
    //
    // for (difficulty of filterDifficulty('TUFBE', maxDiff)) {
    //   let convertedMaxDiff = fromDifficulty('TUF', difficulty)
    //   let convertedMaxIndex = fromDifficulty('INDEX', difficulty)
    //   console.log(
    //     'maxDiff \n= ' +
    //     maxDiff + ' (TUFBE)\n= ' +
    //     convertedMaxDiff + ' (TUF)\n= ' +
    //     difficulty + ' (ADOFAIB)\n= ' +
    //     convertedMaxIndex + ' (INDEX)'
    //   )
    // }

    // async function that reads in the data of all levels matching the search parameters from the TUF API
    const fetchLevels = async (): Promise<void> => {
      setLoading(true)
      try {
        const response = await axios.get(
          // page URL to fetch data from
          `${import.meta.env.VITE_OFFSET_LEVEL}`,
          {
            // the params added to the end of the URL which alter what data is read in
            params: { query, sort, minDiff, maxDiff, offset: pageNumber * 10 },
            // the CancelToken to use to terminate the fetch
            cancelToken: new axios.CancelToken((c) => (cancel = c))
          }
        )

        // reads in the level data as an array
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
        // console.log('levelsData = ', levelsData)
        // console.log('newLevels = ', newLevels)
        // console.log('[...newLevels] = ', [...newLevels])

        // ids of the currently displayed levels
        const existingIds = new Set(levelsData.map((level) => level.id))
        // console.log(existingIds)
        // the newest levels that aren't already displayed
        const uniqueLevels = newLevels.filter((level) => !existingIds.has(level.id))
        // console.log(uniqueLevels)
        // console.log(uniqueLevels[1].id)

        // appends the newest undisplayed levels to the level data array
        // console.log('Old levels data ', levelsData)
        setLevelsData((prev) => [...prev, ...uniqueLevels])
        // if (levelsData.length > 0) setLevelsData((prev) => [...prev, ...uniqueLevels])
        // else setLevelsData([...newLevels])
        // console.log('levelsData.length > 0 = ', levelsData.length > 0)
        // console.log('New levels data ', levelsData)

        // checks whether the full response data is longer than the used response data, and sets the bool state
        setHasMore(response.data.count > levelsData.length + newLevels.length)
      } catch (error) {
        // if fetch is cancelled due to an error, sets that there was an error
        if (!axios.isCancel(error)) setError(true)
      } finally {
        // once the fetched data is fully parsed...
        setLoading(false)
      }
    }

    // async function that reads in a single level's data from the TUF API using the level's ID property
    const fetchLevelById = async (): Promise<void> => {
      setLoading(true)
      try {
        // console.log('query.slice(1) thing ' + `${import.meta.env.VITE_INDIVIDUAL_PASSES}${query.slice(1)}`)
        const response = await axios.get(
          `${import.meta.env.VITE_INDIVIDUAL_LEVEL}${query.slice(1)}`,
          {
            cancelToken: new axios.CancelToken((c) => (cancel = c))
          }
        )
        // console.log(response)
        // console.log('response.data.id thing ' + `${import.meta.env.VITE_INDIVIDUAL_PASSES}${response.data.id}`)

        // gets the level's number of player clears
        const clears = await axios.get(
          `${import.meta.env.VITE_INDIVIDUAL_PASSES}${response.data.id}`
        )

        // the data of the fetched level
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

        setLevelsData([fullData]) // sets the level data array to the fetched level's data
        setHasMore(false) // as we are searching for a level ID, there is only one matching result and so there are no more results.
      } catch (error) {
        // if fetch is cancelled due to an error, sets that there was an error
        if (!axios.isCancel(error)) setError(true)
      } finally {
        // once the fetched data is fully parsed...
        setLoading(false)
      }
    }

    // miscellaneous query code, might change/add more later?
    // if the first text character input is a hashtag, and is followed by any number, search by #ID
    if (query[0] == '#' && query.length > 1 && !isNaN(parseInt(query.split([' '][1])[0].slice(1)))) {
      fetchLevelById()
      // console.log(levelsData, '\nFetch ID')
    } else { // otherwise, just perform a normal search
      fetchLevels()
      console.log('New levels data ', levelsData)

      // console.log(levelsData, '\nFetch Normal')
    }
    return () => cancel && cancel() // returns the fetch cancel variable and function
  }, [query, sort, minDiff, maxDiff, pageNumber, forceUpdate]) // runs the useEffect if these values are updated

  // unused, will change to a rating system change handler in future
  function toggleLegacyDiff(): void {
    setLegacyDiff(!legacyDiff)
  }

  // sets query to parsed value, resets page number & level data states
  function handleQueryChange(e): void {
    setQuery(e.target.value) // sets query to the tracked text input value
    setPageNumber(0)
    setLevelsData([])
    // console.log('Query = ' + e.target.value)
  }

  // inverses the open/close state of the filter menu
  function handleFilterOpen(): void {
    setFilterOpen(!filterOpen)
  }

  // resets the level results when the min/max diff filter is updated
  useEffect(() => {
    setPageNumber(0)
    setLevelsData([])
    setLoading(true)
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

  // inverses the open/close state of the tags menu
  function handleTagsOpen(): void {
    setTagsOpen(!tagsOpen)
  }

  // sets the active tags and resets the level results, needs work & unused for now
  function handleTags(value): void {
    setTags(value)
    setPageNumber(0)

    setLevelsData([])
    setLoading(true)
    setForceUpdate((f) => !f)
  }

  // inverses the open/close state of the display menu
  function handleDisplayOpen(): void {
    setDisplayOpen(!displayOpen)
  }

  // sets the display method, resets level results, then swaps the mapped display component.
  // TODO: get this working and create alternate display option
  function handleDisplay(value): void {
    setDisplay(value)
    setPageNumber(0)

    setLevelsData([])
    setLoading(true)
    setForceUpdate((f) => !f)
  }

  // resets all fetch parameter states to specified defaults
  function resetAll(): void {
    setPageNumber(0)
    setSort('RECENT_DESC')
    setMinVal(1)
    setMaxVal(54)
    setQuery('')
    setLevelsData([])
    setLoading(true)
    setForceUpdate((f) => !f)
  }

  // focuses the text input element when the input container is clicked
  function focusInput(): void {
    document.getElementById('input-entry')!. focus()
    console.log('Focused Input')
  }

  // function onPageLoad(): void {
  //   setPageNumber(0)
  //   setLevelsData([])
  //   setLoading(true)
  //   setForceUpdate((f) => !f)
  // }

  return (
    <>
      {/* Navigation components */}
      <CombinedNav></CombinedNav>

      {/* Page div containing the actual page's contents */}
      <div id="content">

        {/* div containing the browsing display */}
        <div id="browser">

          {/* div containing all elements relevant to the search query */}
          <div id="search">

            {/* toolbar section of the search settings,
            contains the text query as well as buttons for opening the parameter submenus */}
            <div id="toolbar">

              <div id="toolbar-input" onClick={focusInput}>
                <input
                  id="input-entry"
                  value={query}
                  type="text"
                  placeholder={t('levels.search.placeholder')}
                  onChange={handleQueryChange}
                />
              </div>

              <div
                id="toolbar-filter"
                className="toolbar-button-div"
                style={{ backgroundColor: filterOpen == true ? 'rgba(255, 255, 255, 0.5)' : '' }}
              >
                <button id="filter-toggle" className="toolbar-button" onClick={handleFilterOpen} data-tooltip-id="toolbar-filter-toggle">
                  <FontAwesomeIcon icon={'fa-solid fa-filter' as IconProp} id="filter-toggle-icon" className="toolbar-button-icon"/>
                </button>
              </div>

              <div
                id="toolbar-sort"
                className="toolbar-button-div"
                style={{backgroundColor: sortOpen == true ? 'rgba(255, 255, 255, 0.5)' : ''}}
              >
                <button id="sort-toggle" onClick={handleSortOpen} data-tooltip-id="toolbar-sort-toggle" className="toolbar-button">
                  <FontAwesomeIcon icon={'fa-solid fa-sort' as IconProp} id="sort-toggle-icon" className="toolbar-button-icon"/>
                </button>
              </div>

              <div
                id="toolbar-tags"
                className="toolbar-button-div"
                style={{backgroundColor: tagsOpen == true ? 'rgba(255, 255, 255, 0.5)' : ''}}
              >
                <button disabled id="tags-toggle" onClick={handleTagsOpen} data-tooltip-id="toolbar-tags-toggle" className="toolbar-button">
                  <FontAwesomeIcon icon={'fa-solid fa-tags' as IconProp} id="sort-tags-icon" className="toolbar-button-icon"/>
                </button>
              </div>

              <div
                id="toolbar-display"
                className="toolbar-button-div"
                style={{backgroundColor: displayOpen == true ? 'rgba(255, 255, 255, 0.5)' : ''}}
              >
                <button disabled id="display-toggle" onClick={handleDisplayOpen} data-tooltip-id="toolbar-display-toggle" className="toolbar-button">
                  <FontAwesomeIcon icon={'fa-solid fa-layer-group' as IconProp} id="sort-display-icon" className="toolbar-button-icon"/>
                </button>
              </div>

              <div
                id="toolbar-system"
                className="toolbar-button-div"
                style={{backgroundColor: changeSystemOpen == true ? 'rgba(255, 255, 255, 0.5)' : ''}}
              >
                <button disabled id="system-toggle" onClick={handleSortOpen} data-tooltip-id="toolbar-systems-button" className="toolbar-button"> {/*change to handleChangeSystem*/}
                  <SystemIcon difficulty={'U1'} size={'24px'} censored={false} rated={true} impossible={false}/>
                  {/* ^^^ Change this component when browse page and SAT done */}
                </button>
              </div>

              <div id="toolbar-reset" className="toolbar-button-div">
                <button id="reset-button" onClick={resetAll} data-tooltip-id="toolbar-reset-button" className="toolbar-button">
                  <FontAwesomeIcon icon={'fa-solid fa-rotate' as IconProp} id="reset-button-icon" className="toolbar-button-icon"/>
                </button>
              </div>

              <div
                id="toolbar-help"
                className="toolbar-button-div"
                style={{backgroundColor: helpOpen == true ? 'rgba(255, 255, 255, 0.5)' : ''}}
              >
                <button disabled id="help-button" onClick={handleSortOpen} data-tooltip-id="toolbar-help-button" className="toolbar-button"> {/*change to handleBrowseHelp*/}
                  <FontAwesomeIcon icon={'fa-solid fa-question-circle' as IconProp} id="help-button-icon" className="toolbar-button-icon"/>
                </button>
              </div>
            </div>

            <div
              id="filter-menu"
              className="search-menu"
              style={{
                height: filterOpen ? '160px' : '0', // update when more sort options are added
                opacity: filterOpen ? '1' : '0'
              }}
            >
              <div id="filter-container" className="search-menu">
                <div
                  id="filter-divider"
                  className="section-divider"
                  style={{width: filterOpen ? '100%' : '0'}}
                />

                <div id="filter-head" className="search-head">
                  <h2>{t('levels.filter.header')}</h2>
                </div>

                <div id="filter-params" className="search-params">

                  <div id="filter-params-difficulty" className="param-section">
                    <div id="filter-difficulty-header" className="param-label">
                      <h4>{t('levels.filter.params.difficulty')}</h4>
                    </div>

                    <div id="filter-difficulty-slider" className="param-thing">
                      <DifficultySlider
                        min={1}
                        max={60}
                        onChange={({min, max}: { min: number; max: number }) => {
                          // console.log(`min = ${min}, max = ${max}`)
                          // console.log('return minDiff: ' + minDiff + '\nreturn maxDiff: ' + maxDiff)
                        }}
                        system={'TUF'}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div
              id="sort-menu"
              className="search-menu"
              style={{
                height: sortOpen ? '140px' : '0', // update when more sort options are added
                opacity: sortOpen ? '1' : '0'
              }}
            >
              <div id="sort-container" className="search-container">
                <div
                  id="sort-divider"
                  className="section-divider"
                  style={{width: sortOpen ? '100%' : '0'}}
                />

                <div id="sort-head" className="search-head">
                  <h2>{t('levels.sort.header')}</h2>
                </div>

                <div id="sort-params" className="search-params">
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
                          data-tooltip-id="sort-recent-asc"
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
                          data-tooltip-id="sort-recent-dsc"
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
                          data-tooltip-id="sort-diff-asc"
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
                          data-tooltip-id="sort-diff-dsc"
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

                  <div id="sort-clears-params" className="param-section">

                    <div id="sort-clears-label" className="param-label">
                      <h4>{t('levels.sort.params.clears')}</h4>
                    </div>

                    <div id="sort-clears-group" className="param-group">
                      <div
                        id="clears-ascend-container"
                        className="param-container"
                        style={{backgroundColor: sort == 'CLEARS_ASC' ? 'rgba(255, 255, 255, 0.5)' : ''}}
                      >
                        <button
                          id="clears-ascend-button"
                          className="param-item"
                          onClick={() => handleSort('CLEARS_ASC')}
                          value="CLEARS_ASC"
                          data-tooltip-id="sort-clears-asc"
                        >
                          <FontAwesomeIcon
                            icon={'fa-solid fa-arrow-up-9-1' as IconProp}
                            id="clears-ascend-icon"
                            className="param-icon"
                          />
                        </button>
                      </div>

                      <div
                        id="clears-descend-container"
                        className="param-container"
                        style={{backgroundColor: sort == 'CLEARS_DESC' ? 'rgba(255, 255, 255, 0.5)' : ''}}
                      >
                        <button
                          id="clears-descend-button"
                          className="param-item"
                          onClick={() => handleSort('CLEARS_DESC')}
                          value="CLEARS_DESC"
                          data-tooltip-id="sort-clears-dsc"
                        >
                          <FontAwesomeIcon
                            icon={'fa-solid fa-arrow-down-9-1' as IconProp}
                            id="clears-descend-icon"
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
                          data-tooltip-id="sort-random"
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

            <div
              id="tags-menu"
              className="search-menu"
              style={{
                height: tagsOpen ? '70px' : '0', // update when more tag options are added
                opacity: tagsOpen ? '1' : '0'
              }}
            >
              <div id="tags-container" className="search-container">
                <div
                  id="tags-divider"
                  className="section-divider"
                  style={{width: tagsOpen ? '100%' : '0'}}
                />

                <div id="tags-head" className="search-head">
                  <h2>{t('levels.tags.header')}</h2>
                </div>

                <div id="tags-params" className="search-params"></div> {/* empty for now */}

              </div>
            </div>

            <div
              id="display-menu"
              className="search-menu"
              style={{
                height: displayOpen ? '70px' : '0', // update when more display options are added
                opacity: displayOpen ? '1' : '0'
              }}
            >
              <div id="display-container" className="search-container">
                <div
                  id="display-divider"
                  className="section-divider"
                  style={{width: displayOpen ? '100%' : '0'}}
                />

                <div id="display-head" className="search-head">
                  <h2>{t('levels.display.header')}</h2>
                </div>

                <div id="display-params" className="search-params"></div> {/* empty for now */}

              </div>
            </div>

          </div>

          {/* div containing all elements relevant to the search results display */}
          <div id="results">
            <div id="results-container">

              <div className="divider-container">
                <div id="results-divider" className="section-divider" style={{width: '100%'}}/>
              </div>

              {/* (almost) infinitely scrollable level results */}
              <div id="results-levels">
                <InfiniteScroll
                  style={{paddingBottom: '5rem'}}
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
                  {/* maps the parsed level data to LevelCard components to be displayed */}
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

      {/* Toolbar Tooltips */}
      <Tooltip id="toolbar-filter-toggle" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.filter.tooltip.toggle')}
      </Tooltip>
      <Tooltip id="toolbar-sort-toggle" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.toggle')}
      </Tooltip>
      <Tooltip id="toolbar-tags-toggle" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.tags.tooltip.toggle')}
      </Tooltip>
      <Tooltip id="toolbar-display-toggle" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.display.tooltip.toggle')}
      </Tooltip>
      <Tooltip id="toolbar-systems-button" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.ratingSystem.tooltip.button')}
      </Tooltip>
      <Tooltip id="toolbar-reset-button" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.reset.tooltip.button')}
      </Tooltip>
      <Tooltip id="toolbar-help-button" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.help.tooltip.button')}
      </Tooltip>

      {/* Sort Submenu Tooltips */}
      <Tooltip id="sort-recent-asc" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.params.recentAsc')}
      </Tooltip>
      <Tooltip id="sort-recent-dsc" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.params.recentDsc')}
      </Tooltip>
      <Tooltip id="sort-diff-asc" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.params.difficultyAsc')}
      </Tooltip>
      <Tooltip id="sort-diff-dsc" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.params.difficultyDsc')}
      </Tooltip>
      <Tooltip id="sort-clears-asc" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.params.clearsAsc')}
      </Tooltip>
      <Tooltip id="sort-clears-dsc" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.params.clearsDsc')}
      </Tooltip>
      <Tooltip id="sort-random" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.sort.tooltip.params.random')}
      </Tooltip>

      {/* Level Card Tooltips */}
      <Tooltip id="json-dl" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.results.cards.tooltip.export')}
      </Tooltip>
      <Tooltip id="level-ws" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.results.cards.tooltip.workshop')}
      </Tooltip>
      <Tooltip id="level-dl" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.results.cards.tooltip.download')}
      </Tooltip>
      <Tooltip id="level-none" place="bottom" style={{ zIndex: 99999 }}>
        {t('levels.results.cards.tooltip.none')}
      </Tooltip>
    </>
  )
}

export default Levels
