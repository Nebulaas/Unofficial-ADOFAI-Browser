import { FC, forwardRef, MutableRefObject, useEffect, useImperativeHandle, useState } from 'react'

const icons = import.meta.glob('../../../assets/T21C-assets/*/*.png', {
  eager: true
})

interface DifficultyIconProps {
  difficulty: string
  size: string
  censored: boolean
  rated: boolean
  impossible: boolean
}

// eslint-disable-next-line react/display-name
const DifficultyIcon: FC<DifficultyIconProps> = forwardRef(
  ({ difficulty, size, censored, rated, impossible }, ref) => {
    const [difficultyState, setDifficultyState] = useState(difficulty)
    const [censoredState, setCensoredState] = useState(censored)
    const [ratedState, setRatedState] = useState(rated)
    const [impossibleState, setImpossibleState] = useState(impossible)

    useImperativeHandle(ref, () => ({
      changeMinDiff: (newMinDiff): void => {
        setDifficultyState(newMinDiff)
        console.log('set min diff icon state to: ' + newMinDiff)
      },

      changeMaxDiff: (newMaxDiff): void => {
        setDifficultyState(newMaxDiff)
        console.log('set max diff icon state to: ' + newMaxDiff)
      }
    }))

    const url = (
      icons[
        `../../../assets/T21C-assets/${
          !ratedState
            ? 'miscDiff/Unranked'
            : censoredState
              ? 'miscDiff/-2'
              : impossibleState
                ? 'miscDiff/21-'
                : 'pguDiff/' + difficultyState
        }.png`
      ] as { default: string } | undefined
    )?.default

    return (
      <img
        onClick={() =>
          console.log(
            'db rated: ' + rated,
            '\ncheck rated: ' + ratedState,
            '\ncensored: ' + censoredState,
            '\ndifficulty PGU: ' + difficultyState
          )
        }
        src={url}
        width={size}
        height={size}
        alt={difficultyState}
        draggable="false"
      />
    )
  }
)

export default DifficultyIcon
