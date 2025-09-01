import { ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { handleCopy } from "../utils/copy";
import { useState } from "react";

export function Copy ({ text }) {
  const [ copy, setCopy ] = useState(false)

  return (
    <Tooltip title={copy ? 'Copiado' : 'Copiar'}>
      <IconButton 
        onClick={() => handleCopy(text, setCopy)}
        className="cursor-pointer"
      >
        <ContentCopy/>
      </IconButton>
    </Tooltip>
  )
}