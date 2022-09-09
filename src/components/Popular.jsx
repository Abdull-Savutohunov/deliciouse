import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components';
import { Splide , SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Popular = () => {
  const [popular, setPopular] = React.useState([])

  useEffect(() => {
    getPopular()
  },[]);

  const getPopular = async () => {

    const check = localStorage.getItem('popular');
    if (check) {
      setPopular(JSON.parse(check));
    }else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API}&number=9`
      );
      const data = await api.json();  
      localStorage.setItem('popular', JSON.stringify(data.recipes));
      setPopular(data.recipes);
      console.log(data.recipes);
    }
  }
  console?.log(popular);

 
  return (
    <>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide 
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag:'free',
            gap: '5rem'
          }
        }>
          {popular?.map((recipe) =>(
              <SplideSlide key={recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Card>
              </SplideSlide>
            
            )
          )}
        </Splide>
      </Wrapper>  
    </>
  )
}

const Wrapper = styled.div`
  margin: 4rem 1rem;
`;

const Card = styled.div`
  min-height: 10rem ;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  },
  p{
    position: absolute;
    z-index:10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50% , 0%);
    color: white;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height:40%;
    display:flex;
    justify-content: center;
    align-items: center;

  }
`;
const Gradient = styled.div`
  z-index:3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.6);
`;

export default Popular