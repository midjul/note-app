import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

export class Editor extends Component {
    constructor(props) {
        super(props);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleBodyChange(e) {
        this.props.call('notes.update', this.props.note._id, {
            body: e.target.value
        })
    }
    handleTitleChange(e) {
        this.props.call('notes.update', this.props.note._id, {
            title: e.target.value
        })
    }

    render() {
        if (this.props.note) {
            return (
                <div>
                    <input onChange={this.handleTitleChange} value={this.props.note.title} type="text" placeholder="Untitled Note" />
                    <textarea value={this.props.note.body} placeholder="Your note here" onChange={this.handleBodyChange}></textarea>
                    <button>Delete Note</button>
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
    note: PropTypes.object
}
export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call
    }
}, Editor);
