import styled from 'styled-components';

const Navbar = () => {
  return (
    <Wrapper className='section'>
      <div className='container'>
        <div className='center'>
          <div className='brand'>
            <p>
              Hi, <span>Abir</span>
            </p>
          </div>
          <div className='links'>
            <button>Logout</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 20px 0;
    p {
      font-size: 1.8rem;
      span {
        color: var(--themeClr);
        font-weight: 700;
      }
    }
    button {
      font-size: 1rem;
      background-color: transparent;
      outline: none;
      border: none;
      border: 1px solid var(--darkTxt);
      color: var(--darkTxt);
      padding: var(--btnPadding);
      border-radius: 10rem;
      cursor: pointer;
      transition: var(--btnTransition);
    }
    button:hover {
      background-color: var(--darkTxt);
      border-color: var(--darkTxt);
      color: #000;
    }
  }

  .center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 90vw;
    margin: 0 auto;
  }
`;

export default Navbar;
