/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const LevelContext = createContext()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const LevelContextProvider = (props) => {
  // array of current returned levels and respective data, used to map data to elements in the search results
  const [levelsData, setLevelsData] = useState([])
  // unused, will change to a rating system state later
  const [legacyDiff, setLegacyDiff] = useState(false)
  // filter settings menu state, default is false = closed
  const [filterOpen, setFilterOpen] = useState(false)
  // sort settings menu state, default is false = closed
  const [sortOpen, setSortOpen] = useState(false)

  // tag settings menu state, default is false = closed
  const [tagsOpen, setTagsOpen] = useState(false)
  // display settings menu state, default is false = closed
  const [displayOpen, setDisplayOpen] = useState(false)
  // change system dialogue state, default is false = closed
  const [changeSystemOpen, setChangeSystemOpen] = useState(false)
  // browse help dialogue state, default is false = closed
  const [helpOpen, setHelpOpen] = useState(false)

  // query string state
  const [query, setQuery] = useState('')

  // min and max value states for difficulty slider filter and search query
  const [minDiff, setMinDiff] = useState('1')
  const [maxDiff, setMaxDiff] = useState('21.34')

  // current tags array state for search query, unused for now
  const [tags, setTags] = useState([])
  // current display state for level display
  const [display, setDisplay] = useState([])

  // current sort state for search query
  const [sort, setSort] = useState('RECENT_DESC')
  // state indicating whether there is more level data able to be displayed
  const [hasMore, setHasMore] = useState(true)
  // from a bit of guesswork (still learning how the search query works),
  // the pageNumber state holds which group of 10 levels and their data was most recently loaded into the results,
  // i.e. each time new data is displayed, pageNumber increases. (could be wrong, don't take as fact)
  const [pageNumber, setPageNumber] = useState(0)

  // return the context provider and values
  return (
    <LevelContext.Provider
      value={{
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
        pageNumber, setPageNumber
      }}
    >
      {props.children}
    </LevelContext.Provider>
  )
}

export { LevelContext, LevelContextProvider }
