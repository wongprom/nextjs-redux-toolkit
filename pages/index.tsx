import type { NextPage } from 'next'
import { MouseEvent, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTodo,
  fetchATodo,
  selectListOfTodos,
  selectStatus,
} from '../redux/todosSlice'

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const idInputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useDispatch()
  const todos = useSelector(selectListOfTodos)
  const status = useSelector(selectStatus)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (inputRef.current?.value) {
      dispatch(addTodo(inputRef.current.value))
      inputRef.current.value = ''
    }
  }

  const handleFetch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (
      idInputRef.current !== null &&
      idInputRef.current.value !== '' &&
      idInputRef.current.value !== '0'
    ) {
      dispatch(fetchATodo(idInputRef.current.value))
      idInputRef.current.value = ''
    }
  }

  const itemTodo = todos?.map((todo, index) => (
    <div key={index} className="p-4">
      <div className="relative h-full overflow-hidden rounded-lg bg-gray-800 bg-opacity-40 px-8 pt-8 pb-12 text-center">
        <h2 className="mb-1 text-xs font-medium tracking-widest text-gray-500">
          ToDo
        </h2>
        <h3 className="title-font mb-3 text-xl font-medium text-white sm:text-2xl">
          {todo}
        </h3>
      </div>
    </div>
  ))

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-900 py-2">
      <div>
        <h1 className="title-font mb-1 text-2xl font-medium tracking-widest text-white">
          Current Status = {status}
        </h1>
      </div>
      <form className="mt-10 w-full px-20 md:max-w-[600px]">
        <div className="mb-5 flex flex-col">
          <input
            className="rounded border border-gray-700 bg-gray-800 py-1 px-3 text-base leading-8 text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900"
            ref={inputRef}
            type="text"
            placeholder="write task..."
          />
          <button
            className=" rounded border-0 bg-indigo-500 py-2 px-8 text-center text-lg text-white hover:bg-indigo-600 focus:outline-none"
            onClick={handleClick}
          >
            Add todo
          </button>
        </div>

        <div className="mb-5 flex flex-col">
          <input
            className="rounded border border-gray-700 bg-gray-800 py-1 px-3 text-base leading-8 text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900"
            ref={idInputRef}
            type="number"
            placeholder="ID of todo to Fetch"
          />
          <button
            className="rounded border-0 bg-indigo-500 py-2 px-8 text-center text-lg text-white hover:bg-indigo-600 focus:outline-none"
            onClick={handleFetch}
          >
            Fetch a todo from api
          </button>
        </div>
      </form>

      <section className="body-font text-gray-400">
        <div className="container mx-auto px-5 py-12">
          <div className="-m-4 flex flex-wrap justify-center">
            {todos.length > 0 ? (
              itemTodo
            ) : (
              <p className="text-zinc-200">You don't have any ToDo's</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
