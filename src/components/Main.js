/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { user } from 'reducers/user';
import { missions } from 'reducers/missions';
import { LogoutButton, MainContainer } from 'styles/MainStyle';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
// import CloudsFooter from 'assets/footer.png'
import { Footer } from './Footer';
import MissionBoard from './MissionBoard';
import DailyScorePage from './DailyScorePage';
import UserPage from './UserPage';
// import FetchTotalScore from './FetchTotalScore';
// import FetchDailyScore from './FetchDailyScore';
import FetchUserData from './FetchUserData';
import FetchScores from './FetchScores';

const Main = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [loading, setLoading] = useState(true)
  /* const [activeIndex, setActiveIndex] = useState(1); */
  // react-dom.development.js:86 Warning: React does not recognize the `isActive` prop

  useEffect(() => {
    // Try to load access token from local storage on component mount
    /* setActiveIndex(1); */
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedUserId = localStorage.getItem('userId');
    if (storedAccessToken && storedUserId) {
      dispatch(user.actions.setAccessToken(storedAccessToken));
      dispatch(user.actions.setUserId(storedUserId));
      console.log('Access token stored', storedAccessToken)
      console.log('User id stored', storedUserId)
    } else {
      navigate('/login');
    }
  }, []);

  /* const handleSlideChange = (index) => {
    setActiveIndex(index);
  }; */

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setEmail(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(missions.actions.setMissionItems([]));
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    navigate('/login')
  }

  const sliderSettings = {
    dots: true,
    initialSlide: 1,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <MainContainer>
      <FetchScores />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider {...sliderSettings}>
        <div>
          <UserPage />
          <FetchUserData />
        </div>
        <div>
          <MissionBoard />
        </div>
        <div>
          <DailyScorePage />
        </div>
      </Slider>
      <LogoutButton type="button" onClick={onLogoutButtonClick}>Logout</LogoutButton>
      <Footer />
    </MainContainer>
  )
}

export default Main