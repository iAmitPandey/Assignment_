import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import './Navbar.css';

const Navbar = () => {
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://reqres.in/api/users?page=1', {
        headers: {
          Accept: 'application/json',
        },
      });

      console.log('data is: ', JSON.stringify(data, null, 4));

      setData(data);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="home-main">
        <div className="navbar-main">
          <div className="navbar-logo">
            <Link to="/" className="nav-item nav-logo">
              <p className="logo">airData</p>
            </Link>
          </div>
          <div className="navbar-btn">
            {err && <h2>{err}</h2>}
            <button className="Get-Users" onClick={handleClick}>
              Get Users
            </button>
          </div>
        </div>
        {isLoading && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
          />
        )}

        <div className="body-main">
          {data.data.map(person => {
            return (
              <Card
                className="card-display"
                style={{
                  width: '20rem',
                }}
              >
                <Card.Img variant="top" src={person.avatar} />
                <Card.Body>
                  <Card.Title>
                    <span>Name:</span>
                    <span> </span>
                    {person.first_name} {person.last_name}
                  </Card.Title>
                  <Card.Text>
                    <p>
                      <span>Email:</span>
                      <span> </span>
                      {person.email}
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
