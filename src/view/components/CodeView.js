import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/clike/clike';
import 'codemirror/lib/codemirror.css';

export default class CodeView extends React.Component {
  isBreakEvent = false

  static propTypes = {
		code: React.PropTypes.string.isRequired,
		onClick: React.PropTypes.func.isRequired
	}

	selectionChanged = (cm) => {
    if (this.isBreakEvent) {
      return
    }

		var range = cm.doc.sel.ranges[0];
		var sel = range.head;
		const token = cm.getTokenAt(sel);

		if (sel.line === 0 && sel.ch === 0) return;
		this.props.onClick(sel.line, sel.ch, token);

    this.isBreakEvent = true
	}

	componentDidUpdate() {
		if (this.props.heatMap) {
			const codeMirror = this.refs.cm.getCodeMirror()

			const missclicks = this.props.heatMap.missclicks

			Object.keys(missclicks).forEach(key => {
				const missclick = missclicks[key]
				const alpha = missclick.count / this.props.heatMap.maxMissClick

				codeMirror.markText(
					{ line: missclick.line, ch: missclick.start },
					{ line: missclick.line, ch: missclick.end },
					{ css: `background-color: rgba(256, 0, 0, ${alpha})` }
				)
			})
		}
	}

	componentDidMount() {
		const codeMirror = this.refs.cm.getCodeMirror();
		codeMirror.on("cursorActivity", this.selectionChanged);
	}

  handleMouseUp = () => {
    this.isBreakEvent = false
  }

	render() {
		const options = {
			lineNumbers: false,
			mode: "text/x-csharp",
			readOnly: "nocursor",
			styleSelectedText: true,
		}

		return <div onMouseUp={this.handleMouseUp}>
      <CodeMirror ref="cm"
  			value={this.props.code}
  			options={options}
  		/>
    </div>
	}
}
