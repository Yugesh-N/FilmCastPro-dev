import React,{useEffect, useState} from "react";
import './UserProfile.css';
import { supabase } from "../lib/supabaseClient";
type Experience = {
  title: string;
  role: string;
  duration: string;
  description: string;
};

type Education = {
  institute: string;
  course: string;
  duration: string;
  description:string
};

type ProfileData = {
  name: string;
  role: string;
  location: string;
  bio: string;
  coverPhoto: string;
  profilePhoto: string;
  experience: Experience[];
  skills: string;
  portfolio: string;
  education: Education[];
  mobile:string;
  plan:string
};


interface ProfileProps {
   onPageChange: (page: string) => void;
}

export const UserProfile: React.FC<ProfileProps> = ({onPageChange}) => {
  const [ProfileData, setProfileData] = useState<ProfileData>({
  name: "",
  role: "",
  location: "",
  bio: "",
  coverPhoto: "",
  profilePhoto: "",
  experience: [],
  skills: "",       // add this
  portfolio: "",    // add this
  education: [],
  mobile: "",
  plan: ""          // add this
});


  const fetchData = async()=>{
      let loginId = localStorage.getItem('user_id')
      console.log(loginId);
      const {data, error}  = await supabase.from('profiles').select('*').eq('user_id',loginId);

      if(error){
        console.log(error);
      }
      else{
        console.log(data);
        setProfileData(data[0]);
      }
  }

  useEffect(()=>{
    fetchData();
  },[]);

  const updateData = async(e:React.FormEvent)=>{
      e.preventDefault();
      let loginId = localStorage.getItem('user_id');
      const {data,error} = await supabase.from('profiles').update({
          name: ProfileData.name,
          role: ProfileData.role,
          location:ProfileData.location,
          bio: ProfileData.bio,
          coverPhoto: ProfileData.coverPhoto,
          profilePhoto: ProfileData.profilePhoto,
          experience: ProfileData.experience,
          skills: ProfileData.skills,
          portfolio: ProfileData.portfolio,
          education: ProfileData.education,
          mobile:ProfileData.mobile

      }).eq('user_id',loginId).single();

      if(error){
        console.log(error);
      }
      else{
        console.log(data);
      }
  }

  return (
 <div className="container mt-4 profile-container">
  <div className="position-relative mb-5 profile-header">
    <img
      src="https://via.placeholder.com/1200x350"
      alt="Cover"
      className="cover-photo"
    />
    <img
      src="https://via.placeholder.com/150"
      alt="Profile"
      className="avatar"
    />
  </div>

  {/* Basic Info */}
  <div className="ms-3 fade-in">
    <h2 className="fw-bold">{ProfileData.name}</h2>
    <p className="mb-1 text-white">{ProfileData.role}</p>
    <p className="text-white">{ProfileData.location}</p>
    <p>{ProfileData.bio}</p>
  </div>
<div className="mt-5">
  <h3 className="fw-bold">Experience</h3>
  {ProfileData.experience && ProfileData.experience.length > 0 ? (
    ProfileData.experience.map((exp, idx) => (
      <div key={idx} className="border rounded p-3 mb-3 glass-card fade-in">
        <h5 className="fw-bold">{exp.title}</h5>
        <p className="mb-0">{exp.role}</p>
        <small className="text-muted">{exp.duration}</small>
        <p className="mt-2">{exp.description}</p>
      </div>
    ))
  ) : (
    <p className="text-white fst-italic">
      No experience added yet. Add experience to enhance your profile.
    </p>
  )}
</div>


<div className="mt-4">
  <h3 className="fw-bold">Education</h3>
  {ProfileData.education && ProfileData.education.length > 0 ? (
    ProfileData.education.map((edu, idx) => (
      <div key={idx} className="border rounded p-3 mb-3 glass-card fade-in">
        <h5 className="fw-bold">{edu.course}</h5>
        <p className="mb-0">{edu.institute}</p>
        <small className="text-muted">{edu.duration}</small>
        {edu.description && <p className="mt-2">{edu.description}</p>}
      </div>
    ))
  ) : (
    <p className="text-white fst-italic">
      No education added yet. Add education to enhance your profile.
    </p>
  )}
</div>


  {/* Skills Section */}
  <div className="mt-4">
    <h3 className="fw-bold">Skills</h3>
    <div className="border rounded p-3 glass-card fade-in">
      <span className="badge me-2 mb-2">React</span>
      <span className="badge me-2 mb-2">JavaScript</span>
      <span className="badge me-2 mb-2">CSS</span>
    </div>
  </div>
</div>)};
