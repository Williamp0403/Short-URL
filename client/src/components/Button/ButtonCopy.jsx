import { ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import { handleCopy } from "../../utils/copy";

export function ButtonCopy ({ text }) {
  const [ copy, setCopy ] = useState(false)

  return (
    <button 
      onClick={() => handleCopy(text, setCopy)}
      className="flex items-center gap-x-2 bg-sky-600 p-2 rounded text-sm font-medium cursor-pointer"
    >
      <ContentCopy fontSize="small"/>
      { copy ? 'Copiado' : 'Copiar link' }
    </button>
  )
}