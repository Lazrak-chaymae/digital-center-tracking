import './App.css'
import AddProjectComponent from './components/AddProjectComponent'
import DashboardConstComponent from './components/DashboardConstComponent'
import DashboardLcmComponent from './components/DashboardLcmComponent'
import DependancyComponent from './components/DependancyComponent'
import DetteTechComponent from './components/DetteTechComponent'
import HeaderComponent from './components/HeaderComponent'
import KPIProdComponent from './components/KPIProdComponent'
import ProjectComponent from './components/ProjectComponent'
import ReleaseComponent from './components/ReleaseComponent'
import SupportComponent from './components/SupportComponent'

function App() {


  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <HeaderComponent />
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>menu</div>
          <div className='col-8'><ProjectComponent /></div>
        </div>
      </div>
    </>
  )
}

export default App
