import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy, ReactElement } from 'react'

const Home = lazy(() => import('./pages/Home/Home'))
const Levels = lazy(() => import('./pages/Levels/Levels'))
const Submissions = lazy(() => import('./pages/Submissions/Submissions'))
const Community = lazy(() => import('./pages/Community/Community'))
const Leaderboards = lazy(() => import('./pages/Leaderboards/Leaderboards'))
const About = lazy(() => import('./pages/About/About'))
const Account = lazy(() => import('./pages/Account/Account'))
const Settings = lazy(() => import('./pages/Settings/Settings'))



function App(): ReactElement {

  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="levels" element={<Levels />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="community" element={<Community />} />
        <Route path="leaderboards" element={<Leaderboards />} />
        <Route path="about" element={<About />} />
        <Route path="account" element={<Account />} />
        <Route path="settings" element={<Settings />} />

        {/*<Route path="submission/level" element={<LevelSubmissionPage />} />*/}
        {/*<Route path="submission/pass" element={<PassSubmissionPage />} />*/}
      </Routes>
    </Suspense>
  )
}

export default App
