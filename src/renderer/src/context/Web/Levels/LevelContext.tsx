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
  // query string state
  const [query, setQuery] = useState('')

  // bandaid fix for difficulty functionality, said functionality will be replaced by DifficultyContext.tsx
  // const diffs = [
  //   '0',
  //   'P1', 'P2', 'P3', 'P4', 'P5',
  //   'P6', 'P7', 'P8', 'P9', 'P10',
  //   'P11', 'P12', 'P13', 'P14', 'P15',
  //   'P16', 'P17', 'P18', 'P19', 'P20',
  //   'G1', 'G2', 'G3', 'G4', 'G5',
  //   'G6', 'G7', 'G8', 'G9', 'G10',
  //   'G11', 'G12', 'G13', 'G14', 'G15',
  //   'G16', 'G17', 'G18', 'G19', 'G20',
  //   'U1', 'U2', 'U3', 'U4', 'U5',
  //   'U6', 'U7', 'U8', 'U9', 'U10',
  //   'U11', 'U12', 'U13', 'U14', 'U15',
  //   'U16', 'U17', 'U18', 'U19', 'U20',
  // ]

  // const [filterMinDiff, setFilterMinDiff] = useState(diffs[0])
  // const [filterMaxDiff, setFilterMaxDiff] = useState(diffs[59])
  // min and max value states for difficulty slider filter and search query, subject to change
  // const [minDiff, setMinDiff] = useState(diffs[1])
  // const [maxDiff, setMaxDiff] = useState(diffs[60])
  const [minDiff, setMinDiff] = useState('1')
  const [maxDiff, setMaxDiff] = useState('21.34')


  // current sort state for search query
  const [sort, setSort] = useState('RECENT_DESC')
  // state indicating whether there is more level data able to be displayed
  const [hasMore, setHasMore] = useState(true)
  // from a bit of guesswork (still learning how the search query works),
  // the pageNumber state holds which group of 10 levels and their data was most recently loaded into the results,
  // i.e. each time new data is displayed, pageNumber increases. (could be wrong, don't take as fact)
  const [pageNumber, setPageNumber] = useState(0)

  return (
    <LevelContext.Provider
      value={{
        levelsData, setLevelsData,
        legacyDiff, setLegacyDiff,
        filterOpen, setFilterOpen,
        sortOpen, setSortOpen,
        query, setQuery,

        // diffs,
        // filterMinDiff, setFilterMinDiff,
        // filterMaxDiff, setFilterMaxDiff,
        minDiff, setMinDiff,
        maxDiff, setMaxDiff,

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
