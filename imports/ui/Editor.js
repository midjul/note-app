import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

export class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: ''
        }
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
    }
    handleDeleteNote() {
        this.props.call('notes.remove', this.props.note._id);
        this.props.browserHistory.push('/dashboard');
    }
    handleBodyChange(e) {
        const body = e.target.value;
        this.setState({ body })
        this.props.call('notes.update', this.props.note._id, {
            body
        })
    }
    handleTitleChange(e) {
        const title = e.target.value;
        this.setState({ title })
        this.props.call('notes.update', this.props.note._id, {
            title
        })
    }
    componentDidUpdate(prevProps, prevState) {
        const currentNodeId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

        if (currentNodeId && currentNodeId !== prevNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            });
        }
    }
    render() {
        if (this.props.note) {
            return (
                <div>
                    <input onChange={this.handleTitleChange} value={this.state.title} type="text" placeholder="Untitled Note" />
                    <textarea value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange}></textarea>
                    <button onClick={this.handleDeleteNote}>Delete Note</button>
                </div>
            )
        } else if (this.props.selectedNoteId) {
            return (
                <p>
                    Note not found.
                </p>
            )
        } else {
            return (
                <p>Pick or create a note to get started.</p>
            )
        }
    }
}
Editor.propTypes = {
    selectedNoteId: PropTypes.string,
    note: PropTypes.object,
    call: PropTypes.func.isRequired,
    browserHistory: PropTypes.object.isRequired
}
export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call,
        browserHistory
    }
}, Editor);
