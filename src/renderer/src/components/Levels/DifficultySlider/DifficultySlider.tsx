import { ChangeEvent, FC, useCallback, useEffect, useState, useRef, useContext } from 'react'
import classnames from 'classnames'

import { LevelContext } from '../../../context/Web/Levels/LevelContext'
import { DifficultyContext } from '../../../context/Web/Difficulty/DifficultyContext'
import { DiffSliderContext } from '../../../context/Web/Difficulty/DiffSliderContext'

import './DifficultySlider.css'
import { DifficultyIcon } from '../../index'

// props interface for the difficulty slider component
interface DifficultySliderProps {
  min: number // lowest value for the slider
  max: number // highest value for the slider
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function // debug function ran when either minVal or maxVal states are updated (see states below)
  system: string // active rating system
}

// typed as FC (functional component) for easy property types, `onChange` is a callable function
const DifficultySlider: FC<DifficultySliderProps> = ({ min, max, onChange, system }) => {
  // // state holding the current value of the left slider thumb, default passed in Levels.tsx
  // const [minVal, setMinVal] = useState(min)
  // // state holding the current value of the right slider thumb, default passed in Levels.tsx
  // const [maxVal, setMaxVal] = useState(54) // 54 = U14, cant go higher
  // /* react ref for minVal state */
  // const minValRef = useRef<HTMLInputElement>(null)
  // // react ref for maxVal state
  // const maxValRef = useRef<HTMLInputElement>(null)
  // // react ref of the difference between minVal and maxVal
  // const range = useRef<HTMLDivElement>(null)

  const {
    // levelsData, setLevelsData,
    // legacyDiff, setLegacyDiff,
    // filterOpen, setFilterOpen,
    // sortOpen, setSortOpen,
    query, setQuery,

    minDiff, setMinDiff,
    maxDiff, setMaxDiff,

    sort, setSort
    // hasMore, setHasMore,
    // pageNumber, setPageNumber,
  }: any = useContext(LevelContext)

  let {
    difficulties,

    selected_system,
    selected_difficulty,
    difficulty,
    converted,

    filterDifficulty,
    fromDifficulty,
    difficultiesFor
  }: any = useContext(DifficultyContext)

  let {
    minVal, setMinVal,
    maxVal, setMaxVal,
    minValRef, maxValRef,
    range
  }: any = useContext(DiffSliderContext)

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

  // Set min query diff and icon when minVal state changes
  useEffect(() => {
    setMinDiff(convertDiffIndexToSystems(minVal, 'TUFBE'))
    changeMinDiffIcon(convertDiffIndexToSystems(minVal, ratingSystem))
  }, [minVal])

  // Set max query diff and icon when maxVal state changes
  useEffect(() => {
    setMaxDiff(convertDiffIndexToSystems(maxVal, 'TUFBE'))
    changeMaxDiffIcon(convertDiffIndexToSystems(maxVal, ratingSystem))
  }, [maxVal])

  // converts a difficulty index value to a specified system difficulty value
  function convertDiffIndexToSystems(index, toSystem): string {
    let convertedIndex: string
    for (difficulty of filterDifficulty('INDEX', index)) {
      // console.log(`INDEX.${index} => ${difficulty}`)
      convertedIndex = fromDifficulty(toSystem, difficulty)
      // console.log(`${difficulty} => ${convertedIndex}`)
    }
    return convertedIndex!
  }

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
          console.log(minVal > max - 100)
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
          let value = Math.max(+event.target.value, minVal)
          // as there are no levels higher than difficulty 54 (U14), don't let the user filter higher than 54.
          value = (value < 55) ? value : 54
          setMaxVal(value)
          event.target.value = value.toString()
        }}
        className="thumb thumb-zindex-4"
      />

      <div className="slider">
        <div className="slider-track"></div>
        <div ref={range} className="slider-range"></div>
        <div className="slider-left-value">
          <DifficultyIcon
            ref={changeMinDiffIconRef}
            difficulty={convertDiffIndexToSystems(minVal, ratingSystem)}
            size={'36px'}
            censored={false}
            rated={true}
            impossible={false}
          />
        </div>
        <div className="slider-right-value">
          <DifficultyIcon
            ref={changeMaxDiffIconRef}
            difficulty={convertDiffIndexToSystems(maxVal, ratingSystem)}
            size={'36px'}
            censored={false}
            rated={true}
            impossible={false}
          />
        </div>
      </div>
    </div>
  )
}

export default DifficultySlider
