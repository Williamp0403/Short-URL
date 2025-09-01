import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

export function BackToList () {
  return (      
    <Link className="font-semibold text-sky-600 space-x-2" to='/links'>
      <ArrowBack fontSize="small"/>
      <span>Volver a la lista de enlaces</span>
    </Link>
    )
}