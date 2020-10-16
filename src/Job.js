import React from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function Job({ job }) {
  const[show,setshow] =  useState(false)

  return (
    <div className="card shadow-4">
      <div className="card-body">
        <div className="card_left">
          <h4 className="job-title">
            {job.title} - <span className="company">{job.company}</span>
          </h4>
          <h5 className="job-date">
            {new Date(job.created_at).toLocaleDateString()}
          </h5>

          <span className="badge bg-secondary">{job.type}</span>
          <span className="badge bg-info">{job.location}</span>

          <div style={{ wordBreak: "break-all" }}>
            <h5 className="apply">How to apply</h5>
            <ReactMarkdown source={job.how_to_apply} />
          </div>
        </div>
          <img src={job.company_logo} alt={job.company_logo} />
      </div>
      <button className = 'btn btn-primary' onClick ={()=> setshow(prevshow => !prevshow)} >{show?'Hide Details':'Show Details'}</button>
      <div className ={show ?'show':'hide'} >
      <ReactMarkdown source = {job.description} />
      </div>
    </div>
  );
}

export default Job;
