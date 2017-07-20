import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
    const obj = {
        title: "new test title",
        updatedAt: new Date().getTime()
    }
    describe('NoteListItem', function () {

        it('should render title and timestamp', function(){
        let wrapper = mount(<NoteListItem note={obj} />)
        expect(wrapper.find("h5").text()).toBe(obj.title);
        expect(wrapper.find("p").text()).toBe(moment(obj.updatedAt).format('DD/M/YY'));
       

        })

        it('should set default title if no title set', function(){
        let wrapper2=mount(<NoteListItem note={{title:""}}/>);
        expect(wrapper2.find("h5").text()).toBe("Untitled note");

        })

    });
}