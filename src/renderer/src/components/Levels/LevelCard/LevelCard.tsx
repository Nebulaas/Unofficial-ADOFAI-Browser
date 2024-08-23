// COPIED CODE

// import { useNavigate } from 'react-router-dom'
// import { getLevelImage } from '../../Repository/RemoteRepository'
import './LevelCard.css'
import { useTranslation } from 'react-i18next'
import DifficultyIcon from '../DifficultyIcon/DifficultyIcon'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {useContext} from "react";
import {DifficultyContext} from "../../../context/Web/Difficulty/DifficultyContext";

const LevelCard = ({
  pdnDiff,
  pguDiff,
  creator,
  id,
  artist,
  song,
  clears,
  dl,
  ws,
  team,
  legacy
}) => {

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

  const { t } = useTranslation()

  /* const navigate = useNavigate()

  const redirect = () => {
    navigate(`/leveldetail?id=${encodeURIComponent(id)}`)
  }*/

  // prevents further event propagation on click
  const onAnchorClick = (e): void => {
    e.stopPropagation()
  }

  // dictionary containing a level's data
  const jsonData = {
    'TUF Backend Difficulty Index': pdnDiff, // difficulty index used by the TUF backend API
    'TUF PGU Difficulty': pguDiff, // level difficulty, includes non standard diffs (e.g. impossible, unranked, etc.)
    'Level #ID': id, // unique numerical level id
    'Level Creator(s)': team ? team : creator, // level creator(s) name or team name
    'Song Artist': artist, // name of music artist
    'Song Name': song, // name of level's music
    'Player Clear Count': clears, // number of times players have beaten this level
    'Direct Download Link': dl.includes('https') ? dl : 'No Download', // discord embed, google drive, etc. link
    'Steam Workshop Link': ws.includes('https') ? ws : 'No Workshop' // level's steam workshop link
  }

  // link debugging
  // console.log(
  //   'download check: ' + song + ' > ' + (dl ? dl : 'No Download'),
  //   '\nworkshop check: ' + song + ' > ' + (ws ? ws : 'No Workshop'),
  //   '\nworkshop link split check: ' + ws.includes('https'),
  //   '\nworkshop link split check: ' + (ws.split([':'][1])[0] == 'https'),
  //   '\nworkshop split check: ' + (ws.split([':'][1])[0] == 'https' ? ws : 'No Workshop')
  // )

  // convert object into json string in json format
  const jsonString = JSON.stringify(jsonData, null, 2)
  // console.log('JSON: ' + jsonString) // traces formatted json string, for debugging purposes

  // creates Blob object from converted json string
  const dataBlob = new Blob([jsonString], { type: 'application/json' })

  // converts Blob object to file URL for downloading
  const dataURL = URL.createObjectURL(dataBlob)
  // console.log('URL: ' + dataURL) // traces converted blob URL, for debugging purposes


  // selected_system = 'TUF'
  // for (difficulty of filterDifficulty(selected_system, pguDiff)) {
  //   console.log(`${selected_system}.${pguDiff} => ${difficulty}`)
  //
  //   converted = fromDifficulty('TUFBE', difficulty)
  //   console.log(`${difficulty} => ${converted}`)
  // }

  // selected_system = 'TUFBE'
  // for (difficulty of filterDifficulty(selected_system, pguDiff)) {
  //   console.log(`${selected_system}.${pguDiff} => ${difficulty}`)
  //   converted = fromDifficulty(selected_system, difficulty)
  //   console.log(`${difficulty} => ${selected_system}.${converted}`)
  // }

  // converted = fromDifficulty(selected_system, difficulty)
  // console.log(`${difficulty} => ${selected_system}.${converted}`)

  return (
    <>
      <div id="level-card-container" className="level-card-rev"> {/*onClick={() => redirect()}*/}

        <div id="card-gen eral-section">
          <p id="data-id" className="section-top-text">#{id}</p>

          <div id="data-difficulty-icon" className="img-wrapper">
            <DifficultyIcon
              difficulty={pguDiff}
              size={'40px'}
              censored={pguDiff == '-2'}
              rated={pguDiff != '0'}
              impossible={pguDiff == '-21'}
            />
          </div>
        </div>

        {/*<div id="card-credits">*/}
        <div id="card-music-section" className="artist-wrapper">
          <p id="data-artist" className="section-top-text">{artist}</p>
          <p id="data-song" className="section-bottom-text">{song}</p>
        </div>

        <div id="card-creator-section" className="creator-wrapper">
          <p id="label-creator" className="section-top-text">{t('levels.results.cards.creator')}</p>
          <p id="data-creator" className="section-bottom-text">{team ? team : creator}</p>
        </div>
        {/*</div>*/}

        {clears || clears == 0 ? (
          <div id="card-clears-section" className="clears-wrapper">
            <p id="label-clears" className="section-top-text">{t('levels.results.cards.clears')}</p>
            <p id="data-clears" className="section-bottom-text">{clears}</p>
          </div>
        ) : (
          <></>
        )}

        <div id="card-data-download" className="data-dl-wrapper">

        </div>

        <div id="card-download-section" className="downloads-wrapper">
          <a
            href={dataURL}
            download={'TUF-' + id + '.json'}
            onClick={e => {
              onAnchorClick
            }}
            target="_blank"
            rel="noreferrer"
            id="data-dl-link"
          >
            <FontAwesomeIcon
              icon={'fa-solid fa-file' as IconProp}
              size="2xl"
              id="data-dl-icon"
              className="card-button-icon"
            />
          </a>

          {ws.includes('https') && (
            <a href={ws} target="_blank" rel="noreferrer" onClick={onAnchorClick}>
              <svg
                className="svg-fill"
                fill="#ffffff"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M 22 6 C 18.745659 6 16.09469 8.6041857 16.007812 11.837891 L 12.337891 17.083984 C 12.065931 17.032464 11.786701 17 11.5 17 C 10.551677 17 9.673638 17.297769 8.9472656 17.800781 L 4 15.84375 L 4 21.220703 L 7.1054688 22.449219 C 7.5429388 24.475474 9.3449541 26 11.5 26 C 13.703628 26 15.534282 24.405137 15.917969 22.310547 L 21.691406 17.984375 C 21.794183 17.989633 21.895937 18 22 18 C 25.309 18 28 15.309 28 12 C 28 8.691 25.309 6 22 6 z M 22 8 C 24.206 8 26 9.794 26 12 C 26 14.206 24.206 16 22 16 C 19.794 16 18 14.206 18 12 C 18 9.794 19.794 8 22 8 z M 22 9 A 3 3 0 0 0 22 15 A 3 3 0 0 0 22 9 z M 11.5 18 C 13.43 18 15 19.57 15 21.5 C 15 23.43 13.43 25 11.5 25 C 10.078718 25 8.8581368 24.145398 8.3105469 22.925781 L 10.580078 23.824219 C 10.882078 23.944219 11.192047 24.001953 11.498047 24.001953 C 12.494047 24.001953 13.436219 23.403875 13.824219 22.421875 C 14.333219 21.137875 13.703922 19.683781 12.419922 19.175781 L 10.142578 18.273438 C 10.560118 18.097145 11.019013 18 11.5 18 z"></path>
                </g>
              </svg>
            </a>
          )}

          {dl.includes('https') && (
            <a href={dl} target="_blank" rel="noreferrer" onClick={onAnchorClick}>
              <svg className="svg-stroke" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}

          {!ws && !dl && (
            <a href="" target="_blank" rel="noreferrer" onClick={onAnchorClick}>
              <svg
                className="svg-fill"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path
                    fill="#ffffff"
                    fillRule="evenodd"
                    d="M5.781 4.414a7 7 0 019.62 10.039l-9.62-10.04zm-1.408 1.42a7 7 0 009.549 9.964L4.373 5.836zM10 1a9 9 0 100 18 9 9 0 000-18z"
                  ></path>
                  {' '}
                </g>
              </svg>
            </a>
          )}
        </div>
      </div>
    </>

  )
}

export default LevelCard
