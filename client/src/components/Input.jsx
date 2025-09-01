export function Input ({ title, type, placeholder = '' , error, register, name }) {
  return (
    <div className="w-full sm:text-base text-sm">
      <label className="font-medium">{title}</label>
      <input 
        {...register(name)}
        placeholder={placeholder}
        type={type} 
        className={`${error && 'border-red-500 border' } w-full outline-none p-3 rounded bg-zinc-600`}
      />
      { error && <p className="text-red-500 font-medium">{error.message}</p> }
    </div>
  )
}