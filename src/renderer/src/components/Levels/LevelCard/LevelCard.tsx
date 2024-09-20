/*
  This is the template component for the browse page's search results display.

  This file .
*/

// import { useNavigate } from 'react-router-dom'
// import { getLevelImage } from '../../Repository/RemoteRepository'
import './LevelCard.css'

import { useTranslation } from 'react-i18next'

import DifficultyIcon from '../DifficultyIcon/DifficultyIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import {FC, useContext} from 'react'
import { DifficultyContext } from '../../../context/Web/Difficulty/DifficultyContext'

interface LevelCardProps {
  pdnDiff: any
  pguDiff: any
  creator: any
  id: any
  artist: any
  song: any
  clears: any
  dl: any
  ws: any
  team: any
  legacy: any
}

const LevelCard: FC<LevelCardProps> = ({
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
}): any => {

  // define translation function
  const { t } = useTranslation()

  /* const navigate = useNavigate()

  const redirect = () => {
    navigate(`/leveldetail?id=${encodeURIComponent(id)}`)
  }*/

  // prevents further event propagation on click
  const onAnchorClick = (e): void => {
    e.stopPropagation()
  }

  // prevents empty link from being opened by preventing the default onClick event behaviour
  const handleEmptyLink = (e): void => {
    e.preventDefault()
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

  /* link debugging
  console.log(
    'download check: ' + song + ' > ' + (dl ? dl : 'No Download'),
    '\nworkshop check: ' + song + ' > ' + (ws ? ws : 'No Workshop'),
    '\nworkshop link split check: ' + ws.includes('https'),
    '\nworkshop link split check: ' + (ws.split([':'][1])[0] == 'https'),
    '\nworkshop split check: ' + (ws.split([':'][1])[0] == 'https' ? ws : 'No Workshop')
  )*/

  // convert object into json string in json format
  const jsonString = JSON.stringify(jsonData, null, 2)
  // console.log('JSON: ' + jsonString) // traces formatted json string, for debugging purposes

  // creates Blob object from converted json string
  const dataBlob = new Blob([jsonString], { type: 'application/json' })

  // converts Blob object to file URL for downloading
  const dataURL = URL.createObjectURL(dataBlob)
  // console.log('URL: ' + dataURL) // traces converted blob URL, for debugging purposes

  return (
    <>
      {/* Card content container element */}
      <div id="level-card-container" className="level-card-rev"> {/*onClick={() => redirect()}*/}

        {/* Left-most section of card display */}
        <div id="card-general-section">
          <p id="data-id" className="section-top-text">#{id}</p> {/* Level #ID Display */}

          {/* Level Difficulty Icon & Wrapper/Container */}
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

        <div id="card-credits">
          <div id="card-music-section" className="artist-wrapper">
            <p id="data-artist" className="section-top-text">{artist}</p>
            <p id="data-song" className="section-bottom-text">{song}</p>
          </div>

          <div id="card-creator-section" className="creator-wrapper">
            <p id="label-creator" className="section-top-text">{t('levels.results.cards.creator')}</p>
            <p id="data-creator" className="section-bottom-text">{team ? team : creator}</p>
          </div>
        </div>

        {clears || clears == 0 ? (
          <div id="card-clears-section" className="clears-wrapper">
            <p id="label-clears" className="section-top-text">{t('levels.results.cards.clears')}</p>
            <p id="data-clears" className="section-bottom-text">{clears}</p>
          </div>
        ) : (
          <></>
        )}

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
            data-tooltip-id="json-dl"
          >
            <FontAwesomeIcon
              icon={'fa-solid fa-file-export' as IconProp}
              size="2xl"
              id="data-json-icon"
              className="card-button-icon"
            />
          </a>

          {/* eslint-disable react/prop-types */}
          {ws.includes('https') && (
            <a href={ws} target="_blank" rel="noreferrer" onClick={onAnchorClick} data-tooltip-id="level-ws">
              <FontAwesomeIcon
                icon={'fa-brands fa-steam' as IconProp}
                size="2xl"
                id="data-ws-icon"
                className="card-button-icon"
              />
            </a>
          )}

          {dl.includes('https') && (
            <a href={dl} target="_blank" rel="noreferrer" onClick={onAnchorClick} data-tooltip-id="level-dl">
              <FontAwesomeIcon
                icon={'fa-solid fa-download' as IconProp}
                size="2xl"
                id="data-dl-icon"
                className="card-button-icon"
              />
            </a>
          )}

          {!ws && !dl && (
            <a href="" target="_blank" rel="noreferrer" onClick={handleEmptyLink} data-tooltip-id="level-none">
              <FontAwesomeIcon
                icon={'fa-solid fa-ban' as IconProp}
                size="2xl"
                id="data-no-dl-icon"
                className="card-button-icon"
              />
            </a>
          )}
        </div>
      </div>
    </>

  )
}

export default LevelCard
