import React from 'react';
import { FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HotJobCard = ({ job }) => {
    const {
        _id = '',
        title = 'No title',
        company = 'Unknown company',
        company_logo = 'https://via.placeholder.com/150', // Fallback logo
        requirements = [],
        description = 'No description available',
        location = 'No location provided',
        salaryRange = { min: 0, max: 0, currency: 'USD' }
    } = job;

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <div className='flex gap-2 m-2'>
                <figure>
                    <img className='w-16' src={company_logo} alt="Company Logo" />
                </figure>
                <div>
                    <h4 className="text-2xl">{company}</h4>
                    <p className='flex gap-1 items-center'>
                        <FaMapMarkerAlt />
                        {location || 'Location not provided'}
                    </p>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{description}</p>
                <div className='flex gap-2 flex-wrap'>
                    {requirements.length > 0 ? (
                        requirements.map((skill, index) => (
                            <p key={index} className='border rounded-md text-center px-2 hover:text-purple-600 hover:bg-gray-400'>{skill}</p>
                        ))
                    ) : (
                        <p className='text-gray-500'>No specific requirements listed</p>
                    )}
                </div>
                <div className="card-actions justify-end items-center mt-4">
                    <p className='flex items-center'>
                        Salary: <FaDollarSign /> {salaryRange.min ? salaryRange.min : '0'} - {salaryRange.max ? salaryRange.max : '0'} {salaryRange.currency || 'USD'}
                    </p>
                    <Link to={`/jobs/${_id}`}>
                        <button className="btn btn-primary">Apply</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotJobCard;
