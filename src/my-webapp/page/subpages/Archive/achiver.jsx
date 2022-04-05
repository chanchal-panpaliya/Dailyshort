//react
import { useContext,useState } from 'react';
//component
import { Achive_Card } from '../../../component/Card/Card';
import Filter from '../../../component/Filter/Filter'
//context
import NoteContext from '../../../context/NoteContext';
import {getLabelNote,getPriority,getdate,getSearchCart,getpin} from '../utility/filterutility';

const Note_Achiver = () =>{
    const {achiveItems,filter} = useContext(NoteContext);
    //function
    const LabelNote = getLabelNote( achiveItems,filter.isChecked);
    const PriorityNote = getPriority(LabelNote,filter.priority);
    const SortBydateNote = getdate(PriorityNote,filter.sortdate);
    const SortBypin = getpin(SortBydateNote,filter.sortpin)
    const SearchByTitle = getSearchCart(SortBypin,filter.search);
    return(
            <div className='flex-col flex-justify-content-center flex-align-item-center row-gap-1rem typology-padding-top'>
               <div className='flex-col row-gap-2rem filter-box'>
                    <Filter data={SearchByTitle} originaldata={achiveItems} /> 
               </div>
                {SearchByTitle.length>0?<h3> achive Items </h3>:<h3> No item found </h3>}
                <div className='typology-padding-top grid-note-cart'>
                    {SearchByTitle.length>0 && SearchByTitle.map((item,index)=>{
                            return  <Achive_Card key={index} data={item}/> 
                      
                    })}
                </div>
            </div>
    )
} 

export default Note_Achiver