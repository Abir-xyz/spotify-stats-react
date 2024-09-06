import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDataContext } from '../context/UserData';
import { useLoginContext } from '../context/LoginContext';

const Navbar = () => {
  const { user } = useDataContext();
  const { handleLogout } = useLoginContext();

  return (
    <Wrapper className='section'>
      <div className='container'>
        <div className='center'>
          <div className='brand'>
            {user && (
              <p>
                Hi,{' '}
                <span>
                  <Link to='/' className='link'>
                    {user.display_name}
                  </Link>
                </span>
              </p>
            )}
          </div>
          <div className='links'>
            <button onClick={handleLogout}>Logout</button>
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
        font-weight: 700;
        .link {
          text-decoration: none;
          color: var(--themeClr);
        }
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
