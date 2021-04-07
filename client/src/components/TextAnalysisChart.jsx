/* eslint-disable react/prop-types */
import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';

class TextAnalysisChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toneColors = {
      Anger: '#d10e00',
      Joy: '#75ffe1',
      Fear: '#ed7300',
      Sadness: '#0074cc',
      Analytical: '#29dfff',
      Confident: '#662d91',
      Tentative: '#fcba03',
    };
  }
  /*
        // hard coded
      // value of current sentence will be sent here (as props?)
      sentenceTones: [
        {
          score: 0.895415,
          tone_id: 'analytical',
          tone_name: 'Analytical',
        },
        {
          score: 0.895415,
          tone_id: 'analytical',
          tone_name: 'Analytical',
        },
      ],
  */

  render() {
    const { currentSentenceTones } = this.props;
    const data = currentSentenceTones.map((tone) => ({
      x: tone.tone_name,
      y: tone.score * 100,
      fill: this.toneColors[tone.tone_name],
    }));
    return (
      <div id="TextAnalysisChart">
        Text Analysis
        <VictoryChart
          padding={100}
          theme={VictoryTheme.material}
          width={600}
          domainPadding={{ x: 75 }}
        >
          <VictoryAxis
            dependentAxis
            orientation="left"
            label="Score"
            style={{
              data: {
                fill: ({ datum }) => this.toneColors[datum.x],
              },
              tickLabels: { fontSize: 10 },
            }}
            domain={[0, 100]}
            standalone={false}
          />
          <VictoryAxis
            orientation="bottom"
            label="Tone"
            style={{
              tickLabels: { fontSize: 10 },
            }}
            standalone={false}
          />
          <VictoryBar
            data={data}
            style={{
              data: {
                fill: ({ datum }) => this.toneColors[datum.x],
              },
            }}
            animate={{
              duration: 1000,
              onLoad: { duration: 500 },
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default TextAnalysisChart;