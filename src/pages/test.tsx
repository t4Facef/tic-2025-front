import { useState } from "react";
import SearchableSelect from "../components/forms/searchable_select ";

export default function TestPage() {
    const [selected, setSelected] = useState("")
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10'];
    
    return (
        <div className="flex items-center justify-center p-8 m-64 bg-blue-200">
            <SearchableSelect options={options} setSelected={setSelected}/>
            {selected}
        </div>
    );
}