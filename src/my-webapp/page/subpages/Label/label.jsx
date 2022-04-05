//react
import { useContext,useState,useEffect } from 'react';
//css
import "../index.css";
//constext
import NoteContext from '../../../context/NoteContext';
import {getLabelNote,getPriority,getdate,getSearchCart,getpin} from '../utility/filterutility';
//component
import { Card } from '../../../component/Card/Card';
import SetLabel from './setlabel';
import Filter from '../../../component/Filter/Filter'


const Note_Label = () =>{
    const {noteItems,handle_editNote,filter} = useContext(NoteContext);
    //function
    const LabelNote = getLabelNote( noteItems,filter.isChecked);
    const PriorityNote = getPriority(LabelNote,filter.priority);
    const SortBydateNote = getdate(PriorityNote,filter.sortdate);
    const SortBypin = getpin(SortBydateNote,filter.sortpin)
    const SearchByTitle = getSearchCart(SortBypin,filter.search);
    return(
            <div className='flex-col flex-justify-content-center flex-align-item-center row-gap-1rem typology-padding-top'>
                <div className='flex-col row-gap-2rem filter-box'>
                    <Filter data={SearchByTitle} originaldata={noteItems}/> 
                </div>
                {SearchByTitle.length>0?<h3> Assign Label to Note </h3>:<h3> No item found in Label list</h3>}
                <div className='grid-note-cart'> 
                {SearchByTitle.length>0 && SearchByTitle.map((item,index)=>{      
                    return(
                        <>
                            <div className='flex-col row-gap-1rem typography-padding-5px' key={index}>
                                <SetLabel note={item} index={index} />
                                <Card data={item}/>
                                <br/> 
                            </div>
                        </>
                    )   
                })}
            </div>
        </div>
    )
} 

export default Note_Label