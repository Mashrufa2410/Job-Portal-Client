import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios'; // Import axios

const MyApplications = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // Fetch job applications from backend
        axios
            .get(`http://localhost:5000/job-applications?email=${user.email}`, { withCredentials: true })
            .then(res => setJobs(res.data))  // Set the fetched data
            .catch(err => console.error('Error fetching applications:', err)); // Handle error
    }, [user.email]); // Re-run effect if user email changes

    return (
        <div>
            <h2 className="text-3xl">My Applications: {jobs.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Company</th>
                            <th>Job Title</th>
                            <th>Location</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map over job applications */}
                        {jobs.map(job => (
                            <tr key={job._id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={job.company_logo} alt="Company Logo" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{job.job_title}</div>
                                            <div className="text-sm opacity-50">{job.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-ghost badge-sm">{job.job_title}</span>
                                </td>
                                <td>{job.location}</td> {/* Location */}
                                <th>
                                    <button className="btn btn-ghost btn-xs">X</button> {/* Action Button */}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplications;
