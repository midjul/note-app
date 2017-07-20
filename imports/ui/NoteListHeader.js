
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../api/notes';
import PropTypes from 'prop-types';

export const NoteListHeader = (props) => {
    return (
        <button onClick={() => props.meteorCall('notes.insert')}>Create Note</button>
    )

}
NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired
}
export default createContainer(() => {
    return {
        meteorCall: Meteor.call
    };
}, NoteListHeader)