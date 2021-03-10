import React, {useState} from 'react';

export default function Header({search}) {
    const [criteria, setCriteria] = useState('');

    function doSearch(e){
        e.preventDefault();
        search(criteria);
        setCriteria('');
    }

    return (
        <div id="header">
            <form onSubmit={doSearch}>
                <input placeholder="Enter search phrase" value={criteria} onChange={e=> setCriteria(e.target.value)} />
                <button>Search</button>
            </form>
        </div>
    )
}
