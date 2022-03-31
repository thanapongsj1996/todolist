import type { NextPage } from 'next'
import Jumbotron from '../components/Jumbotron'
import TodoBox from '../components/TodoBox'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Jumbotron />
      <div className="container d-flex flex-column py-5">
        <div className="row w-100 px-0 mx-0">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className={styles.box__container}>
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="What to do?" />
              </div>
              <div className="btn btn-lg btn-primary mt-2 w-100">Add new todo</div>
            </div>
          </div>
        </div>
        <div className="row w-100 px-0 mx-0 mt-3">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <TodoBox />
            <TodoBox />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
