import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { NoteListItem } from './NoteListItem';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {

    describe('NoteListItem', function () {
        let Session;
        beforeEach(() => {
            Session = {
                set: expect.createSpy()
            };
        })
        it('should render title and timestamp', function () {
            let wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />)
            expect(wrapper.find("h5").text()).toBe(notes[0].title);
            expect(wrapper.find("p").text()).toBe(moment(notes[0].updatedAt).format('DD/M/YY'));


        })

        it('should set default title if no title set', function () {
            let wrapper2 = mount(<NoteListItem note={notes[1]} Session={Session} />);
            expect(wrapper2.find("h5").text()).toBe("Untitled note");

        })

        it('should call set on click', function () {

            let wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />)
            wrapper.find('div').simulate('click');
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id)
        });

    });
}