# Pacific Microphone
<https://pacificmicroph.one>


## Made by the Blue Ocean Pacific team:
Tristan Johnson - Project Manager - <https://github.com/Sithistorian><br>
Tarrin Neal - Technical Stack Manager - <https://github.com/tarrinneal><br>
Austin Elwell - User Interface Manager - <https://github.com/austinelwell99><br>
Austin Testut - Full Stack Engineer - <https://github.com/austintestut><br>
Chandler Ocapan - Full Stack Engineer - <https://github.com/GeekBoyChan><br>
Lara Davies - Full Stack Engineer - <https://github.com/larakhdavies><br>
Samuel Cho - Full Stack Engineer - <https://github.com/SamuelCho-ubf><br>


## Purpose
Pacific Micropohone allows users to create a personalized collection of acting scripts and speeches.  Powered by IBM's Watson AI and Web Empath's vocal emotion recognition software, users can analyze their script tones and vocal emotions to build their presentational skills.

## How to Get Started
Pacific Microphone uses Google Authentication, allowing users to easily sign in to a personal account.  Once signed in, there are there are three main tools available for use:  Script Analyzer, Voice Analyzer, and Live Practice. New users will be greeted with an excerpt from Shakespeare's Hamlet to for a great example of the tools and features of the application.  However, they are free to add new scripts to their profile using the left side panel.

### Adding a New Script
Click on the "Add New Script" button in the left side panel, under "Your Scripts" to add a new script to your collection.  In the Script Information Form, add the title, author, and body of the script.  For analysis, the script should be in the following format:

    SPEAKER
    Pacific Microphone has helped me hone my acting chops!
    ANOTHER SPEAKER
    This app has made all the difference in my acting skills.  I am so grateful to the creators.

Make sure to use punctuation for the end of each sentence for proper sentence-by sentence analysis.

### Script Analysis
In the Script Analyzer tool, you can select a script to display its tone analyzation per sentence.  Select a script from your collection on the left, then click any sentence in the script to view its analyzed tone percentage score.
The tones can be any of the following:
- Anger
- Joy
- Fear
- Sadness
- Analytical
- Confident
- Tentative

### Voice Analysis
In the Voice Analyzer tool, click record and perform a dialogue of your choosing.  You will receive a transcription of your dialogue and a graph of your vocal emotions over time.
The emotions that are analyzed include:
- Anger
- Sadness
- Calmness
- Joy
- Energy

### Live Practice
In the Live Practice tool, select a script from the side panel to practice with a robotic partner. Upon selecting a script, choose the character in the script you would like to play.  Then, you can use the buttons at the bottom of the page to navigate the script reading and practice along with the app.

### Running App Locally
To run Pacific Microphone locally:
1. Fork and Clone the repo <https://github.com/Blue-Ocean-Pacific/Blue_Ocean_Pacific>
2. Install sox
    - `sudo apt install sox` and `sudo apt-get install libsox-fmt-mp3` for Linux or WSL
    - Use homebrew for MacOS
3. Set up file named '.env' in the root folder with the following variables:
    - DBTOKEN
    - GOOGLE_CLIENT_ID
    - GOOGLE_CLIENT_SECRET
    - WATSON_TEXT_ANALYSIS
    - WATSON_TEXT_ANALYSIS_URL
    - WATSON_SPEECH_TO_TEXT
    - WATSON_SPEECH_TO_TEXT_URL6
    - WATSON_TEXT_TO_SPEECH
    - WATSON_TEXT_TO_SPEECH_URL
    - WEB_EMPATH
    - WEB_EMPATH_URL
    - COOKIE_KEY
      - For example:
        - COOKIE_KEY=bestcookiedecryptionkeyever1337
    - The URLs and associated keys can be created with a free account at <https://www.ibm.com/watson/developer> and <https://webempath.net>
    - Note that this app is set up for Google OAuth 2.0, so a Google Client ID and Google Client Secret code will be required to run it in its normal state.  To avoid this and run the app without authentication (as of 4/11/2021):
      - server/index.js:
        - Comment out lines 5, 6, 8, 29-36, 55-63
      - client/src/App.jsx:
        - Comment out line 22
        - Add values to lines 12 (true), 13 (your name), and 14 (_id for your MongoDB user)
4. Set up MongoDB as specified by the schemas and models in database/index.js
5. Install dependencies `npm install`
6. Compile code `npm run watch`
7. Start server `npm start`
8. Navigate to <http://localhost:3000/>