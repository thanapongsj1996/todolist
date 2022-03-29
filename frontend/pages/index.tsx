import type { NextPage } from 'next'
import Jumbotron from '../components/Jumbotron'

const Home: NextPage = () => {
  return (
    <>
      <Jumbotron />
      <div className="container d-flex justify-content-center py-5">
        <div className="row w-100">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <input type="text" className="col-12 form-control" placeholder="What to do ?" />
            <button className="btn btn-primary mt-2 w-100">Add new todo</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
