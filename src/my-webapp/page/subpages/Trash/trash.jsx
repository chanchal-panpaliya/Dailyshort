//react
import { useContext,useState ,useEffect} from 'react';
//component
import { Trash_Card } from '../../../component/Card/Card';
import Filter from '../../../component/Filter/Filter';
//context
import NoteContext from '../../../context/NoteContext';
import {getLabelNote,getPriority,getdate,getSearchCart,getpin} from '../utility/filterutility';

const Note_Trash = () =>{
    const {deletedItems,filter} = useContext(NoteContext);
    const LabelNote = getLabelNote( deletedItems,filter.isChecked);
    const PriorityNote = getPriority(LabelNote,filter.priority);
    const SortBydateNote = getdate(PriorityNote,filter.sortdate);
    const SortBypin = getpin(SortBydateNote,filter.sortpin)
    const SearchByTitle = getSearchCart(SortBypin,filter.search);

    useEffect(()=>{
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    },[])

    return(
        <div className='flex-col flex-justify-content-center flex-align-item-center row-gap-1rem typology-padding-top'>
           <div className='flex-col row-gap-2rem filter-box'>
                <Filter data={SearchByTitle} originaldata={deletedItems}/> 
            </div>
            {SearchByTitle.length>0?<h3> Trash Items </h3>:<h3> No item found </h3>}
            <div className='typology-padding-top grid-note-cart'>
                  {SearchByTitle.length>0 && SearchByTitle.map((item,index)=>{
                            return  <Trash_Card data={item}/> 
                  })}
            </div>
        </div>
    )
} 

export default Note_Trash