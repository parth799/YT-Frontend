import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Input from './Input';
function Search() {
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate();

    const search = (data) => {
        navigate(`/search/${data.query}`)
    }

  return (
    <>
     <form onSubmit={handleSubmit(search)}>
        <Input placeholder="Search" {...register("query", {register: true})} />
        </form> 
    </>
  )
}

export default Search
