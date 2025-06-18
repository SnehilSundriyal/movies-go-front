import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="max-w-7xl mx-auto px-4 mt-3">
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-full md:w-auto">
          <h1 className="mt-3 justify-center text-center">Oops!</h1>
          <p className="justify-center text-center">Sorry, an unexpected error has occurred.</p>
          <p className="text-center text-red-600">
            <em>{error.statusText || error.message}</em>
          </p>
        </div>
      </div>
    </div>
  )
}
