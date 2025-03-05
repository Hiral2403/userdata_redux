// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { deleteUser } from '../redux/UserReducer';

// const Home = () => {
//     const users = useSelector((state) => state.users);
//     const dispatch = useDispatch();

//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete this user?")) {
//             dispatch(deleteUser(id));
//         }
//     };

//     return (
//         <div className='container' style={{ marginTop: '2rem' }}>
//             <h2 className='mb-4 text-center'>User Information Data</h2>
//             <Link to="/create" className='btn btn-primary mb-3'>Create +</Link>

//             {users.length > 0 ? (
//                 <table className='table table-striped text-center'>
//                     <thead className="table-dark">
//                         <tr>
//                             <th>ID</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Image</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr key={index}>
//                                 <td>{user.id}</td>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>
//                                     {user.image ? (
//                                     <img src={user.image} alt={user.name} width="50" height="50" style={{ borderRadius: "50%" }} />
//                                     ) : (
//                                     "No Image"
//                                     )}
//                                     </td>
//                                 <td>
//                                     <Link to={`/edit/${user.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
//                                     <button 
//                                         onClick={() => handleDelete(user.id)} 
//                                         className='btn btn-sm btn-danger'
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p className="text-center text-muted">No users found. Please add some users.</p>
//             )}
//         </div>
//     );
// }

// export default Home;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../redux/UserReducer";
import ReactPaginate from "react-paginate";

const Home = () => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 5; // Show 5 users per page

    // Calculate the displayed users
    const offset = currentPage * usersPerPage;
    const currentUsers = users.slice(offset, offset + usersPerPage);
    const pageCount = Math.ceil(users.length / usersPerPage);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(id));
        }
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className='container' style={{ marginTop: '2rem' }}>
            <h2 className='mb-4 text-center'>User Information Data</h2>
            <Link to="/create" className='btn btn-primary mb-3'>Create +</Link>

            {users.length > 0 ? (
                <>
                    <table className='table table-striped text-center'>
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.image ? (
                                            <img src={user.image} alt={user.name} width="50" height="50" style={{ borderRadius: "50%" }} />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/edit/${user.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                        <button 
                                            onClick={() => handleDelete(user.id)} 
                                            className='btn btn-sm btn-danger'
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Component */}
                    <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </>
            ) : (
                <p className="text-center text-muted">No users found. Please add some users.</p>
            )}
        </div>
    );
}

export default Home;
