import { ChangeEvent, FC, useCallback, useEffect, useState, useRef, useContext } from 'react'
import classnames from 'classnames'

import { LevelContext } from '../../../context/Web/Levels/LevelContext'
import { DifficultyContext } from '../../../context/Web/Difficulty/DifficultyContext'

import './DifficultySlider.css'
import { DifficultyIcon } from '../../index'

// props interface for the difficulty slider component
interface DifficultySliderProps {
  min: number // lowest value for the slider
  max: number // highest value for the slider
  // minDiff: string
  // maxDiff: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function // function ran when either minVal or maxVal states are updated (see states below)
  system: string // active rating system
}

/*

*/
const DifficultySlider: FC<DifficultySliderProps> = ({ min, max, onChange, system }) => {
  // state holding the current value of the left slider thumb, default passed in Levels.tsx
  const [minVal, setMinVal] = useState(min)
  // state holding the current value of the right slider thumb, default passed in Levels.tsx
  const [maxVal, setMaxVal] = useState(max)
  // react ref for minVal state
  const minValRef = useRef<HTMLInputElement>(null)
  // react ref for maxVal state
  const maxValRef = useRef<HTMLInputElement>(null)
  // react ref of the difference between minVal and maxVal
  const range = useRef<HTMLDivElement>(null)

  const {
    // levelsData, setLevelsData,
    // legacyDiff, setLegacyDiff,
    // filterOpen, setFilterOpen,
    // sortOpen, setSortOpen,
    query, setQuery,

    // diffs,
    // filterMinDiff, setFilterMinDiff,
    // filterMaxDiff, setFilterMaxDiff,
    minDiff, setMinDiff,
    maxDiff, setMaxDiff,

    sort, setSort
    // hasMore, setHasMore,
    // pageNumber, setPageNumber,
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

  const [ratingSystem, setRatingSystem] = useState(system) // use later

  const changeMinDiffIconRef = useRef(null)
  const changeMaxDiffIconRef = useRef(null)

  function changeMinDiffIcon(newMinDiff): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    changeMinDiffIconRef.current.changeMinDiff(newMinDiff)
  }
  function changeMaxDiffIcon(newMaxDiff): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    changeMaxDiffIconRef.current.changeMaxDiff(newMaxDiff)
  }

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal)
      const maxPercent = getPercent(+maxValRef.current.value) // Precede with '+' to convert the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`
        range.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [minVal, getPercent])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value)
      const maxPercent = getPercent(maxVal)

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [maxVal, getPercent])

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal })
  }, [minVal, maxVal, onChange])

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(+event.target.value, maxVal)
          setMinVal(value)
          event.target.value = value.toString()

          selected_system = 'INDEX'
          for (difficulty of filterDifficulty(selected_system, value)) {
            console.log(`${selected_system}.${value} => ${difficulty}`)

            let convertedDiff = fromDifficulty('TUFBE', difficulty)
            console.log(`${difficulty} => ${convertedDiff}`)

            let convertedIconDiff = fromDifficulty('TUF', difficulty)
            console.log(`${difficulty} => ${convertedIconDiff}`)


            setMinDiff(convertedDiff)
            console.log('new min diff filter: minDiff = ' + convertedDiff)

            changeMinDiffIcon(convertedIconDiff)
            console.log('change min diff icon to: ' + value + ' = ' + convertedIconDiff)
          }
        }}
        className={classnames('thumb thumb-zindex-3', {
          'thumb-zindex-5': minVal > max - 100
        })}
      />

      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(+event.target.value, minVal)
          setMaxVal(value)
          event.target.value = value.toString()

          selected_system = 'INDEX'
          for (difficulty of filterDifficulty(selected_system, value)) {
            console.log(`${selected_system}.${value} => ${difficulty}`)

            let convertedDiff = fromDifficulty('TUFBE', difficulty)
            let convertedValue = converted ? converted : '<unsupported>'
            console.log(`${difficulty} => ${convertedDiff}`)

            let convertedIconDiff = fromDifficulty('TUF', difficulty)
            console.log(`${difficulty} => ${convertedIconDiff}`)


            setMaxDiff(convertedDiff)
            console.log('new max diff filter: maxDiff = ' + convertedDiff)

            changeMaxDiffIcon(convertedIconDiff)
            console.log('change max diff icon to: ' + value + ' = ' + convertedIconDiff)
          }
        }}
        className="thumb thumb-zindex-4"
      />

      <div className="slider">
        <div className="slider-track"></div>
        <div ref={range} className="slider-range"></div>
        <div className="slider-left-value">
          <DifficultyIcon
            ref={changeMinDiffIconRef}
            difficulty={'P1'}
            size={'24px'}
            censored={false}
            rated={true}
            impossible={false}
          /> {/*difficulty={minVal}*/}
        </div>
        <div className="slider-right-value">
          <DifficultyIcon
            ref={changeMaxDiffIconRef}
            difficulty={'U20'}
            size={'24px'}
            censored={false}
            rated={true}
            impossible={false}
          /> {/*difficulty={maxVal}*/}
        </div>
      </div>
    </div>
  )
}

export default DifficultySlider
