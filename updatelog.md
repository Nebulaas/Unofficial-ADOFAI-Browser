### 20/3/2024 [v0.0.0.1 prototype]
Initial Commit

---

### 21/3/2024 [v0.0.0.2 prototype]
App Outline Created

- Added:

  <div style="background-color: rgba(3,215,0,0.33)">

  - In-App text now un-highlightable (subject to change)

  </div>


- Changed:

  <div style="background-color: rgba(0,125,215,0.33)">

    - Title font now semi-accurate to other TUF related software

  </div>


- Removed:

  <div style="background-color: rgba(215,0,0,0.33)">

    - Default Electron template text

  </div>
---

### 24/4/2024 [v0.0.0.3 prototype]
Styling Overhaul & New Navbar Stuff

- Added:

  <div style="background-color: rgba(3,215,0,0.33)">

  - Side Nav (still in progress)
  - Links to level browser, submissions, and an about page (none are functional as of now)
  - Account page and dropdown (also not functional)

  </div>


- Changed:

  <div style="background-color: rgba(0,125,215,0.33)">

  - Overhauled css to be more accurate to general ADOFAI style
  - Changed project direction from TUF to a broader ADOFAI app


   </div>

- Removed:

  <div style="background-color: rgba(215,0,0,0.33)">

  - Rating system dropdown (gonna be added in future anyway)

  </div>
---

### 15/5/2024 [v0.0.0.4 prototype]
Full Remake & Completed Navigation

- Added:

  <div style="background-color: rgba(3,215,0,0.33)">

  - React.js implemented into project
  - Side Navigation can now be opened and closed
  - Several pages, e.g. browse, submissions, etc.
  - Several elements are now animated and or interactive

  </div>


- Changed:

  <div style="background-color: rgba(0,125,215,0.33)">

  - Top Navigation is complete with page links (working) and account icon (not functional)
  - Side Navigation is complete with page links (working) and accessibility feature buttons (not functional)
  - Majority of elements have visual changes, e.g. colour, size, etc.

  </div>


- Removed:

  <div style="background-color: rgba(215,0,0,0.33)">

  - Old project structure and repository (archived at https://github.com/Nebulaas/Unofficial-ADOFAI-Browser-15.5.24.Archive)

  </div>
---


### 20/5/2024 [v0.0.0.5 prototype]
Account Login/Logout

- Added:

  <div style="background-color: rgba(3,215,0,0.33)">

  - New login dialogue menu from top navigation account icon (currently no account functionality exists and is for flair)
  - Added React contexts (still in early development)

  </div>


- Changed:

  <div style="background-color: rgba(0,125,215,0.33)">

  - Top Navigation Account icon no longer greyed out and now can be interacted with.

  </div>

---

### 25/6/2024 [v0.0.0.6 prototype]
App Language Settings/Dialogue & Responsive Login Display

- Added:

  <div style="background-color: rgba(3,215,0,0.33)">

  - i18next translation functionality implemented
  - English and Korean translation jsons added (Korean will be fixed, currently uses Google Translate results)
  - App Language can now be changed between English and Korean (more to come at a later point)
  - Responsive Text on Home Page displaying login status (works with languages)

  </div>


- Changed:

  <div style="background-color: rgba(0,125,215,0.33)">

  - Side Navigation Language icon no longer greyed out and now can be interacted with.
  - Language & Login Dialogues are now individual components for better readability
  - New `CombinedNav` Component to allow for simpler implementation & future shared navigation functionality

  </div>

---

### 25/6/2024 [v0.0.0.7 prototype]
Oops, forgot to separate LanguageDialogue from SideNav!

- Changed:

  <div style="background-color: rgba(0,125,215,0.33)">

  - Language Dialogue is now ACTUALLY an individual component

  </div>
---
