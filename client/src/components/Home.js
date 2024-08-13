import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room Id is generated" , {
      // Custom options
      style: {
        backgroundColor: '#d9d9d9', // Custom background color
        color: '#120200', // Custom text color
        border: '2px solid #ffce6d', // Custom border color
        borderRadius: '5px', // Optional: rounded corners
        padding: '10px', // Optional: padding
      },
      icon: '✅', // Optional icon
    });
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Enter valid credentials");
      return;
    }

    // redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success("Private room created", {
      // Custom options
      style: {
        backgroundColor: '#d9d9d9', // Custom background color
        color: '#120200', // Custom text color
        border: '2px solid #ffce6d', // Custom border color
        borderRadius: '5px', // Optional: rounded corners
        padding: '10px', // Optional: padding
      },
      icon: '👍', // Optional icon
    });
  };

  // when enter then also join
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-2 mb-5 bg-secondary rounded">
            <div className="card-body text-center" style={{ backgroundColor: '#120200' }}>
              <img
                src="/images/codeconcade.png"
                alt="Logo"
                className="img-fluid mx-auto d-block"
                style={{ maxWidth: "175px" }}
              />
              <h3  style={{ fontWeight: 'bold' , color: '#d9d9d9' }}>Enter the ROOM Details</h3>

              <div className="form-group">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="form-control mb-3"
                  placeholder="Enter/Generate ROOM ID"
                  onKeyUp={handleInputEnter}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control mb-2"
                  placeholder="Enter USERNAME"
                  onKeyUp={handleInputEnter}
                />
              </div>
              <button onClick={joinRoom} className='btn btn-lg btn-block' 
            style={{backgroundColor: '#37221F' , fontWeight: 'bold' , 
            color: '#ffce6d', border: 'none'}}>JOIN</button>
             <p className='mt-3' style={{ fontWeight: 'bold' , 
            color: '#d9d9d9' }}>Don't have a Room Id{" "}

            <span className='p-4' style={{ color: '#ffce6d' , 
            cursor:'pointer' }} onClick={generateRoomId}>Create New Room</span>  </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
