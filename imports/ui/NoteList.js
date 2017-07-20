import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../api/notes';
import PropTypes from 'prop-types';
import NoteListHeader from './NoteListHeader';

export const NoteList = (props) => {
    return (
        <div>
            NoteList {props.notes.length}
            <NoteListHeader />
        </div>
    )
}

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
}

export default createContainer(() => {
    Meteor.subscribe('notes');
    return {
        notes: Notes.find().fetch()
    };
}, NoteList)