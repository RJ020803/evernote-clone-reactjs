import React from "react";
import ReactQuill from "react-quill";
import debounce from "../helper";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class EditorComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      text: "",
      id: ""
    };
  }

  componentDidMount = () => {
    this.setState({
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id,
      text: this.props.selectedNote.body
    });
  };

  componentDidUpdate = () => {
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id,
        text: this.props.selectedNote.body
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon} />
        <input
          className={classes.titleInput}
          placeholder="Note title..."
          value={this.state.title ? this.state.title : ""}
          onChange={e => this.updateTitle(e.target.value)}
        />
        <ReactQuill value={this.state.text} onChange={this.updateBody} />
      </div>
    );
  }

  updateBody = async val => {
    await this.setState({ text: val });
    this.update();
  };

  updateTitle = async txt => {
    await this.setState({ title: txt });
    this.update();
  };

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    });
  }, 1500);
}

export default withStyles(styles)(EditorComponent);
