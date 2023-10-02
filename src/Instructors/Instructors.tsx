import StaticSidebar from '../Sidebar/Sidebar';
import PrimaryButton from '../Buttons/PrimaryButton';
import './Instructors.css';

function Instructors() {
    return (
        <div className='instructors-page'>
            <StaticSidebar />
            <div className='instructors-content'>
                <div className='instructors-top-content'>
                    <div className='header'>
                        <div className='header-text'>
                            Header
                        </div>
                        <div className='header-text'>
                            Header
                        </div>
                        <div className='header-text'>
                            Header
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Instructors;