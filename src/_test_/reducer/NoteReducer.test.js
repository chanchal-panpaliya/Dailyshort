import NoteReducer from '../../my-webapp/context/NoteReducer';

const InitialReducerState={
    noteItems:[
        {
            color: '#555555',
            date: '22/06/2022 13:59:01',
            desc: '<p>ok</p>\n',
            id: 'c2519b66-8789-4082-904e-42ebad901e2e',
            label: '',
            pin: true,
            priority: 'High',
            tags: [],
            title: 'ok',
            _id: '1'
        },
        {
            color: '#555555',
            date: '22/06/2022 13:59:01',
            desc: '<p>ok</p>\n',
            id: 'c2519b66-8789-4082-904e-42ebad901e2e',
            label: '',
            pin: true,
            priority: 'High',
            tags: [],
            title: 'ok',
            _id: '2'
        }
    ],
    achiveItems:[
        {
            color: '#555555',
            date: '22/06/2022 13:59:01',
            desc: '<p>ok</p>\n',
            id: 'c2519b66-8789-4082-904e-42ebad901e2e',
            label: '',
            pin: true,
            priority: 'High',
            tags: [],
            title: 'ok',
            _id: '3'
        },
        {
        color: '#555555',
        date: '22/06/2022 13:59:01',
        desc: '<p>ok</p>\n',
        id: 'c2519b66-8789-4082-904e-42ebad901e2e',
        label: '',
        pin: true,
        priority: 'High',
        tags: [],
        title: 'ok',
        _id: '4'
       }
   ],
    deletedItems:[  
        {
            color: '#555555',
            date: '22/06/2022 13:59:01',
            desc: '<p>ok</p>\n',
            id: 'c2519b66-8789-4082-904e-42ebad901e2e',
            label: '',
            pin: true,
            priority: 'High',
            tags: [],
            title: 'ok',
            _id: '5'
        },
        {
            color: '#555555',
            date: '22/06/2022 13:59:01',
            desc: '<p>ok</p>\n',
            id: 'c2519b66-8789-4082-904e-42ebad901e2e',
            label: '',
            pin: true,
            priority: 'High',
            tags: [],
            title: 'ok',
            _id: '6'
        }
  ] 
}

  describe("testing NoteReducer", () => {
    //Add Note
    it("should set the add note", () => {
       let addnote = {
            color: '#555555',
            date: '22/06/2022 13:59:01',
            desc: '<p>ok</p>\n',
            id: 'c2519b66-8789-4082-904e-42ebad901e2e',
            label: '',
            pin: true,
            priority: 'High',
            tags: [],
            title: 'ok',
            _id: '7'
        }

    const checker = InitialReducerState.noteItems.find((item) => {
        return item._id === addnote._id;
      });

    let expectedState = {}
    if(checker) {
        expectedState = {...InitialReducerState, noteItems : [...InitialReducerState.noteItems]}   
    }else
    {
        expectedState = {...InitialReducerState,noteItems : [...InitialReducerState.noteItems,addnote]} 
    }
   
    let data = [...InitialReducerState.noteItems,addnote]

    const state = NoteReducer(InitialReducerState, {
        type: "ADD_TO_NOTE",
        payload: data,
    });
    expect(state).toEqual(expectedState);
    });


    //EDIT NOTE
    it("should set the edit note", () => {
        
        let updatenote = {
            color: '#555555',
            date: '22/06/2022 13:59:01',
            desc: '<p>okkkkkkk</p>\n',
            id: 'c2519b66-8789-4082-904e-42ebad901e2e',
            label: 'ok',
            pin: true,
            priority: 'High',
            tags: [],
            title: 'ok',
            _id: '2'
        }

        const expectedState = {
            ...InitialReducerState,
            noteItems : InitialReducerState.noteItems.map((item)=>{
                if(item._id === updatenote._id){
                    return updatenote
                }else{
                    return item
                }
            })
        };

        const state = NoteReducer(InitialReducerState, {
          type: "EDIT_NOTE",
          payload: expectedState.noteItems,
        });
    
        expect(state).toEqual(expectedState);
      });

      //Delete note and add to trash memory
      it("should set the delete note", () => {

        let deletenoteId = '2'
        const expectedState = {
            ...InitialReducerState,
            noteItems : InitialReducerState.noteItems.filter((item)=> item._id !== deletenoteId),
            deletedItems : InitialReducerState.noteItems.filter((item)=> item._id === deletenoteId)
        };

        let data = {
            notes : expectedState.noteItems,
            trash : expectedState.deletedItems
        }

        const state = NoteReducer(InitialReducerState, {
          type: "DELETE_NOTE",
          payload:data,
        });
    
        expect(state).toEqual(expectedState);
      });

      //ADD_TO_ACHIVE
      it("should set the add archive note", () => {
        let archivenoteId = '2'

        const expectedState = {
            ...InitialReducerState,
            noteItems : InitialReducerState.noteItems.filter((item)=> item._id !== archivenoteId),
            achiveItems : [...InitialReducerState.achiveItems, ...InitialReducerState.noteItems.filter((item)=> item._id === archivenoteId)]
        };
        const state = NoteReducer({
            noteItems: InitialReducerState.noteItems.filter((item)=> item._id !== archivenoteId),
            achiveItems: InitialReducerState.achiveItems,
            deletedItems : InitialReducerState.deletedItems
        }, {
          type: "ADD_TO_ACHIVE",
          payload:expectedState.achiveItems,
        });
        expect(state).toEqual(expectedState);
      });

      //EDIT_ACHIVE
      it("should set the edit archive note", () => {

        let updatenote = {
            color: '#555555',
            date: '22/06/2022 13:59:01',
            desc: '<p>okkkkkkk</p>\n',
            id: 'c2519b66-8789-4082-904e-42ebad901e2e',
            label: 'ok',
            pin: true,
            priority: 'High',
            tags: [],
            title: 'ok',
            _id: '4'
        }

        const expectedState = {
            ...InitialReducerState,
            achiveItems : InitialReducerState.achiveItems.map((item)=>{
                if(item._id === updatenote._id) {
                   return updatenote
                }else{
                    return item  
                }
            })
        };
        const state = NoteReducer(InitialReducerState, {
          type: "EDIT_ACHIVE",
          payload:expectedState.achiveItems,
        });
        expect(state).toEqual(expectedState);
      });

      //RESTORE_TO_ACHIVE
      it("should set the restore archive note", () => {
        let archiverestore_noteId = '3'

        const expectedState = {
            ...InitialReducerState,
            noteItems : [...InitialReducerState.noteItems, ...InitialReducerState.achiveItems.filter((item)=> item._id === archiverestore_noteId)],
            achiveItems : [...InitialReducerState.achiveItems.filter((item)=> item._id !== archiverestore_noteId)]
        };

        let data = {
            archives : expectedState.achiveItems,
            notes : expectedState.noteItems
        }

        const state = NoteReducer(InitialReducerState,{
          type: "RESTORE_TO_ACHIVE",
          payload:data,
        });

        expect(state).toEqual(expectedState);
      });

      //Delete note from achive
      it("should set the delete achive note", () => {

        let deleteachive_noteId = '4'
        const expectedState = {
            ...InitialReducerState,
            achiveItems : InitialReducerState.achiveItems.filter((item)=> item._id !== deleteachive_noteId),
            deletedItems : InitialReducerState.achiveItems.filter((item)=> item._id === deleteachive_noteId)
        };

        let data = {
            archives : expectedState.achiveItems,
            trash : expectedState.deletedItems
        }

        const state = NoteReducer(InitialReducerState, {
          type: "DELETE_ACHIVE",
          payload:data,
        });
    
        expect(state).toEqual(expectedState);
      });
   
      //restore trash -> archive
      it("should set the restore trash note to archive list", () => {

        let deletenoteId = '5'
        const expectedState = {
            ...InitialReducerState,
            achiveItems : [ ...InitialReducerState.achiveItems , ...InitialReducerState.deletedItems.filter((item)=> item._id === deletenoteId)],
            deletedItems : InitialReducerState.deletedItems.filter((item)=> item._id !== deletenoteId)
        };

        let data = {
            archives : expectedState.achiveItems,
            trash : expectedState.deletedItems,
            notes: expectedState.noteItems
        }

        const state = NoteReducer(InitialReducerState, {
          type: "RESTORE_NOTE_TRASH",
          payload:data,
        });
    
        expect(state).toEqual(expectedState);
      });

      //restore trash -> note
      it("should set the restore trash note to note list", () => {

        let deletenoteId = '6'

        const expectedState = {
            ...InitialReducerState,
            noteItems : [ ...InitialReducerState.noteItems , ...InitialReducerState.noteItems.filter((item)=> item._id === deletenoteId)],
            deletedItems : InitialReducerState.deletedItems.filter((item)=> item._id !== deletenoteId)
        };

        let data = {
            archives : expectedState.achiveItems,
            trash : expectedState.deletedItems,
            notes: expectedState.noteItems
        }

        const state = NoteReducer(InitialReducerState, {
          type: "RESTORE_NOTE_TRASH",
          payload:data,
        });
    
        expect(state).toEqual(expectedState);
      });
       
      //DELETED_NOTE_TRASH
      it("should set the delete trash note",()=>{
        let deletenoteId = '6'
        const expectedState = {
            ...InitialReducerState,
            deletedItems : InitialReducerState.deletedItems.filter((item)=> item._id !== deletenoteId)
        };
        const state = NoteReducer(InitialReducerState, {
            type: "DELETED_NOTE_TRASH",
            payload:expectedState.deletedItems,
        });
        expect(state).toEqual(expectedState);
      });
  });