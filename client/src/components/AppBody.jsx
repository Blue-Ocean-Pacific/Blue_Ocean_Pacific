/* eslint-disable react/prop-types */
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import SidePanel from './SidePanel';
import MainPage from './MainPage';

class AppBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 'toneAnalyzer',
      selectedScriptIndex: 0,
      showModal: false,
      title: '',
      author: '',
      scriptBody: '',
      showLPModal: false,
      userCharacter: null,
      tmp: null,
      currentSentenceTones: [],
    };

    this.changeSelectedPage = this.changeSelectedPage.bind(this);
    this.changeSelectedScript = this.changeSelectedScript.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleLPModal = this.toggleLPModal.bind(this);
    this.getClickedSentenceTone = this.getClickedSentenceTone.bind(this);
    this.deleteScript = this.deleteScript.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { userId, getScripts } = this.props;
    const { title, author, scriptBody } = this.state;
    const objScript = {
      userId,
      title,
      author,
      scriptBody,
    };

    axios
      .post('/uploadScript', objScript)
      .catch((error) => console.error(error));

    axios
      .post('/textToneAnalysis', { text: scriptBody, title, userId })
      .then((data) => {
        getScripts();
        console.log(data);
      })
      .catch((error) => console.error(error));

    this.toggleModal();
  }

  // to be used as an onClick for each sentence on text analysis page
  getClickedSentenceTone(selectedSentence) {
    const { watsonAnalysis } = this.state;
    this.setState({
      currentSentenceTones: watsonAnalysis[selectedSentence],
    });
  }

  deleteScript() {
    console.log('in body function');
    const { selectedScriptIndex } = this.state;
    const { scriptList, userId, getScripts } = this.props;
    if (selectedScriptIndex === null) {
      return;
    }
    const scriptObj = scriptList[selectedScriptIndex];
    axios
      .post('/scripts/delete', {
        scriptObj,
        userId,
      })
      .then(() => {
        getScripts();
        let idx = 0;
        if (scriptList.length === 0) {
          idx = null;
        }
        this.setState({
          selectedScriptIndex: idx,
        });
      })
      .catch((err) => console.error(err));
  }

  toggleLPModal() {
    const { showLPModal } = this.state;
    this.setState({ showLPModal: !showLPModal });
  }

  changeSelectedPage(page) {
    const { scriptList } = this.props;
    let idx = null;
    if (page === 'toneAnalyzer' && scriptList.length !== 0) {
      idx = 0;
    }
    this.setState({ selectedPage: page, selectedScriptIndex: idx });
  }

  changeSelectedScript(index) {
    // Will need change this to display the script in the appropriate format on the page
    const { showLPModal, selectedPage } = this.state;
    this.setState({ selectedScriptIndex: index });
    if (selectedPage === 'livePractice') {
      this.toggleLPModal();
    }
  }

  toggleModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  render() {
    const {
      selectedPage,
      selectedScriptIndex,
      showModal,
      showLPModal,
      currentSentenceTones,
      userCharacter,
    } = this.state;
    const { scriptList } = this.props;
    console.log(scriptList);
    return (
      <div id="appBody">
        <Modal id="newScriptModal" isOpen={showModal}>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <h3>Input Script Information</h3>
            <div className="modalInputField">
              <label htmlFor="modalTitleInput"></label>
              <input
                type="text"
                id="modalTitleInput"
                required
                placeholder="Title of script"
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </div>
            <div className="modalInputField">
              <label htmlFor="modalAuthorInput"></label>
              <input
                type="text"
                id="modalAuthorInput"
                required
                placeholder="Author of script"
                onChange={(e) => this.setState({ author: e.target.value })}
              />
            </div>
            <div className="modalInputField">
              <label htmlFor="modalScriptInput"></label>
              <textarea
                id="modalScriptInput"
                required
                placeholder="Body Of Script"
                onChange={(e) => this.setState({ scriptBody: e.target.value })}
              />
            </div>
            <button type="submit" className="modalButtons">
              Submit
            </button>
            <button
              type="button"
              className="modalButtons"
              onClick={this.toggleModal}
            >
              Cancel
            </button>
          </form>
        </Modal>
        {selectedScriptIndex !== null && (
          <Modal id="livePerformanceModal" isOpen={showLPModal}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const { tmp } = this.state;
                this.setState({ userCharacter: tmp });
                this.toggleLPModal();
              }}
            >
              <select
                onChange={(e) => {
                  this.setState({
                    tmp: e.target.value,
                  });
                }}
              >
                <option>Select your role</option>
                {scriptList[selectedScriptIndex]?.characterList.map(
                  (character) => (
                    <option value={character}>{character}</option>
                  )
                )}
              </select>
              <button type="submit">Submit</button>
            </form>
          </Modal>
        )}
        <SidePanel
          changeSelectedPage={this.changeSelectedPage}
          changeSelectedScript={this.changeSelectedScript}
          scriptList={scriptList}
          toggleModal={this.toggleModal}
          deleteScript={this.deleteScript}
          selectedScriptIndex={selectedScriptIndex}
          selectedPage={selectedPage}
        />
        <MainPage
          page={selectedPage}
          selectedScript={scriptList[selectedScriptIndex]}
          currentSentenceTones={currentSentenceTones}
          userCharacter={userCharacter}
        />
      </div>
    );
  }
}

export default AppBody;
